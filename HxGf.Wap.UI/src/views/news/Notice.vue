<template>
  <div class="msgBox">
    <!-- content -->
    <div class="msgContents">
      <!-- 长图文 -->
      <div>
        <h2 class="msgTitle">{{msgInfo.MsgTitle}}</h2>

        <div class="msgHead">
          <span class="time">{{msgInfo.StrCreateTime}}</span>
        </div>

        <div v-html="msgInfo.MsgContent"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { setter } from "@/assets/js/setter";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      msgInfo: {},
      showHeader: true
    };
  },
  created() {
    this.getMsgInfo();
  },
  methods: {
    getMsgInfo() {
      let vm = this;
      let msgId = vm.$route.params.id;
      setter.req({
        url: "message/detail",
        method: "post",
        data: {
          SysNo: msgId
        },
        done: function(nres) {
          let ndata = nres.data;
          if (nres.code == 200) {
            vm.msgInfo = ndata;
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