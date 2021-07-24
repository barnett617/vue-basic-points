<template>
  <div class="map-wrap">
    <div id='container'>
    </div>
    <!-- <button @click="showPanorama">展示全景图</button> -->
    <div id='panorama'></div>
    <div id='markResult'>{{clickedAddr}}</div>
  </div>
</template>
<script>
import { baiduMap } from "../../common/js/utils";
import { account } from "../../../account";
export default {
  props: {
    lat: Number,
    lng: Number
  },
  data() {
    return {
      ak: account.ak,
      zoomSize: 16,
      map: null,
      clickedAddr: ""
    };
  },
  watch: {
    lat() {
      this.renderMap();
    }
  },
  mounted() {
    if (this.lat && window.BMapGL) {
      this.initMap();
    }
  },
  methods: {
    renderMap() {
      const that = this;
      this.$nextTick(() => {
        baiduMap(this.ak).then(() => {
          that.initMap();
        });
      });
    },
    initMap() {
      const map = new BMapGL.Map("container");
      this.locationByLatLng(map);
      this.commonSet(map);
      this.showLoactionControl(map);
      this.observeMapClick(map);
      this.getAddress();
      this.locationByBrowser(map);
      this.locateByOriginBrowser();
      // this.showPanorama()
    },
    locationByLatLng(map) {
      console.log("locationByLatLng", this.lng, this.lat);
      let point = new BMapGL.Point(this.lng, this.lat);
      map.centerAndZoom(point, this.zoomSize);
    },
    commonSet(map) {
      map.enableScrollWheelZoom(true);
      var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
      map.addControl(scaleCtrl);
    },
    showLoactionControl(map) {
      // 创建定位控件
      var locationControl = new BMapGL.LocationControl({
        // 控件的停靠位置（可选，默认左上角）
        anchor: window.BMAP_ANCHOR_TOP_RIGHT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(20, 20)
      });
      // 将控件添加到地图上
      map.addControl(locationControl);

      // 添加定位事件
      locationControl.addEventListener("locationSuccess", function(e) {
        console.log("locationSuccess", e);
        var address = "";
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        console.log("当前定位地址为：" + address);
      });
      locationControl.addEventListener("locationError", function(e) {
        console.log("locationError", e.message);
      });
    },
    showPanorama() {
      var panorama = new BMapGL.Panorama("panorama");
      panorama.setPosition(new BMapGL.Point(this.lng, this.lat));
    },
    observeMapClick(map) {
      const geoc = new BMapGL.Geocoder();
      map.addEventListener("click", e => {
        const pt = e.latlng;
        console.log("pt", pt);
        geoc.getLocation(pt, rs => {
          console.log("rs", rs);
          this.clickedAddr = rs.address;
          const point = new BMapGL.Point(pt.lng, pt.lat);
          const marker = new BMapGL.Marker(point, {
            title: "111"
          });
          map.clearOverlays();
          map.addOverlay(marker);
        });
      });
    },
    getAddress() {
      // 创建地理编码实例
      var myGeo = new BMapGL.Geocoder();
      // 根据坐标得到地址描述
      console.log("用于定位的经纬度", this.lng, this.lat);
      const point = new BMapGL.Point(this.lng, this.lat);
      myGeo.getLocation(point, result => {
        if (result) {
          console.log("定位结果", result);
          this.$emit("getAddr", result.address);
        }
      });
    },
    getAddrByLatLng(lat, lng) {
      var myGeo = new BMapGL.Geocoder();
      const point = new BMapGL.Point(lng, lat);
      myGeo.getLocation(point, result => {
        if (result) {
          console.log("定位结果", result);
          this.$emit("getGpsAddr", result.address);
        }
      });
    },
    locationByBrowser(map) {
      const self = this;
      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
          var mk = new BMapGL.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          console.log("您的位置：" + r.point.lng + "," + r.point.lat);
          const { lat, lng } = r.point;
          self.getAddrByLatLng(lat, lng);
        } else {
          console.log("failed" + this.getStatus());
        }
      });
    },
    locateByOriginBrowser() {
      console.log('原生定位')
      if ("geolocation" in navigator) {
        console.log('原生支持')
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log('原生结果返回', position)
          const { latitude, longitude } = position.coords;
          console.log("原生定位结果", latitude, longitude);
        });
      } else {
        console.log("不支持获取位置");
        /* geolocation IS NOT available */
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.map-wrap {
  margin: 20px;
  position: relative;
}
#container {
  height: 300px;
}
#markResult {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0 7px;
  line-height: 35px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
  border-radius: 7px;
  z-index: 99;
}
</style>


