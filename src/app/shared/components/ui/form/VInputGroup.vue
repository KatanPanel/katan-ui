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
	background-color: var(--kt-background-accent);
	position: relative;
	display: flex;
	flex-direction: row;
	border-radius: 4px;

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
