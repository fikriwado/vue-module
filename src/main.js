import { createApp } from "vue";
import App from "./App.vue";
import router from "./common/routes/router";
import i18n from "./common/i18n/i18n";

const app = createApp(App);
app.use(router).use(i18n).mount("#app");
