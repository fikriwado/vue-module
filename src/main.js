import { createApp } from "vue";
import App from "./App.vue";
import router from "./common/routes/router";
import i18n from "./common/i18n/i18n";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

const app = createApp(App);
app.use(router).use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount("#app");
