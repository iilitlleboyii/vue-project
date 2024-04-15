<template>
  <div class="screen">
    <div class="particle">
      <iframe frameborder="0" src="../../../html/particle.html" style="width: 100%; height: 100%"></iframe>
    </div>
    <div class="maps">
      <div class="map pc1"></div>
      <div class="map pc2"></div>
      <div class="map pc3"></div>
    </div>
  </div>
</template>

<script setup name="Screen"></script>

<style lang="scss" scoped>
.screen {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/screen/bg.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;

  .particle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 99%;
    z-index: 1;
    opacity: 0.5;
  }

  .maps {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .map {
    position: absolute;
    top: 170px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .pc1 {
    width: 500px;
    height: 500px;
    background: url('@/assets/images/screen/lbx.png') no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    animation: rotate1 15s infinite linear;
  }

  .pc2 {
    width: 407px;
    height: 407px;
    background: url('@/assets/images/screen/jt.png') no-repeat;
    background-size: 100% 100%;
    z-index: 3;
    animation: rotate2 10s infinite linear;
  }

  .pc3 {
    width: 370px;
    height: 370px;
    background: url('@/assets/images/screen/map.png') no-repeat;
    background-size: 100% 100%;
    z-index: 2;
    animation: rotate2 10s infinite linear;
  }
}

@keyframes rotate1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes rotate2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-359deg);
  }
}
</style>
