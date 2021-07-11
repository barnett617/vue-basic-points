<template>
  <div class="home">
    <point-list :pointList="pointListData"/>
  </div>
</template>

<script>
import PointList from '../components/PointList/index.vue'
import { points } from '../model/basic-points'
import { deepCopy } from '../common/js/utils'
export default {
  name: 'Home',
  components: {
    'point-list': PointList
  },
  data() {
    return {
      pointListData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data = deepCopy(points);
      this.pointListData = Object.values(data).map(name => {
        return {
          name
        }
      })
    }
  }
}
</script>
