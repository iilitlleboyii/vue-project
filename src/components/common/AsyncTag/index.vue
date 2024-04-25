<template>
  <div
    class="relative"
    :style="{
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <Suspense>
      <!-- 主要内容 -->
      <slot></slot>
      <!-- 加载中状态 -->
      <template #fallback>
        <div class="my-loading">
          <h2>正在玩命加载中</h2>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.my-loading {
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: transparent;

  h2 {
    color: #ccc;
    margin: 0;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    width: 0.6em;
    height: 0.6em;
    margin: 0.19em;
    background: #007db6;
    border-radius: 0.6em;
    animation: loading 1s infinite alternate;

    &:nth-of-type(2) {
      background: #008fb2;
      animation-delay: 0.2s;
    }
    &:nth-of-type(3) {
      background: #009b9e;
      animation-delay: 0.4s;
    }
    &:nth-of-type(4) {
      background: #00a77d;
      animation-delay: 0.6s;
    }
    &:nth-of-type(5) {
      background: #00b247;
      animation-delay: 0.8s;
    }
    &:nth-of-type(6) {
      background: #5ab027;
      animation-delay: 1s;
    }
    &:nth-of-type(7) {
      background: #a0b61e;
      animation-delay: 1.2s;
    }
  }
}

@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
