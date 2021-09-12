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
		<h4>
			<b>Bem-vindo(a), {{ user.username }}.</b>
		</h4>
		<section id="servers">
			<ul class="server-list">
				<li v-for="server in servers" :key="server.id">
					<Avatar :src="undefined" class="icon" />
					<div class="info">
						<p class="name">{{ server.name }}</p>
					</div>
				</li>
			</ul>
		</section>
		<!-- <h4><b>Primeiros passos</b></h4>
		<v-task-container>
			<v-task-list>
				<AppHomeEmailTaskItem />
				<AppHomeCreateServerTaskItem />
			</v-task-list>
		</v-task-container>
		<h4>Welcome back, Natan.</h4>
		<v-row>
			<v-col :size="6">
				<h4>Biblioteca de jogos</h4>
				<HomeGameList />
			</v-col>
			<v-col :size="6">
				<h4>Lista de servidores</h4>
				<ListWithThumbnailLoader :width="1024" :height="1024" />
			</v-col>
		</v-row> -->
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import { USER_INJECTION_KEY } from "@/app/user/user.module";
import { UserModel } from "@/app/user/models/user.model";
import { inject } from "inversify-props";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import Avatar from "@/app/shared/components/Avatar.vue";

@Component<AppHome>({
	components: {
		Avatar,
		VCol,
		VRow,
		VBox,
		VFlexBox,
		VContainer
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "home");
	}
})
export default class AppHome extends Vue {
	@inject(USER_INJECTION_KEY)
	private readonly user!: UserModel;

	private readonly games: readonly any[] = Object.freeze([
		{
			id: "minecraft",
			image:
				"https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png"
		},
		{
			id: "gta",
			image: "https://meups.com.br/wp-content/uploads/2019/10/GTA-V.jpg"
		},
		{
			id: "rust",
			image:
				"https://image.api.playstation.com/vulcan/ap/rnd/202103/1609/7fPS16E9bbTgKkTL6tnWMDHG.png"
		}
	]);

	private readonly servers: readonly any[] = Object.freeze([
		{
			id: "ru",
			name: "RankUP"
		},
		{
			id: "sv",
			name: "Survival"
		},
		{
			id: "mg",
			name: "Minigames"
		}
	]);
}
</script>
<style lang="scss" scoped>
.gallery {
	display: flex;

	li {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		width: 240px;
		height: 240px;
		margin: 0 4px;
		border-radius: 4px;
	}
}
</style>
