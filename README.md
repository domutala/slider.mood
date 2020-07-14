# Slider.mood

Vue.js slider component

## Installing

```PowerShell
# npm
npm i --save slider.mood

# yarn
yarn add slider.mood

```

## Usage

### Overall use

```Javascript
import Vue from 'vue';
import Slider from 'slider.mood';

// You can change the name of the component if you wish
Vue.use(Slider, {name: 'Slider'});
```

### Single file

```Vue
<script lang="js">
import Slider from "slider.mood";

export default {
  components: {
    Slider
  }
}
</script>
```

### In your vue.js file

After that you can use the component in your code as follows.

```Vue
<template>
  <div id="app">
    <slider>
       <div class="my-slider-one">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          voluptatem quod ea, provident expedita eius veniam hic nostrum
          dolorem. Consequuntur impedit animi in illum totam beatae culpa nobis
          eveniet alias?
        </div>
        <div class="my-slider-two">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          voluptatem quod ea, provident expedita eius veniam hic nostrum
          dolorem. Consequuntur impedit animi in illum totam beatae culpa nobis
          eveniet alias?
        </div>
        <div class="my-slider-three">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          voluptatem quod ea, provident expedita eius veniam hic nostrum
          dolorem. Consequuntur impedit animi in illum totam beatae culpa nobis
          eveniet alias?
        </div>
    </slider>
  </div>
</template>
```

## Props

### pause

- **type**: _boolean_
- **requred**: _false_
- **default**: _false_

### pauseOnHover

- **type**: _boolean_
- **requred**: _false_
- **default**: _false_

### slideOnTouch

the component will be slide with touchEnvent

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

### slideOnKeyboard

the component will be slide with keyboardEnvent

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

### slideOnMouse

the component will be slide with mouseEnvent

- **type**: _boolean_
- **requred**: _false_
- **default**: _true_

### autoplay

- **type**: _boolean_
- **requred**: _false_
- **default**: _false_

### duration

- **type**: _number_
- **requred**: _false_
- **default**: _200_

### infinite

- **type**: _boolean_
- **requred**: _false_
- **default**: _false_

### visibleSlide

the number of slides to display

- **type**: _number_
- **requred**: _false_
- **default**: _1_

### stratSlide

- **type**: _number_
- **requred**: _false_
- **default**: _0_

## Functions

### slideTo

```Vue
<script>
export default {

  methods: {
    // ...

    slideTo() {
      const slider = this.$refs.slider;
      slider.slideTo(3);
    }
  }
}
</script>
```

### next

Slide to next slide

```Vue
<script>
export default {

  methods: {
    // ...

    slideTo() {
      const slider = this.$refs.slider;
      slider.next();
    }
  }
}
</script>
```

### prev

Slide to prevent slide

```Vue
<script>
export default {

  methods: {
    // ...

    slideTo() {
      const slider = this.$refs.slider;
      slider.prev();
    }
  }
}
</script>
```

## Author

**[@domutala](https://github.com/domutala)**

## License

MIT
