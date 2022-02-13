/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Consola, default as ConsolaInstance } from "consola";
import VueI18n from "vue-i18n";
import supportedLanguages from "@/supported-languages.json";
import { isUndefined } from "@/app/shared/utils";
import { format as formatDateFns } from "date-fns";
import { injectable } from "inversify";
import { inject } from "inversify-props";
import Vue from "vue";
import { LoggingService } from "@/app/shared/services/logging.service";

Vue.use(VueI18n);

export class I18n {
	private readonly logger: Consola = ConsolaInstance.create({}).withTag(
		"I18n"
	);
	private readonly _cached: string[] = [];

	constructor(private readonly i18n: VueI18n) {}

	public get getI18n(): VueI18n {
		return this.i18n;
	}

	public get getSupportedLanguages(): Language[] {
		return supportedLanguages;
	}

	public formatDate(date: Date | number | string, style?: string): string {
		const value = formatDateFns(
			typeof date === "string" ? new Date(date) : date,
			style || "PPPPpp",
			{
				locale: require(`date-fns/locale/${this.getI18n.locale}/index.js`)
			}
		);

		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	/**
	 * Sets the client's current language to the specified language.
	 * @param {Language} language - the new language.
	 */
	public setLanguage(language: Language): void {
		this.getI18n.locale = language.tag;
		document.querySelector("html")?.setAttribute("lang", language.tag);
		this.logger.info(`${language.name} (${language.tag})`);
	}

	public async loadLanguage0(
		language: Language,
		fallback?: readonly string[]
	): Promise<void> {
		const tag = language.tag;

		if (
			tag !== this.getI18n.fallbackLocale &&
			this.getI18n.locale === tag
		) {
			this.logger.error({
				message: `Locale ${tag} already set.`
			});
			return;
		}

		// already loaded, let's set it
		if (this._cached.includes(tag)) {
			this.setLanguage(language);
			return;
		}

		return import(
			/* webpackChunkName: "lang-[request]" */ `@/lang/${tag}.json`
		)
			.then(async (messages) => {
				this.getI18n.setLocaleMessage(tag, messages);
				this._cached.push(tag);
				this.setLanguage(language);
			})
			.catch(async (error: unknown) => {
				this.logger.error({
					message: `Unable to load language ${language}`,
					args: [error]
				});

				return this.loadFallback(fallback);
			});
	}

	/**
	 * Attempts to load messages into the specified language
	 * and tries to set it as the client's current language.
	 * @param {string} language - the language to be loaded.
	 * @param {ReadonlyArray<string>} fallback - other languages to load if the specified language fails to load.
	 */
	public async loadLanguage(
		language: string,
		fallback?: readonly string[]
	): Promise<any> {
		const separator = language.indexOf("-");
		if (separator !== -1) {
			// fix navigator language tag: en-us -> en-US
			language =
				language.substr(0, separator) +
				language.substr(separator, language.length).toUpperCase();
		}

		const supported = supportedLanguages.find(
			(value) => language === value.tag
		);

		if (!supported) {
			this.logger.warn(`Unsupported language: ${language}`);
			return this.loadFallback(fallback);
		}

		return this.loadLanguage0(supported, fallback);
	}

	private async loadFallback(fallback?: readonly string[]): Promise<any> {
		if (isUndefined(fallback) || fallback.length === 0)
			return await this.loadLanguage(
				this.getI18n.fallbackLocale as string
			);
		else return await this.loadLanguage(fallback[0], fallback.slice(1));
	}
}

const vmi18n = new VueI18n({
	fallbackLocale: "en-US"
});

const i18n = new I18n(vmi18n);
(vmi18n as any).i18n = i18n;

export default i18n;
