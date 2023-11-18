<template>
  <div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>刷新当前</v-contextmenu-item>
      <v-contextmenu-item>关闭当前</v-contextmenu-item>
      <v-contextmenu-item>关闭左侧</v-contextmenu-item>
      <v-contextmenu-item>关闭右侧</v-contextmenu-item>
      <v-contextmenu-item>关闭全部</v-contextmenu-item>
    </v-contextmenu>
    <slot />
  </div>
</template>
