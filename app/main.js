import Vue from "nativescript-vue";
import App from "./App.vue";

import http from "http"

Vue.prototype.$http = http

const app = new Vue({
  render: h => h("app"),

  components: {
    App
  }
});

app.$start();
