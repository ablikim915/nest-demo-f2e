import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {  
  Button, 
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Dialog,
  Pagination,
  Select,
  Option
} from "element-ui";

const components = [
  Button,
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Dialog,
  Pagination,
  Select,
  Option
];
components.map(item => Vue.component(item.name, item));

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
