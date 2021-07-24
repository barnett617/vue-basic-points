<template>
  <div>
    <h2 @click="clickTitle">位置信息</h2>
    <table>
      <tbody>
        <tr
          v-for="row of rows"
          :key="row.label"
        >
          <td>{{row.label}}</td>
          <td>{{row.value}}</td>
          </tr>
          <tr>
            <td>IP定位地址</td>
            <td>{{address}}</td>
          </tr>
          <tr>
            <td>GPS定位地址</td>
            <td>{{gpsAddr}}</td>
          </tr>
      </tbody>
    </table>
    <my-map :lat="lat" :lng="lng" @getAddr="handleAddr" @getGpsAddr="handleGpsAddr" />
  </div>
</template>
<script>
import axios from "axios"
import { account } from '../../account'
export default {
  components: {
    'my-map': () => import('../components/Map')
  },
  data() {
    return {
      rows: [],
      lat: 0,
      lng: 0,
      address: '',
      gpsAddr: '暂无',
      clickCount: 0,
      consoleShow: false,
      dataMap: {
        "ip": 'IP',
        "continent_name": '洲名',
        "country_name": '国家',
        "region_name": '省',
        "city": '市',
        "zip": '邮编',
        "latitude": '维度',
        "longitude": '经度',
        "location": {
          "country_flag_emoji": 'emoji'
        }
      }
    };
  },
  created() {
    this.hideVConsole()
    this.getLoc();
  },
  methods: {
    getLoc() {
      let url = `//${account.api}/api/loc`;
      axios
        .get(url)
        .then(res => res.data)
        .then(res => {
          console.log("res", res);
          if (+res.errno === 0) {
            const obj = res.data;
            if (obj.latitude) {
              this.lat = obj.latitude * 1
              this.lng = obj.longitude * 1
            }
            this.rows = Object.keys(obj)
              .filter(key => Object.keys(this.dataMap).includes(key))
              .map(key => {
                return key === 'location' ? {
                  label: '国旗',
                  value: obj[key]['country_flag_emoji']
                } : {
                  label: this.dataMap[key],
                  value: obj[key]
                };
              });
          }
        });
    },
    handleAddr(addr) {
      this.address = addr
    },
    handleGpsAddr(addr) {
      this.gpsAddr = addr
    },
    clickTitle() {
      this.clickCount = this.clickCount + 1
      if (this.clickCount === 5) {
        if (!this.consoleShow) {
          this.consoleShow = true
          this.showVConsole()
        }
      }
      setTimeout(() => {
        this.clickCount = 0
      }, 2000)
    },
    hideVConsole() {
      const con = document.getElementById('__vconsole')
      con.style.display = 'none'
    },
    showVConsole() {
      const con = document.getElementById('__vconsole')
      con.style.display = 'block'
    }
  }
};
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
  td:nth-child(even) {
    width: 300px;
  }
}
</style>

