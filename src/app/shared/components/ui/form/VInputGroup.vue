<template>
	<div :class="$style.component">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VInputGroup extends Vue {
	@Prop({ type: Boolean, default: false }) private readonly inlined!: boolean;
}
</script>
<style lang="scss" module>
.component {
	background-color: var(--kt-background-secondary);
	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	border-radius: 4px;
	margin: 6px 0;

	&:focus {
		.v--label {
			color: var(--kt-primary-color);
		}
	}

	&.v--input-group-inlined {
		flex-direction: row;
		flex-wrap: initial;
		align-items: center;
	}
}
</style>
