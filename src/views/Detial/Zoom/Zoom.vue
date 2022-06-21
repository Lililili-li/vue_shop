<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" ref="bigimg"/>
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: ['skuImageList'],
  data () {
    return {
      index: 0
    }
  },
  methods: {
    changeimg () {
      this.$bus.$on('changeimg', (index) => {
        this.index = index
      })
    },
    handler (event) {
      const offsetx = event.offsetX
      const offsety = event.offsetY
      const mask = this.$refs.mask
      const bigimg = this.$refs.bigimg
      const big = this.$refs.big
      mask.style.left = offsetx - mask.offsetWidth / 2 + 'px'
      mask.style.top = offsety - mask.offsetHeight / 2 + 'px'
      big.style.left = -2 * (offsetx - mask.offsetWidth / 2) + 'px'
      big.style.top = -2 * (offsety - mask.offsetHeight / 2) + 'px'
      if (offsetx < mask.offsetWidth / 2) {
        mask.style.left = 0
        big.style.left = 0
      } else if ((bigimg.offsetWidth - offsetx) < mask.offsetWidth / 2) {
        mask.style.left = bigimg.offsetWidth - mask.offsetWidth + 'px'
        big.style.left = -2 * (bigimg.offsetWidth - mask.offsetWidth) + 'px'
      }
      if (offsety < mask.offsetHeight / 2) {
        mask.style.top = 0
        big.style.top = 0
      } else if ((bigimg.offsetHeight - offsety) < mask.offsetHeight / 2) {
        mask.style.top = bigimg.offsetHeight - mask.offsetHeight + 'px'
        big.style.top = -2 * (bigimg.offsetHeight - mask.offsetHeight) + 'px'
      }
    }
  },
  computed: {
    imgObj () {
      return this.skuImageList[this.index] || {}
    }
  },
  mounted () {
    this.changeimg()
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  >img {
    width: 100%;
    height: 100%;

  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
    cursor: crosshair;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    cursor: crosshair;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;
    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
    cursor: crosshair;
  }
}
</style>
