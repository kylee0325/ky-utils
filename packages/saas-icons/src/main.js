import { createApp } from "vue";
import App from "./App.vue";
import * as Icons from "./index.js";

const app = createApp(App);

Object.keys(Icons).forEach((item) => {
  app.component(item, Icons[item]);
});

app.mount("#app");

// createApp(App).mount('#app')
