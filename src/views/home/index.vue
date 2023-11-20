<template>
  <div class="app-container">
    <div class="h-lg">
      <FileUpload
        :mime="['image/jpeg', 'image/png']"
        :limit="1024 * 500"
        tip="文件类型仅限jpeg/png，大小不得超过500kb"
      ></FileUpload>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
