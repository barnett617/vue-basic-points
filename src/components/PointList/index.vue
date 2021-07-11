<template>
  <div class="point-list" @click="listClicked">
    <point-item v-for="point of pointList" :key="point.name" :pointItem="point"></point-item>
  </div>
</template>
<script>
import PointItem from '../PointItem'
export default {
  name: 'PointList',
  components: {
    'point-item': PointItem
  },
  props: {
    pointList: {
      type: Array,
      value: []
    }
  },
  methods: {
    listClicked(e) {
      window.e = e;
    }
  }
}
</script>
