<style lang="css" scoped>
.container {
  position: relative;
  height: 300px;
  max-width: 650px;
  margin: auto;
  margin-top: 20px;
  border-radius: 0.5em;
  overflow: hidden;
  border: 1px solid rgb(206, 206, 206);
}
.container div {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>

<template>
  <div id="app">
    <div class="container">
      <Slider
        ref="slider"
        class=""
        infinite
        autoplay
        :visibleSlide="1"
        pauseOnHover
      >
        <div
          v-for="i in 5"
          :key="i"
          :style="{ backgroundColor: colors[i - 1] }"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
          voluptatem quod ea, provident expedita eius veniam hic nostrum
          dolorem. Consequuntur impedit animi in illum totam beatae culpa nobis
          eveniet alias?
        </div>
      </Slider>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private colors = ['#ffe929', '#2f2f2f', '#ff0e0e', '#0d2af9', '#f90de7'];
}
</script>
