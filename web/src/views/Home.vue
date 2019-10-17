<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/baoliaozhan.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/douyu.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/qie.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- 轮播图结束 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in list" :key="n.name">
          <i class="sprite sprite-news" :style="{backgroundPosition:n.st}" ></i>
          <div class="py-2">{{n.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 精灵图结束 -->

    <m-list-card icon="menu-1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-3 fs-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{ news.title }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width: 20%;" v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>


    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    date(val){
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      // 导航栏图标
      list:[
        {name:'爆料站',st:'63.546% 15.517%'},
        {name:'故事站',st:'90.483% 15.614%'},
        {name:'周边商城',st:'36.746% 0.924%'},
        {name:'体验服',st:'10.408% 15.517%'},
        {name:'新人社区',st:'89.733% 1.266%'},
        {name:'荣耀·传承',st:'36.467% 15.287%'},
        {name:'同人社区',st:'9.728% 1.266%'},
        {name:'王者营地',st:'63.3% 0.927%'},
        {name:'公众号',st:'0 96.207%'},
        {name:'版本介绍',st:'90.483% 15.614%'},
        {name:'无限王者团',st:'63.3% 0.927%'},
        ],
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        //自动轮播
        autoplay: {
          delay: 3000
        },
        //开启循环模式
        loop: true,
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true
      },
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    // 获取新闻的分类
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
swiper-slide {
  transition: all .4s cubic-bezier(.4, 0, .2, 1);
}
</style>
