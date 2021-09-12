<!--
  - Copyright (c) 2020-present Katan
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
	<v-container>
		<div class="header">
			<ul class="items windows">
				<AppNavigationWindowsBarItem
					v-for="window in getActiveWindows"
					:key="window.id"
					:window="window"
				/>
				<li
					v-if="getActiveWindows.length !== 0"
					class="item add"
					tabindex="0"
					title="Nova janela"
					@click="createDummyWindow"
					@keydown.enter="createDummyWindow"
				>
					<v-icon name="add" />
				</li>
			</ul>
		</div>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { inject } from "inversify-props";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";
import {
	AppNavigationWindow,
	MinimizedNavigationWindowState,
	OpenNavigationWindowState
} from "@/app/app-navigation/models/app-navigation-window.model";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";
import AppNavigationNavigationWindowIcon from "@/app/app-navigation/components/navigation-window/AppNavigationNavigationWindowIcon.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import AppNavigationWindowsBarItem from "@/app/app-navigation/components/AppNavigationWindowsBarItem.vue";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";

@Component({
	components: {
		VContainer,
		AppNavigationWindowsBarItem,
		VLabel,
		AppNavigationNavigationWindowIcon,
		VDropdownItem,
		VDropdown,
		VIcon
	}
})
export default class TheAppNavigationWindowsBar extends Vue {
	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	get getActiveWindows(): AppNavigationWindow[] {
		return this.appNavigationPresenter.getWindowsBy(
			OpenNavigationWindowState,
			MinimizedNavigationWindowState
		);
	}

	createDummyWindow(): void {
		console.log("create dummy window");
		this.appNavigationPresenter
			.createWindow(this, { name: "Nova janela" })
			.then((window) => {
				console.log("open window", window);
				this.appNavigationPresenter.openWindow(window, this);
			});
	}
}
</script>
<style lang="scss" scoped>
.header {
	position: sticky;
	top: 0;
	z-index: 1;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-top: 16px;

	.items {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;

		&:not(.windows) {
			margin: 4px 8px;

			li {
				border-radius: 50%;
				width: 32px;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					cursor: pointer;
				}

				&:hover,
				&:focus {
					background-color: var(--kt-background-tertiary);

					svg {
						opacity: var(--kt-icon-opacity-focused);
					}
				}

				svg {
					opacity: var(--kt-icon-opacity-unfocused);
				}
			}
		}

		&.windows {
			flex-grow: 1;
		}

		.item.add {
			display: flex;
			align-items: center;
			padding: 6px;
			color: var(--kt-muted-color);
			border-radius: 4px;

			&:hover {
				background-color: var(--kt-background-accent);
				color: var(--kt-text-color);
			}
		}
	}
}
</style>
