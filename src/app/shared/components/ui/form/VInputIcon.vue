<template>
	<div :class="$style.component">
		<v-icon :name="name" />
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";

@Component({
	components: { VIcon }
})
export default class VInputIcon extends Vue {
	@Prop({ type: String, required: true }) private readonly name!: string;
}
</script>
<style lang="scss" module>
.component {
	padding: 0 6px;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		fill: var(--kt-muted-color);
	}
}
</style>
