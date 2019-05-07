<template>
  <div class="newsBox" ref="homePage">
    <!-- header -->
    <div class="header" v-if="showHeader && !showContent">
      <div class="downLoad">
        <i class="el-icon-close" @click="close()"></i>
        <img src="@/assets/images/logo.png" alt>
        <p>打开全球钓鱼APP</p>
        <a href="#/download">立即下载</a>
      </div>
    </div>

    <!-- content -->
    <div class="contents">
      <!-- 长图文 -->
      <div class="longContent" v-show="newsInfo.NewsType==2">
        <h2 v-if="showContent === false">{{newsInfo.NewsTitle}}</h2>
        <div class="longList" v-if="showContent === false">
          <div class="fl">
            <div class="info fl">
              <img :src="userInfo.HeadImg || ''" alt>
            </div>
            <span class="userName">{{userInfo.NickName}}</span>
          </div>
          <div class="fr">
            <span class="time">{{newsInfo.PubTimeStr}}</span>
            <span class="comment">{{newsInfo.CommentCount}}评论</span>
          </div>
        </div>
        <div class="longNews" v-html="newsInfo.NewsContent" id="div_longNews"></div>
      </div>
      <!-- 短图文 -->
      <div class="shortContent" v-show="newsInfo.NewsType==1">
        <div class="longList" v-if="showContent === false">
          <div class="fl">
            <div class="info fl">
              <img :src="userInfo.HeadImg || ''" alt>
            </div>
            <span class="userName">{{userInfo.NickName}}</span>
          </div>
          <div class="fr">
            <span class="time">{{newsInfo.PubTimeStr}}</span>
            <span class="comment">{{newsInfo.CommentCount}}评论</span>
          </div>
        </div>
        <div class="newCoetent">
          <p class="longNews">{{newsInfo.NewsContent}}</p>

          <!-- <img :src="newsInfo.PicList[0]" alt class="newsImg" v-if="newsInfo.PicList.length == 1"> -->
          <div class="div_imgbox">
            <img
              :src="item"
              :class="imgcls"
              v-for="(item, index) in newsInfo.PicList"
              :key="item"
              @click="getImg(index)"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="readLink" v-if="showContent==false">
      <i class="el-icon-view fonts"></i>
      <span class="read">{{newsInfo.BrowseCount}}</span>
      <i class="write"></i>
      <van-icon class-prefix="my-icon" name="extra" class="fonts"/>
      <span class="link">{{newsInfo.LikeCount}}</span>
    </div>
  </div>
</template>
<script>
import { setter } from "@/assets/js/setter";
import { ImagePreview } from "vant";
import Vue from "vue";
export default {
  data() {
    return {
      newsInfo: {},
      userInfo: {},
      imgcls: "oneimg",
      showHeader: true,
      showContent: false,
      clientHeight: ""
    };
  },
  created() {
    let vm = this;
    let source = parseInt(vm.$route.params.source || 0);
    vm.showContent = source === 4 || source === 8;
    this.getnewsInfo();
  },
  mounted() {
    // 将backToday方法绑定到window下面，提供给外部调用
    (window["getClientHeight"] = () => {
      return this.clientHeight;
    }),
      (this.clientHeight = `${document.documentElement.clientHeight}`);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  methods: {
    getnewsInfo() {
      let vm = this;
      let newsId = vm.$route.params.id;
      let newsCache = JSON.parse(localStorage.getItem(`${setter.cacheName}_${newsId}`)) || {};
      let isNull = true;
      for (var key in newsCache) {
        isNull = false;
      }
      if (isNull) {
        setter.req({
          url: "news/detail",
          method: "post",
          data: {
            newsId: newsId
          },
          done: function(nres) {
            let ndata = nres.data;
            if (nres.code == 200) {
              vm.newsInfo = ndata;
              console.log( vm.newsInfo);
              localStorage.setItem(`${setter.cacheName}_${newsId}`, JSON.stringify(ndata));

              let imgLen = ndata.PicList.length || 0;
              if (imgLen === 1) vm.imgcls = "oneimg";
              else if (imgLen === 2 || imgLen === 4) vm.imgcls = "twoimg";
              else vm.imgcls = "threeimg";
              vm.userInfo = ndata.UserInfo;
              Vue.nextTick().then(function() {
                var imgs = document
                  .getElementById("div_longNews")
                  .getElementsByTagName("img");
                for (let index = 0; index < imgs.length; index++) {
                  const element = imgs[index];
                  element.addEventListener("click", () => {
                    vm.getImg(index);
                  });
                }
              });
            }
          }
        });
      } else {
        vm.newsInfo = newsCache;
        let imgLen = newsCache.PicList.length || 0;
        if (imgLen === 1) vm.imgcls = "oneimg";
        else if (imgLen === 2 || imgLen === 4) vm.imgcls = "twoimg";
        else vm.imgcls = "threeimg";
        vm.userInfo = newsCache.UserInfo;
        Vue.nextTick().then(function() {
          var imgs = document
            .getElementById("div_longNews")
            .getElementsByTagName("img");
          for (let index = 0; index < imgs.length; index++) {
            const element = imgs[index];
            element.addEventListener("click", () => {
              vm.getImg(index);
            });
          }
        });
      }
    },
    changeFixed(clientHeight) {
      this.$refs.homePage.style.height = clientHeight + "px";
    },
    close() {
      this.showHeader = false;
    },
    getImg(index) {
      let images = this.newsInfo.PicList || [];
      ImagePreview({
        images: images,
        showIndex: false,
        loop: true,
        startPosition: index
      });
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      return this.changeFixed(this.clientHeight);
      alert(this.clientHeight);
    }
  }
};
</script>


<style>
  
</style> 