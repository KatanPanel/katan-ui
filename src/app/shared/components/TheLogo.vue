<template>
	<img v-if="!containerized" :alt="alt" :src="`/img/${color}`" />
	<div :style="{ backgroundImage: `url(/img/${color})` }" v-else />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TheLogo extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly white!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly filled!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly containerized!: boolean;

	@Prop({ type: String, default: "Katan Logo" })
	private readonly alt!: string;

	get color(): string {
		return this.white
			? "logo-white.png"
			: this.filled
			? "logo-white-filled.png"
			: "logo.svg";
	}
}
</script>
