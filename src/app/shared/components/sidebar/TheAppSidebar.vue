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
	<aside class="sidebar">
		<AppSidebarItemList>
			<AppSidebarItem :link="{ name: 'home' }">
				<TheLogo :white="true" class="logo" />
			</AppSidebarItem>
		</AppSidebarItemList>
		<AppSidebarItemList>
			<AppSidebarItem
				:link="{ name: 'system.accounts' }"
				:tooltip="$t('navigation.sidebar.tooltips.modules')"
			>
				<v-icon name="apps" />
			</AppSidebarItem>
			<AppSidebarItem
				:link="{ name: 'role', params: { id: '3' } }"
				:tooltip="$t('navigation.sidebar.tooltips.new-resource')"
			>
				<v-icon name="add" />
			</AppSidebarItem>
		</AppSidebarItemList>
		<AppSidebarItemList>
			<AppSidebarItem
				:link="{ name: 'game-library' }"
				:tooltip="$t('navigation.sidebar.tooltips.search')"
			>
				<v-icon name="search" />
			</AppSidebarItem>
			<AppSidebarItem
				:link="{ name: 'help' }"
				:tooltip="$t('navigation.sidebar.tooltips.help')"
			>
				<v-icon name="help" />
			</AppSidebarItem>
			<AppSidebarItem
				:link="{ name: 'account' }"
				:link-redirectable="false"
				:tooltip="$t('navigation.sidebar.tooltips.my-account')"
				class="user-avatar"
			>
				<Avatar :src="user.avatar" alt="User avatar" />
			</AppSidebarItem>
		</AppSidebarItemList>
	</aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import TheLogo from "@/app/shared/components/TheLogo.vue";
import AppSidebarItemList from "@/app/shared/components/sidebar/AppSidebarItemList.vue";
import AppSidebarItem from "@/app/shared/components/sidebar/AppSidebarItem.vue";
import { UserModel } from "@/app/user/models/user.model";
import { USER_INJECTION_KEY } from "@/app/user/user.module";
import Avatar from "@/app/shared/components/Avatar.vue";
import { inject } from "inversify-props";

@Component({
	components: {
		Avatar,
		AppSidebarItem,
		AppSidebarItemList,
		VIcon,
		TheLogo
	}
})
export default class TheAppSidebar extends Vue {
	@inject(USER_INJECTION_KEY)
	private readonly user!: UserModel;
}
</script>
<style lang="scss" scoped>
$sidebar-width: 70px;

.sidebar {
	position: relative;
	width: $sidebar-width;
	min-width: $sidebar-width;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: auto;
	box-shadow: rgba(0, 0, 0, 0.12) 0 0 6px 0;
	background-color: var(--kt-sidebar-background);

	&::-webkit-scrollbar {
		width: 6px;
		background-color: var(--kt-scrollbar);
	}

	&::-webkit-scrollbar-track {
		border-radius: 8px;
		background-color: var(--kt-scrollbar);
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 8px;
		background-color: var(--kt-scrollbar-thumb);
	}

	.logo {
		width: 40px;
		height: 40px;
	}
}

.user-avatar {
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 0.38);

	&:hover,
	&:focus {
		border-color: #ffffff;
	}

	.avatar {
		width: 30px;
		height: 30px;
	}
}
</style>
