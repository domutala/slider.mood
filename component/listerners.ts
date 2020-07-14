import Vue from 'vue';

const listners = (vue: Vue) => {
  return {
    input: (e: any) => {
      /** pass */
      // vue.$emit('input', e);
    },
    click: (event: any) => {
      vue.$emit('click', event);
    },
    dblclick: (event: any) => {
      vue.$emit('dblclick', event);
    },

    focus: (event: any) => {
      vue.$emit('focus', event);
    },
    focusin: (event: any) => {
      vue.$emit('focusin', event);
    },
    focusout: (event: any) => {
      vue.$emit('focusout', event);
    },

    blur: (event: any) => {
      vue.$emit('blur', event);
    },
    scroll: (event: any) => {
      vue.$emit('scroll', event);
    },
    resize: (event: any) => {
      vue.$emit('resize', event);
    },

    keyup: (event: any) => {
      vue.$emit('keyup', event);
    },
    keydown: (event: any) => {
      vue.$emit('keydown', event);
    },
    keypress: (event: any) => {
      vue.$emit('keypress', event);
    },

    mouseenter: (event: any) => {
      vue.$emit('mouseenter', event);
    },
    mouseleave: (event: any) => {
      vue.$emit('mouseleave', event);
    },
    mousedown: (event: any) => {
      vue.$emit('mousedown', event);
    },
    mousemove: (event: any) => {
      vue.$emit('mousemove', event);
    },
    mouseout: (event: any) => {
      vue.$emit('mouseout', event);
    },
    mouseup: (event: any) => {
      vue.$emit('mouseup', event);
    },
    mousewheel: (event: any) => {
      vue.$emit('mousewheel', event);
    },

    touchstart: (event: any) => {
      vue.$emit('touchstart', event);
    },
    touchmove: (event: any) => {
      vue.$emit('touchmove', event);
    },
    touchcancel: (event: any) => {
      vue.$emit('touchcancel', event);
    },
    touchend: (event: any) => {
      vue.$emit('touchend', event);
    }
  };
};

export default listners;
