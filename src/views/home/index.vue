<template>
  <div class="app-container">
    <div class="flex gap-4">
      <TreeSelector :dataSource="data" @nodes-change="onNodesChange"></TreeSelector>
      <div class="h-lg">
        <FileUpload
          :mime="['image/jpeg', 'image/png']"
          :limit="1024 * 500"
          tip="文件类型仅限jpeg/png，大小不得超过500kb"
        ></FileUpload>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1'
          },
          {
            id: 10,
            label: 'Level three 1-1-2 Level three 1-1-2 Level three 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
    ]
  }
]

function onNodesChange(data) {
  console.log(data)
}
</script>

<style lang="scss" scoped></style>
