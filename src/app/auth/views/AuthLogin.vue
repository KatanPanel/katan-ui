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
	<section id="auth-login">
		<h4 v-text="$t('views.login.title')" />
		<p v-if="error" class="error v--text-error">
			{{ $t(`errors.${error}`) }}
		</p>
		<v-form class="form" @submit.native.prevent="login">
			<v-form-input-group>
				<v-form-input
					v-model="credentials.username"
					:placeholder="$t('views.login.fields.username')"
					aria-required="true"
					autocomplete="username"
					maxlength="32"
					required
					spellcheck="false"
					type="text"
				/>
			</v-form-input-group>
			<v-form-input-group>
				<v-form-input
					v-model="credentials.password"
					:placeholder="$t('views.login.fields.password')"
					autocomplete="current-password"
					maxlength="32"
					spellcheck="false"
					type="password"
				/>
			</v-form-input-group>
			<v-flex-box :column="true" justify="end">
				<v-button
					:color-primary="true"
					:disabled="locked"
					:style-block="true"
					class="submit"
					type="submit"
				>
					<span
						v-if="!locked"
						v-text="$t('views.login.fields.confirm')"
					/>
					<Loading v-else />
				</v-button>
			</v-flex-box>
		</v-form>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import AuthLayout from "@/app/auth/layouts/AuthLayout.vue";
import { inject } from "inversify-props";
import { AuthPresenter } from "@/app/auth/auth.presenter";
import { AxiosError } from "axios";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VFormInputGroup from "@/app/shared/components/ui/form/VFormInputGroup.vue";
import VFormInput from "@/app/shared/components/ui/form/VFormInput.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import Loading from "@/app/shared/components/Loading.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VFormLabel from "@/app/shared/components/ui/form/VFormLabel.vue";

@Component<AuthLogin>({
	components: {
		VFormLabel,
		VButton,
		Loading,
		VFlexBox,
		VFormInput,
		VFormInputGroup,
		VForm,
		AuthLayout
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "login");
	}
})
export default class AuthLogin extends Vue {
	locked = false;
	credentials = {
		username: "",
		password: ""
	};
	error: string | null = null;
	@inject() private readonly authPresenter!: AuthPresenter;

	login(): void {
		if (this.locked) return;

		this.locked = true;
		this.error = null;
		this.authPresenter
			.authenticate(this.credentials.username, this.credentials.password)
			.then(() => this.loginCompleted())
			.catch((err: AxiosError) => this.loginFailed(err))
			.finally(() => (this.locked = false));
	}

	loginCompleted() {
		// this.$router.replace({ name: "home" });
	}

	loginFailed(error: AxiosError): void {
		let code =
			error.response?.data?.code || error.response?.status || error?.code;

		if (!code) {
			const raw = error.toString();
			code = raw.substring(raw?.indexOf(" ") + 1, raw.length);
		}

		this.error = code || "Network Error";
	}
}
</script>
<style lang="scss" scoped>
.form {
	margin-top: 24px;
	display: block;
}

.submit {
	margin-top: 24px;
}
</style>
