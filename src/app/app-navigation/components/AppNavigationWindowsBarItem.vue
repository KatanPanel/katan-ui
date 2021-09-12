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
	<li
		v-if="child"
		:key="window.id"
		:class="{
			active: isOpen,
			'has-children': window.children.length > 1
		}"
		class="item"
		tabindex="0"
		@click="open()"
		@keydown.enter="open()"
	>
		<div class="body">
			<AppNavigationNavigationWindowIcon
				:key="child.id"
				:icon="child.getIcon()"
				class="icon"
			/>
			<span :title="child.title" class="title" v-text="child.title" />
			<div
				v-bind="{
					'aria-hidden': !isOpen,
					tabindex: isOpen ? 0 : -1
				}"
				class="buttons"
			>
				<div
					class="button close"
					title="Fechar janela"
					@click="close()"
					@keydown.enter="close()"
				>
					<v-icon name="close" />
				</div>
			</div>
		</div>
		<AppNavigationWindowsBarItemChildrenList
			v-if="window.children.length > 1"
			:children="window.children"
		/>
	</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import type {
	AppNavigationWindow,
	AppNavigationWindowChildren
} from "@/app/app-navigation/models/app-navigation-window.model";
import { OpenNavigationWindowState } from "@/app/app-navigation/models/app-navigation-window.model";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";
import AppNavigationNavigationWindowIcon from "@/app/app-navigation/components/navigation-window/AppNavigationNavigationWindowIcon.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import AppNavigationWindowsBarItemChildrenList from "@/app/app-navigation/components/AppNavigationWindowsBarItemChildrenList.vue";
import { inject } from "inversify-props";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";

@Component({
	components: {
		AppNavigationWindowsBarItemChildrenList,
		VLabel,
		AppNavigationNavigationWindowIcon,
		VDropdownItem,
		VDropdown,
		VIcon
	}
})
export default class AppNavigationWindowsBarItem extends Vue {
	@Prop({ type: Object, required: true })
	private readonly window!: AppNavigationWindow;

	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	get child(): AppNavigationWindowChildren | undefined {
		return this.window.children.find((value) => value.isActive);
	}

	get isOpen(): boolean {
		return this.window.state === OpenNavigationWindowState;
	}

	open(): void {
		if (this.isOpen) return;
		this.appNavigationPresenter.openWindow(this.window, this);
	}

	close(): void {
		/* if (isUndefined(window.location)) {
			this.appNavigationPresenter.closeWindow(this, window);
			return;
		} */

		this.appNavigationPresenter.openNavigationWindowCloseModal(
			this,
			this.window
		);
	}
}
</script>
<style lang="scss" scoped>
.item {
	position: relative;
	flex-grow: 1;
	max-width: 280px;
	min-height: 36px;
	border-radius: 4px;
	box-shadow: RGB(0 0 0 / 12%) 0 0 8px 0;

	&:not(:last-child) {
		margin-right: 8px;
	}

	&:hover,
	&:focus {
		&:not(.active) {
			background-color: var(--kt-background-accent);
		}

		.body {
			.icon {
				opacity: var(--kt-icon-opacity-focused);
			}
		}

		.children {
			visibility: visible;
		}
	}

	&.active {
		color: var(--kt-primary-text-color);
		background-color: var(--kt-primary-color);

		.icon {
			opacity: var(--kt-icon-opacity-focused);
		}

		.body {
			.buttons {
				visibility: visible;
			}
		}
	}

	.body {
		padding: 0 8px;
		font-size: 14px;
		display: inline-flex;
		align-items: center;
		width: 100%;
		height: 100%;
		position: relative;

		.buttons {
			margin-left: 12px;
			display: flex;
			align-items: center;
			visibility: hidden;

			.button {
				border-radius: 4px;
				display: inline-flex;
				justify-content: center;
				align-items: center;

				&:hover {
					background-color: var(--kt-background-secondary);
				}

				svg {
					width: 16px;
					height: 16px;
				}
			}
		}
	}

	.icon {
		width: 24px;
		height: 24px;
		margin-right: 8px;
		vertical-align: middle;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: var(--kt-icon-opacity-unfocused);
	}

	.title {
		user-select: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		flex-grow: 1;
	}
}
</style>
