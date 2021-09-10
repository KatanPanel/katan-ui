<template>
	<div class="auth-layout">
		<div class="auth-container">
			<div class="auth-box">
				<a href="https://katan.org" target="blank">
					<TheLogo :match-theme="true" class="auth-logo" />
				</a>
				<div class="auth-content-body">
					<slot />
					<div class="copyright">
						&copy; 2020 - {{ new Date().getFullYear() }}
						<a href="https://katan.org" target="blank">Katan</a>.
					</div>
				</div>
			</div>
			<div
				:style="{
					backgroundImage: `url(/img/games/illustrations/${wallpaper.file})`
				}"
				class="auth-right"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheLogo from "@/app/shared/components/TheLogo.vue";

@Component<AuthLayout>({
	components: {
		TheLogo
	},
	beforeMount(): void {
		this.updateWallpaper();
	}
})
export default class AuthLayout extends Vue {
	wallpaper: any | null = null;

	updateWallpaper(): void {
		const illustrations: any[] = require("@/assets/illustrations");
		this.wallpaper =
			illustrations[Math.floor(Math.random() * illustrations.length)];
	}
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/abstracts/variables";

.auth-layout {
	height: 100%;

	.auth-container {
		display: flex;
		align-items: center;
		height: 100%;

		.copyright {
			margin: 12px 0;
			opacity: 0.38;
			font-size: 12px;
			user-select: none;
			position: absolute;
			bottom: 0;

			a {
				text-decoration: none !important;
			}

			@media (max-width: map-get($breakpoints, "medium")) {
				a {
				}
			}
		}

		.auth-right {
			position: relative;
			flex: 1;
			display: flex;
			height: 100%;
			flex-direction: row;
			align-items: flex-end;
			overflow: hidden;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;

			&:hover .game-name,
			&:hover .version-info {
				opacity: 1;
			}

			@media (max-width: map-get($breakpoints, "medium")) {
				& {
					display: none;
				}
			}
		}

		.auth-box {
			align-items: normal;
			z-index: 1;
			background: var(--kt-background-secondary);
			position: relative;
			left: 0;
			height: 100%;
			padding: 72px;
			width: 35%;
			max-width: 35%;
			box-shadow: RGB(0 0 0 / 24%) 4px 0 8px 0;

			@media (max-width: map-get($breakpoints, "medium")) {
				& {
					width: 100%;
					max-width: 100%;
					padding: 24px;
				}
			}

			.auth-logo {
				max-width: 54px;
				max-height: 54px;
				position: relative;
				margin-bottom: 144px;
			}

			@media (max-width: map-get($breakpoints, "medium")) {
				.auth-image {
					display: none;
				}
			}

			.auth-content-body {
				margin-bottom: 24px;
			}

			.auth-language-box {
				position: absolute;
				bottom: 0;
				right: 0;
				margin: 24px 48px;
				display: flex;
				font-size: 13px;
				font-weight: 400;

				@media (max-width: map-get($breakpoints, "medium")) {
					& {
						position: relative;
						justify-content: center;
					}
				}

				.auth-language-dropdown {
					&:hover {
						text-decoration: underline;
						cursor: pointer;
						color: var(--kt-muted-color);
					}

					&:focus {
						color: var(--kt-muted-color);
					}

					.auth-language {
						display: inline-flex;
						align-items: center;
						user-select: none;
					}
				}
			}
		}
	}
}
</style>
