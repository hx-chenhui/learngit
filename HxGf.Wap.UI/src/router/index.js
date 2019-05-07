import Vue from 'vue'
import Router from 'vue-router'
import News from '@/views/news/News.vue'
import Download from '@/views/news/Download.vue'
import Prod from '@/views/news/Prod.vue'
import Video from '@/views/news/Video.vue'
import Agreements from '@/views/news/Agreements.vue'
import Answer from '@/views/news/Answer.vue'
import Notice from '@/views/news/Notice.vue'
Vue.use(Router)
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/News'
    // },
    {
      path: '/News/:id/:source',
      component: News
    },
    {
      path: '/Download',
      component: Download
    },
    {
      path: '/Prod/:id',
      component: Prod
    },
    {
      path: '/Video/:id',
      component: Video
    },
    {
      path: '/Agreements',
      component: Agreements
    },
    {
      path: '/Answer/:id',
      component: Answer
    },
    {
      path: '/Notice/:id',
      component: Notice
    }
  ]
})
