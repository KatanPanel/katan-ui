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

import { Component, InjectReactive, Prop, Vue } from "vue-property-decorator";
import type {
	AppNavigationWindowChildren,
	UpdateableAppNavigationWindow
} from "@/app/app-navigation/models/app-navigation-window.model";
import { isUndefined } from "@/app/shared/utils";

/**
 * Attribute added to Vue instances created from navigation windows.
 */
export const NAVIGATION_WINDOW_ATTR = Symbol();

/**
 * This mixin is responsible for doing post-build and pre-destruct handling of
 * components created from {@link AppNavigationWindow}.
 *
 * When a component is created from a navigation window, an attribute is applied to it,
 * this is especially necessary because this mixin is applied globally,
 * so it will be applied to any instance created by Vue.
 *
 * The attribute serves as a form of instance filtering to avoid unnecessary computations.
 */
@Component<AppNavigationWindowChildMixin>({
	created(): void {
		console.log("Navigation window created", this);
		if (isUndefined(this.windowChild?.title))
			this.updateWindow({
				title: this.$i18n.t(
					`navigation.windows.${this.$route.name}`
				) as string
			});
	},
	beforeMount(): void {
		if (isUndefined(this.window)) this.$destroy();
	},
	mounted(): void {
		/**
		 * Vue applies an "_isDestroyed" property to components
		 * that have already been destroyed but not discarded.
		 */
		const destroyable = (this as unknown) as { _isDestroyed: boolean };

		/**
		 * Vue 2 does not allow complete destruction of the component,
		 * so we have to remove the DOM element manually.
		 */
		if (destroyable._isDestroyed) this.$el.remove();
	}
})
export class AppNavigationWindowChildMixin extends Vue {
	@InjectReactive()
	protected readonly window!: UpdateableAppNavigationWindow | null;

	@Prop({ type: Object, required: true })
	protected readonly windowChild!: AppNavigationWindowChildren;

	protected updateWindow(value: Partial<AppNavigationWindowChildren>): void {
		this.window?.update(this.windowChild, value);
	}

	/**
	 * Returns a unique identification line from the input value prefixed with
	 * the identification number of the current navigation window.
	 *
	 * This does not guarantee that your id is especially unique,
	 * the concept "unique" is related to referencing the input value in the DOM.
	 *
	 * When there is more than one browser window available in the DOM,
	 * their IDs can conflict, after all, they are in the same DOM and both use the id,
	 * so use this so there is no conflict.
	 *
	 * It is preferable that you reference elements in the DOM using {@link Vue.$el}.
	 *
	 * @param input the input value
	 * @protected
	 */
	public uniqueId(input: string): string {
		return this.window?.id + "_" + input;
	}
}
