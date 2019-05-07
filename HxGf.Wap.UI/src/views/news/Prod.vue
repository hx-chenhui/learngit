<template>
  <div class="prodBox">
    <!-- header -->
    <div class="header" v-if="showHeader">
      <div class="downLoad">
        <i class="el-icon-close" @click="close"></i>
        <img src="@/assets/images/logo.png" alt>
        <p>打开全球钓鱼APP</p>
        <a href="#/download">立即下载</a>
      </div>
    </div>
    <!-- content -->
    <div class="shopContent clearfix">
      <div class="shopNav clearfix">
        <i class="el-icon-arrow-left"></i>
        <div class="navIfon">
          <a href="#/download" class="active">商品</a>
          <a href="#/download">评价</a>
          <a href="#/download">详情</a>
        </div>
        <i class="el-icon-more"></i>
      </div>
      <!-- 轮播 -->
      <div class="carousel clearfix">
        <van-swipe @change="onChange" class="carImg">
          <van-swipe-item v-for="item in prodInfo.PicUrls" :key="item">
            <img :src="item" alt>
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{prodInfo.PicCount}}</div>
        </van-swipe>
      </div>
      <div class="shopMessage clearfix">
        <div class="shopCost">
          <span class="cost">
            ￥
            <span class="mony">{{prodInfo.SalePriceBefore}}</span>
            .{{prodInfo.SalePriceAfter}}
          </span>
          <van-icon name="like-o" class="shopCost_sc fr"/>
        </div>
        <div class="shopBrief">
          <p>{{prodInfo.SkuName}}</p>
        </div>
        <div class="outPrit">
          <p>
            <span class="first_sp">已售</span>
            <span>{{prodInfo.SaleUnit}}{{prodInfo.StrSaleUnit}}</span>
            <span class="fr">{{prodInfo.PlaceDelivery}}</span>
          </p>
        </div>
        <div class="xuanzhe">
          <p>
            <span class="first_sp">选择</span>
            <span class="colour">{{prodInfo.Color}}</span>
            <span>{{prodInfo.Spec}}</span>
            <i class="el-icon-arrow-right fr arrow_right"></i>
          </p>
        </div>
        <div>
          <p>
            <span class="first_sp">服务</span>
            <span>{{prodInfo.NoReasonReturn}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="container clearfix">
      <p class="evaluate">
        商品评价
        <span>({{total.Total}})</span>
        <a href="#/download" class="fr" style="display:none">
          查看全部
          <i class="el-icon-arrow-right"></i>
        </a>
      </p>
      <div v-for="item in comments" :key="item.ComSysNo">
        <div class="userBox">
          <div class="container_user">
            <img :src="item.UserInfo.HeadImg">
            <span>{{item.UserInfo.NickName}}</span>
          </div>
          <div class="container_conten div_imgbox">
            <p>{{item.Content}}</p>
            <img :src="img" v-for="img in item.Pics" :key="img" :class="item.imgCls">
          </div>
        </div>
        <hr class="container_writ">
      </div>
    </div>
    <div class="shopName">
      <div class="fl shopImg">
        <img :src="prodInfo.ShopLogo">
      </div>
      <div class="fl shopSgin">
        <p>
          {{prodInfo.ShopName}}
          <br>
          <span class="experience">
            综合体验
            <van-goods-action-mini-btn icon="star" v-for="item in total.PraiseCount " :key="item"/>
            <van-goods-action-mini-btn
              icon="star-o"
              v-for="item in 5-total.PraiseCount "
              :key="item"
            />
          </span>
        </p>
      </div>
      <a href="#/download" class="fr allBaby">全部宝贝</a>
    </div>
    <div v-html="prodInfo.ProductDetail"></div>
    <!-- 底部 -->
    <van-goods-action class="prod_footer">
      <van-goods-action-mini-btn icon="star-o" text="收藏" @click="onClickMiniBtn()"/>
      <van-goods-action-mini-btn icon="cart-o" text="购物车" @click="onClickMiniBtn()"/>
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn"/>
      <van-goods-action-big-btn primary text="立即购买" @click="onClickBigBtn"/>
    </van-goods-action>
  </div>
</template>
<script>
import { setter } from "@/assets/js/setter";
export default {
  data() {
    return {
      current: 0,
      prodInfo: {},
      total: {},
      showHeader: true,
      comments: [],
      userInfo: {}
    };
  },
  created() {
    this.getprodInfo();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onClickMiniBtn() {
      window.location = "#/download";
    },
    onClickBigBtn() {
      window.location = "#/download";
    },
    getprodInfo() {
      let vm = this;
      let skuId = vm.$route.params.id;
      setter.req({
        url: "prod/detail",
        method: "post",
        data: {
          SkuId: skuId
        },
        done: function(nres) {
          let pdata = nres.data;
          if (nres.code == 200) {
            vm.prodInfo = pdata.product;
            vm.prodInfo.PicCount = vm.prodInfo.PicUrls.length || 0;
            let salePriceArry = vm.prodInfo.StrSalePrice.split(".");
            vm.prodInfo.SalePriceBefore = salePriceArry[0];
            vm.prodInfo.SalePriceAfter = salePriceArry[1];
            let comments = pdata.comments;
            for (let item of comments) {
              let imgLen = item.Pics.length || 0;
              if (imgLen === 1) item.imgCls = "oneimg";
              else if (imgLen === 2 || imgLen === 4) item.imgCls = "twoimg";
              else item.imgCls = "threeimg";
            }
            vm.comments = comments;
            vm.total = pdata.total;
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

