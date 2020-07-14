import component from './Slider.vue';

if (typeof window !== 'undefined' && window.Vue) {
  component.install(window.Vue);
}

export default component;
