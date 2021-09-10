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
	<div
		:class="[
			$style.component,
			{
				[$style['color-primary']]: colorPrimary,
				[$style['color-danger']]: colorDanger,
				[$style['color-warning']]: colorWarning
			}
		]"
	>
		<div v-if="hasTitle" :class="$style.title">
			<slot name="title" />
		</div>
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { isUndefined } from "@/app/shared/utils";

@Component
export default class VWall extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly colorPrimary!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly colorDanger!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly colorWarning!: boolean;

	/**
	 * Returns if the component has a title.
	 */
	get hasTitle(): boolean {
		return !isUndefined(this.$scopedSlots.title);
	}
}
</script>
<style lang="scss" module>
.component {
	border-radius: 4px;
	padding: 12px;
	background-color: var(--kt-background-tertiary);
	color: var(--kt-muted-color);
	font-size: 14px;
	margin-bottom: 1rem;
}

.title {
	font-weight: 700;
	margin-bottom: 1rem;
}

.color-primary {
	background-color: var(--kt-primary-rgba-color);
	color: var(--kt-primary-color);
}

.color-danger {
	background-color: var(--kt-danger-rgba-color);
	color: var(--kt-danger-color);
}

.color-warning {
	background-color: RGB(var(--kt-warning-color-rgb) / 12%);
	color: RGB(var(--kt-warning-color-rgb));
}
</style>
