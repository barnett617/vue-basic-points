<template>
  <div>
    <h2>位置信息</h2>
    <table>
      <tbody>
        <tr v-for="row of rows" :key="row.label">
          <td>{{row.label}}</td>
          <td>{{row.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      rows: [],
      labelMap: {
        country: '国家',
        regionName: '省',
        city: '市',
        lat: '维度',
        lon: '经度',
        isp: '网络提供商',
        query: 'IP地址'
      },
      uselessKeys: ['status', 'countryCode', 'region', 'zip', 'timezone', 'org', 'as']
    }
  },
  mounted() {
    this.getLoc();
  },
  methods: {
    getLoc() {
      let url = 'http://47.92.228.193:8990/'
      axios.get(url).then(res => res.data).then(res => {
        console.log('res', res);
        if (+res.errno === 0) {
          const obj = res.data
          this.rows = Object.keys(obj)
          .filter(key => !this.uselessKeys.includes(key))
          .map(key => {
            return {
              label: this.labelMap[key],
              value: obj[key]
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
table {
  margin: auto;
  tr {
    border: 1px solid gray;
  }
  td {
    border: 1px solid goldenrod;
  }
}
</style>

