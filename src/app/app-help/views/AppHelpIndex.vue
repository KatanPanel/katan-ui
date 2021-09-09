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
		<h4><b v-text="$t('views.help.title')" /></h4>
		<v-row>
			<v-col :size="6">
				<i18n
					class="v--text-muted"
					path="views.help.description"
					tag="p"
				>
					<a
						href="https://katan.org/docs"
						target="blank"
						v-text="$t('views.help.documentation')"
					/>
				</i18n>
			</v-col>
		</v-row>
		<hr />
	</v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { AppNavigationWindowChildMixin } from "@/app/app-navigation/mixins/app-navigation-window-child-mixin.component";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";

@Component<AppHelpIndex>({
	components: { VCol, VRow, VContainer },
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "help");
	}
})
export default class AppHelpIndex extends mixins(
	AppNavigationWindowChildMixin
) {}
</script>
