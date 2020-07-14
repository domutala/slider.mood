import { PluginFunction } from 'vue';
import Slider from '../component';

declare module 'vue/types/vue' {
  export interface VueConstructor {
    install: PluginFunction<{ name?: string }>;
  }
}

export default Slider;
