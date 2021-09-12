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
		<v-row>
			<v-col :size="8">
				<v-text :size="4" bold>
					{{ $t("views.system.accounts.title") }}
				</v-text>
				<v-text muted>
					{{ $t("views.system.accounts.description") }}
				</v-text>
				<hr />
				<v-form-input-group>
					<v-input
						v-model.trim="search"
						:placeholder="$t('views.system.accounts.search')"
						maxlength="64"
						@input="searchAccounts"
					/>
					<v-input-icon name="search" />
				</v-form-input-group>
				<v-row>
					<v-col :size="9">
						<section id="accounts" v-if="accounts">
							<v-flex-box
								class="v--flex-justify-space-between v--m-top-4"
							>
								<small class="v--text-cute">
									<span
										v-if="search.length !== 0"
										key="searching-account"
									>
										<i18n
											path="views.system.accounts.searching"
										>
											<template v-slot:value>{{
												search
											}}</template>
										</i18n>
									</span>
									<span v-else key="all-accounts">
										{{
											$t(
												"views.system.accounts.all-accounts",
												{
													count: -1
												}
											)
										}}
									</span>
								</small>
							</v-flex-box>
							<p
								v-if="search.length !== 0"
								class="v--text-muted v--m-bottom-2"
							>
								{{
									$t("views.system.accounts.results-found", {
										value: -1
									})
								}}
							</p>
							<v-field-list v-if="accounts">
								<div v-if="accounts.length !== 0">
									<transition-group
										name="v--transition-fast-list"
									>
										<!--
											we need a container here so that the list transitions
											do not apply to the VField, since it has no transition.
										-->
										<div
											v-for="account in accounts"
											:key="account.id"
											class="v--transition-fast-list-item account-item"
										>
											<SystemAccount :account="account" />
										</div>
									</transition-group>
								</div>
							</v-field-list>
						</section>
					</v-col>
				</v-row>
				<section id="content">
					<div class="content">
						<Loading
							v-if="accounts === null"
							class="accounts-loading"
						/>
					</div>
				</section>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import { MetaInfo } from "vue-meta";
import VFieldList from "@/app/shared/components/ui/field/VFieldList.vue";
import VField from "@/app/shared/components/ui/field/VField.vue";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import VInputIcon from "@/app/shared/components/ui/form/VInputIcon.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VSelect from "@/app/shared/components/ui/form/VSelect.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import Copyable from "@/app/shared/components/Copyable.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import VBoxBody from "@/app/shared/components/ui/box/VBoxBody.vue";
import VBoxHeader from "@/app/shared/components/ui/box/VBoxHeader.vue";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import SystemAccount from "@/app/system/components/SystemAccount.vue";
import PermissionList from "@/app/shared/components/PermissionList.vue";
import { inject } from "inversify-props";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import { SystemPresenter } from "@/app/system/system.presenter";
import VSelectOption from "@/app/shared/components/ui/form/VSelectOption.vue";
import { UserPresenter } from "@/app/user/user.presenter";
import { UserModel } from "@/app/user/models/user.model";
import VFormInputGroup from "@/app/shared/components/ui/form/VFormInputGroup.vue";
import Loading from "@/app/shared/components/Loading.vue";
import VFormLabel from "@/app/shared/components/ui/form/VFormLabel.vue";
import VText from "@/app/shared/components/ui/typography/VText.vue";

@Component<SystemAccounts>({
	components: {
		VText,
		VFormLabel,
		Loading,
		VFormInputGroup,
		VSelectOption,
		VContainer,
		SystemAccount,
		PermissionList,
		VBoxHeader,
		VBoxBody,
		VBox,
		Copyable,
		VLabel,
		VFlexBox,
		VSelect,
		VIcon,
		VInputIcon,
		VInputGroup,
		VInput,
		VForm,
		VField,
		VFieldList,
		VCol,
		VRow
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "system.accounts");
	},
	created(): void {
		(this as SystemAccounts).userPresenter.userService
			.listUsers()
			.then((users) => {
				this.accounts = users;
				this._accounts = Object.freeze(users);
			})
			.catch((err) => {
				console.log("error while fetchin accounts", err);
			});
	}
})
export default class SystemAccounts extends Vue {
	// reactive for searching
	accounts: UserModel[] | null = null;
	search = "";
	error: any | null = null;
	@inject() private readonly systemPresenter!: SystemPresenter;
	@inject() private readonly userPresenter!: UserPresenter;
	// preserved non-reactive for de-searching
	private _accounts: readonly UserModel[] = [];

	@Watch("search")
	onSearch(oldValue: string, newValue: string): void {
		console.log(oldValue, newValue);
	}

	searchAccounts(): void {
		const search = this.search;
		if (search.length === 0) Object.assign(this.accounts, this._accounts);
		else
			this.accounts = this._accounts.filter((account: any) =>
				account.username.match(new RegExp(search, "gi"))
			);
	}
}
</script>
<style lang="scss" scoped>
.content {
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.accounts-loading {
	width: 96px;
	height: 96px;
}

.system-accounts {
	.account-item {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 6px;
		}
	}
}
</style>
