<template>
  <div class="downBox">
    <a href="javascript:;" @click="download">去下载</a>
    <img src="@/assets/images/bab.png" class="imgBgc">
    <div class="downText" v-show="ShowDark" @click="downCk">
      <img src="@/assets/images/jiantou.png" class="jiantou">
      <h3>
        点击右上角选择浏览器打开
      </h3>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ShowDark: false
      };
    },
    create() {
      this.downCk();
    },
    methods: {
      download() {
        // let androidApp = 'https://static.quanqiudiaoyu.com/download/quanqiudiaoyu.apk';
        // let iosApp = 'https://itunes.apple.com/app/id1383187741';
        var loadDateTime = new Date();
        // 微信
        let ua = navigator.userAgent.toLowerCase();
        if (isWeixinBrowser()) {
          this.ShowDark = !this.ShowDark;
        }
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          
          //ios
          window.location =  'quanqiudiaoyu://';
          setTimeout(function () {
            let iosTimeOutDateTime = new Date();
            if (iosTimeOutDateTime - loadDateTime < 3000) {
              window.location = 'https://itunes.apple.com/app/id1383187741'; //ios下载地址  
            } else {
              return false;
            }
          }, 500);
        }
        else if (/(Android)/i.test(navigator.userAgent)) {
          //android
          window.location = 'quanqiudiaoyu://';
          setTimeout(function () {
          let androidTimeOutDateTime = new Date();
            if (androidTimeOutDateTime - loadDateTime < 3000) {
              window.location = 'https://static.quanqiudiaoyu.com/download/quanqiudiaoyu.apk'; //ios下载地址  
            } else {
              return false;
            }
          }, 500);
        } else  {
          window.location = 'https://static.quanqiudiaoyu.com/download/quanqiudiaoyu.apk';
        }

        function isWeixinBrowser() {
          return (/micromessenger/.test(ua)) ? true : false;
        }
      },
      downCk() {
        this.ShowDark = !this.ShowDark;
      }
    }
  };
</script>
<style>
</style>