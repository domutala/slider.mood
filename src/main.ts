import Vue from 'vue';
import App from './App.vue';
import Slider from '../component';

Vue.use(Slider);

Vue.config.productionTip = false;

new Vue({ render: h => h(App) }).$mount('#app');
