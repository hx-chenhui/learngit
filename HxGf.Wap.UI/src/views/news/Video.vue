<template>
  <div class="videoBox">
    <!-- header -->
    <div class="header" v-if="showHeader">
      <div class="downLoad">
        <i class="el-icon-close" @click="close()"></i>
        <img src="@/assets/images/logo.png" alt>
        <p>打开全球钓鱼APP</p>
        <a href="#/download">立即下载</a>
      </div>
    </div>
    <!-- content -->
    <div class="videoContent">
      <h2 class="videoTop">{{videoInfo.VideoTitle}}</h2>
      <div id="player-con">
        <div class="prism-player" id="J_prismPlayer"></div>
        <!-- <ali-player @play="played" :source="aplayer.source" :autoplay="true" :vid="aplayer.vid" :playauth="aplayer.playauth" ref="player"></ali-player> -->
      </div>
      <!-- <p class="videoText">滴滴又出大事了！网约司机深夜被害，凶手为19岁男孩，官方回应回来了</p> -->
      <p class="watch">{{videoInfo.PlayCount}}观看</p>
      <div class="author">
        <div class="fl">
          <span class="authorHead fl">
            <img :src="userInfo.HeadImg || ''">
          </span>
          <span class="authorName">{{userInfo.NickName}}</span>
        </div>
        <a href="#/download" class="fr gzAuthor">未关注</a>
      </div>
    </div>
  </div>
</template>

<script>
import { setter } from "@/assets/js/setter";

export default {
  data() {
    return {
      videoInfo: {},
      userInfo: {},
      // userFocus: 0,
      // userState:'未关注',
      showHeader: true,
      aplayer: {
        source: "",
        vid: "",
        playauth: ""
      }
    };
  },
  created() {
    this.getVideoInfo();
  },
  mounted() {
    // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
  },
  methods: {
    getVideoInfo() {
      let vm = this;
      let videoId = vm.$route.params.id;
      setter.req({
        url: "video/detail",
        method: "post",
        data: {
          videoId: videoId
        },
        done: function(nres) {
          let ndata = nres.data;
          if (nres.code == 200) {
            vm.videoInfo = ndata.video;
            vm.userInfo = ndata.video.UserInfo;
            vm.aplayer.source = ndata.video.VideoUrl;
            vm.aplayer.vid = ndata.playAuth.VideoId;
            vm.aplayer.playauth = ndata.playAuth.PlayAuth;
            // vm.userFocus = ndata.video.UserInfo.IsFocus;
            let player = new Aliplayer(
              {
                id: "J_prismPlayer",
                width: "100%",
                height: "215px",
                autoplay: false,
                //支持播放地址播放,此播放优先级最高
                source: vm.aplayer.source,
                //播放方式二：点播用户推荐
                vid: vm.aplayer.vid,
                playauth: vm.aplayer.playauth,
                cover: ndata.video.VideoCover
              },
              function(player) {
                console.log("播放器创建好了。");
              }
            );
          }
        }
      });
    },
    close() {
      this.showHeader = false;
    },
    // getFocus () {
    //   var vm = this;
    //   let focusNum = vm.userFocus;
    //   console.log(vm.userFocus)
    //   if(focusNum === 1) {
    //     vm.userState = '已关注';
    //   } else {
    //     vm.userState = '未关注';
    //   }
    // }
  }
};
</script>
<style>
</style>