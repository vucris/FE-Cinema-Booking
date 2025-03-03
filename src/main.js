import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // 🛠 Đảm bảo đăng ký Pinia TRƯỚC khi mount app
app.use(router);
app.mount("#app");
