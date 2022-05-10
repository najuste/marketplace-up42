import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';

/** to pass events without re-emiting events or prop drilling */
export const EventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
