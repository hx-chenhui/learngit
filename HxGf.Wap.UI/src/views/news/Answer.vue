<template>
  <div class="answerBox">
    <!-- header -->
    <div class="header">
      <div class="downLoad">
        <i class="el-icon-close" @click="close()"></i>
        <img src="@/assets/images/logo.png" alt>
        <p>打开全球钓鱼APP</p>
        <a href="#/download">立即下载</a>
      </div>
    </div>

    <!-- answer_content -->
    <div class="answer_contents">
      <div class="longContent">
        <h2>{{quesInfo.QuesTitle}}</h2>
        <a href="javascript:;" class="reply">20个回答 ></a>
        <div class="longList">
          <div class="fl">
            <div class="info fl">
              <img :src="userInfo.HeadImg || ''" alt>
            </div>
            <span class="userName">{{userInfo.NickName}}</span>
          </div>
          <div class="fr">
            <span class="time">{{answerInfo.CreateTime}}</span>
            <span class="comment">{{answerInfo.CommentCount}} 评论</span>
          </div>
        </div>
        <div class="newCoetent">
          <p class="longNews">{{answerInfo.AnswerContent}}</p>

          <!-- <img :src="newsInfo.PicList[0]" alt class="newsImg" v-if="newsInfo.PicList.length == 1"> -->
          <div class="div_imgbox">
            <img :src="item" :class="imgcls" v-for="item in answerInfo.PicUrls" :key="item">
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="readLink">
      <i class="el-icon-star-off fonts"></i>
      <span class="read">{{answerInfo.FavCount}}</span>
      <i class="write"></i>
      <van-icon class-prefix="my-icon" name="extra" class="fonts"/>
      <span class="link">{{answerInfo.LikeCount}}</span>
    </div>
  </div>
</template>
<script>
import { setter } from "@/assets/js/setter";
export default {
  data() {
    return {
      quesInfo: {},
      answerInfo: {},
      userInfo: {},
      showHeader: true
    };
  },
  created() {
    this.getAnswerInfo();
  },
  methods: {
    getAnswerInfo() {
      let vm = this;
      let answerId = this.$route.params.id;
      setter.req({
        url: "answer/detail",
        method: "post",
        data: {
          answerId: answerId
        },
        done: function(nres) {
          let adata = nres.data;
          if (nres.code == 200) {
            vm.quesInfo = adata;
            vm.answerInfo = adata.AnswerEntity;
            vm.userInfo = adata.AnswerEntity.UserInfo;
            let imgLen = adata.AnswerEntity.PicUrls.length || 0;
            if (imgLen === 1) vm.imgcls = "oneimg";
            else if (imgLen === 2 || imgLen === 4) vm.imgcls = "twoimg";
            else vm.imgcls = "threeimg";
          }
        }
      });
    },
    close() {
      this.showHeader = false;
    }
  }
};
</script>



<style>
</style>