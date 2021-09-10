<template>
	<input
		@input="$emit('input', $event.target.value, $event)"
		v-bind="{
			'aria-required': required,
			'aria-label': label,
			'aria-disabled': disabled
		}"
		:disabled="disabled"
		:required="required"
		:class="$style.component"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VFormInput extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly required!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;

	@Prop({ type: String })
	private readonly label!: string;
}
</script>
<style lang="scss" module>
.component {
	background-color: var(--kt-background-secondary);
	display: flex;
	appearance: none;
	-webkit-appearance: none;
	outline: none;
	box-shadow: none;
	padding: 0 8px;
	height: 37px;
	color: var(--kt-text-color);
	font-weight: 500;
	font-size: 14px;
	border: 1px solid var(--kt-border-color);
	border-radius: 4px;
	width: 100%;

	&::placeholder,
	&::-webkit-input-placeholder {
		color: var(--kt-muted-color);
	}

	&:not([readonly]):focus {
		border-color: var(--kt-primary-color);
	}

	&:not([disabled]):not(:focus):hover {
		border-color: var(--kt-border-accent);
	}

	&[readonly] {
		user-select: none;
		cursor: default;
	}

	&[disabled] {
		opacity: 0.54;
	}
}
</style>
