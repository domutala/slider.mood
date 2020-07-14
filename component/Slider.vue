<template>
  <div
    v-on="listeners"
    class="slider"
    :style="{
      position: 'absolute',
      width: '100%',
      height: ' 100%',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }"
    :key="key"
  >
    <div
      class="slider-container"
      :style="{
        left: `${x}px`,
        width: `${width * nSlides}px`,
        transitionDuration: `${duration}ms`,
        position: 'absolute',
        height: '100%',
        top: 0,
        transition: ' all 0.25s ease'
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import listeners from './listerners';
import { PluginFunction } from 'vue';

@Component
export default class Slider extends Vue {
  public static install(vue: typeof Vue, options?: { name?: string }) {
    vue.component(options?.name || 'Slider', Slider);
  }

  @Prop({ type: Boolean })
  private pause!: boolean;
  @Prop({ type: Boolean })
  private pauseOnHover!: boolean;

  @Prop({ type: Boolean, default: true })
  private slideOnTouch!: boolean;
  @Prop({ type: Boolean, default: true })
  private slideOnKeyboard!: boolean;
  @Prop({ type: Boolean, default: true })
  private slideOnMouse!: boolean;

  @Prop({ type: Boolean })
  private autoplay!: boolean;
  @Prop({ type: Number, default: 200 })
  private duration!: number;
  @Prop({ type: Boolean })
  private infinite!: boolean;
  @Prop({ type: Number, default: 1 })
  private visibleSlide!: number;
  @Prop({ type: Number, default: 0 })
  private stratSlide!: number;

  private nSlides = 0;
  private startOrigins = { x: 0, y: 0 };
  private laps = { w: 0, h: 0 };
  private x = 0;
  private currentX = 0;
  private currentSlide = 0;
  private width = 0;
  private dragStarted = false;
  private timesToRun = 0;
  private key = 1;
  private pauseInterne = false;

  private mounted() {
    this.initDrag();
    this.init();
    window.addEventListener('resize', this.init);
    this.slideTo(this.stratSlide);
    this.play();
  }

  private get listeners() {
    return {
      ...this.$listeners,
      ...listeners(this)
    };
  }

  @Watch('visibleSlide')
  private init() {
    const slider = this.$el.querySelector('.slider-container');
    const slides = slider?.children;

    if (slides) {
      this.width = this.$el.getBoundingClientRect().width / this.visibleSlide;
      this.nSlides = slides.length;
      this.currentX = this.x = -this.width * this.currentSlide;
      this.timesToRun = 0;

      for (let s = 0; s < slides.length; s++) {
        const slide = slides[s] as HTMLElement;
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = `${s * this.width}px`;
        slide.style.width = `${this.width}px`;
        slide.style.height = '100%';
      }
    }
  }

  private updated() {
    const slider = this.$el.querySelector('.slider-container');
    const slides = slider?.children;

    if (slides?.length !== this.nSlides) {
      this.init();
    }
  }

  private play() {
    if (this.autoplay) {
      if (!this.pause && !this.dragStarted && !this.pauseInterne) {
        this.timesToRun++;
      }
      setTimeout(() => {
        if (this.duration <= this.timesToRun) {
          this.timesToRun = 0;
          if (this.currentSlide + 1 < this.nSlides) {
            this.slideTo(this.currentSlide + 1);
          } else if (this.infinite) {
            this.slideTo(0);
          }
        }
        this.play();
      }, 1);
    }
  }

  @Watch('timesToRun')
  private watchTimeToRun() {
    this.$emit('timesToRun', this.timesToRun);
  }

  private initDrag() {
    if (this.slideOnTouch) {
      this.$el.addEventListener('touchstart', this.startDrag);
    }
    if (this.slideOnMouse) {
      this.$el.addEventListener('mousedown', this.startDrag);
    }

    this.$el.addEventListener('mouseenter', () => {
      if (this.pauseOnHover) {
        this.pauseInterne = true;
      }

      if (this.slideOnKeyboard) {
        window.addEventListener('keydown', this.dragWithArrowKey);
      }
    });
    this.$el.addEventListener('mouseleave', () => {
      this.pauseInterne = false;
      window.removeEventListener('keydown', this.dragWithArrowKey);
    });
  }
  private dragWithArrowKey(e: any) {
    if (e.key === 'ArrowRight') {
      this.next();
    } else if (e.key === 'ArrowLeft') {
      this.prev();
    }
  }
  private startDrag(e: any) {
    if (!this.pause) {
      // if (e.touches && e.touches.length === 1) {
      if (e.touches && e.touches[0]) {
        this.startOrigins.x = e.touches[0].clientX;
        this.startOrigins.y = e.touches[0].clientY;
      } else {
        this.startOrigins.x = e.clientX;
        this.startOrigins.y = e.clientY;
      }

      this.$el.addEventListener('touchmove', this.drag);
      this.$el.addEventListener('touchend', this.endDrag);

      this.$el.addEventListener('mousemove', this.drag);
      this.$el.addEventListener('mouseup', this.endDrag);
      // } else {
      //   this.startOrigins.x = 0;
      //   this.startOrigins.y = 0;

      //   this.laps.w = 0;
      //   this.laps.h = 0;
      // }
    }
  }
  private drag(e: any) {
    let lapsX = 0;
    let lapsY = 0;
    if (e.touches && e.touches[0]) {
      lapsX = e.touches[0].clientX - this.startOrigins.x;
      lapsY = e.touches[0].clientY - this.startOrigins.y;
    } else {
      lapsX = e.clientX - this.startOrigins.x;
      lapsY = e.clientY - this.startOrigins.y;
    }

    if (Math.abs(lapsX) > Math.abs(lapsY)) {
      if (Math.abs(lapsX) > 100) {
        this.dragStarted = true;
        e.stopPropagation();

        this.laps.w = lapsX;
        this.laps.h = lapsY;
        this.x = this.currentX + lapsX;

        if (Math.abs(this.laps.w) > this.width * 0.25) {
          this.endDrag(e);
        }
      }
    }
  }
  private endDrag(e: any) {
    this.$el.removeEventListener('touchmove', this.drag);
    this.$el.removeEventListener('touchend', this.endDrag);

    this.$el.removeEventListener('mousemove', this.drag);
    this.$el.removeEventListener('mouseup', this.endDrag);

    if (this.dragStarted) {
      this.dragStarted = false;
      this.timesToRun = 0;
      if (Math.abs(this.laps.w) > this.width * 0.25) {
        if (this.laps.w < 0) {
          this.next();
        } else {
          this.prev();
        }
      } else {
        this.x = this.currentX;
      }
    }
  }

  private slideTo(index: number) {
    if (!this.pause && index >= 0 && index < this.nSlides) {
      this.timesToRun = 0;
      this.x = this.currentX = -this.width * index;
      this.currentSlide = index;
      this.$emit('slide', { currentSlide: index });
    } else if (this.infinite) {
      if (index >= this.nSlides) {
        this.slideTo(0);
      } else {
        this.slideTo(this.nSlides - 1);
      }
    }
  }
  private next() {
    const index = this.currentSlide + 1;
    this.slideTo(index);
  }
  private prev() {
    const index = this.currentSlide - 1;
    this.slideTo(index);
  }
}
</script>
