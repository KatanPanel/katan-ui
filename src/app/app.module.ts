import { UserSettingsStore } from "@/app/user-settings/store/user-settings.store";
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

import Vue from "vue";
import { VueJSModalOptions } from "vue-js-modal";
import VModal from "vue-js-modal/dist/index.nocss.js";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import VueMeta from "vue-meta";
import VTooltip from "v-tooltip";
import VueNativeSock from "vue-native-websocket";
import { KatanModule, Module } from "@/ioc";
import { RouterHrefDirective } from "@/app/shared/directives/router-href.directive";
import { ClickOutsideDirective } from "@/app/shared/directives/click-outside.directive";
import { LoggingService } from "@/app/shared/services/logging.service";
import { HttpService } from "@/app/shared/services/http.service";
import { ConfigService } from "@/app/shared/services/config.service";
import { I18nService } from "@/app/shared/services/i18n.service";
import { LocalStorageService } from "@/app/shared/services/local-storage.service";
import { AppRouter } from "@/app/shared/router/app.router";
import { AppStore } from "@/app/shared/store/app.store";
import VueTour from "vue-tour";

import "../assets/styles/main.scss";

require("vue-tour/dist/vue-tour.css");

export const AppLightTheme = "light";
export const AppDarkTheme = "dark";
export const AppSystemDefaultTheme = "system-default";

export type AppTheme =
	| typeof AppLightTheme
	| typeof AppDarkTheme
	| typeof AppSystemDefaultTheme;

export const AppThemes: readonly AppTheme[] = [
	AppLightTheme,
	AppDarkTheme,
	AppSystemDefaultTheme
];

@Module({
	router: AppRouter,
	stateManagement: AppStore,
	services: [
		LoggingService,
		ConfigService,
		HttpService,
		LocalStorageService,
		I18nService
	],
	directives: {
		"router-href": RouterHrefDirective,
		"click-outside": ClickOutsideDirective
	}
})
export default class AppModule extends KatanModule {
	afterInit() {
		this.installPlugins();
	}

	private installPlugins(): void {
		const config = this.container.get<ConfigService>(ConfigService);
		Vue.use<VueJSModalOptions>(VModal, {
			dialog: false
		});
		Vue.use(VueSvgInlinePlugin);

		Vue.use(VueMeta, { refreshOnceOnNavigation: true });
		Vue.use(VTooltip, {
			defaultClass: "v--tooltip",
			defaultBoundariesElement: document.body
		});

		// detect system theme change
		if (window.matchMedia) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					const userSettingsStore = this.container.get<
						UserSettingsStore
					>(UserSettingsStore);

					// only update if you don't have any preferred theme selected
					if (
						userSettingsStore.getSettings.theme !==
						AppSystemDefaultTheme
					)
						return;

					userSettingsStore.updateSettings({
						settings: {
							theme: AppSystemDefaultTheme
						}
					});
				});
		}

		// disable tooltips on mobile devices
		(VTooltip as any).enabled = window.innerWidth >= 768;

		Vue.use(VueNativeSock, config.wsUrl, {
			connectManually: true,
			reconnection: true,
			format: "json"
		});

		Vue.use(VueTour);
	}
}
