/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import "reflect-metadata";
import "@/register-service-worker";
import store from "@/store";
import init from "@/katan";
import Vue from "vue";
import App from "@/app/App.vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

const isProductionMode = process.env.NODE_ENV === "production";
Vue.config.devtools = !isProductionMode;
Vue.config.performance = !isProductionMode;
Vue.config.productionTip = !isProductionMode;

const vm = new Vue({
	store,
	router: new VueRouter({
		mode: "history",
		base: process.env.BASE_URL,
		routes: []
	}),
	i18n: new VueI18n({
		fallbackLocale: "en-US"
	}),
	render: (h) => h(App)
});

console.log("Before init");
vm.$once("init", () => {
	console.log("Once init");
	init(vm, () => vm.$emit("loaded"));
});

vm.$mount("#app");
