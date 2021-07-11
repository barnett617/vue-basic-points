<template>
  <div class="point-item">{{pointItem.name}}</div>
</template>
<script>
export default {
  name: 'point-item',
  props: {
    pointItem: {
      type: Object,
      value: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.point-item {
  margin: 10px 0;
  padding: 10px 0;
  background-color:bisque;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
}
</style>