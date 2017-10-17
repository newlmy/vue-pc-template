/**
* Created by newlmy on 2017/9/20.
*/

<template>
  <div class="notice-layout">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in list" :key="index" :span="4">
        <div class="notice-item">
          <router-link :to="item.to">
            <div class="notice-item-icon">
              <i :class="item.icon"></i>
              <span class="notice-item-bubble" v-if="!!item.num">{{item.num}}</span>
            </div>
            <div class="notice-item-text">
              <p>{{item.title}}</p>
            </div>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        list: [
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-huifang',
            to: '/demo/form',
            num: 12,
            title: '回访记录'
          },
          {
            icon: 'ali-icon-genjinguanli1',
            to: '/demo/form',
            num: 2,
            title: '跟进记录'
          },
          {
            icon: 'ali-icon-ziliao',
            to: '/demo/form',
            num: 123,
            title: '资料跟进'
          },
          {
            icon: 'ali-icon-ziliao',
            to: '/demo/form',
            title: '资料跟进'
          }
        ]
      }
    }
  }

</script>
<style scoped>
  .notice-item {
    background-color: #F5F5F6;
    padding: 10px;
    margin-bottom: 10px;
  }
  .notice-item-icon {
    display: flex;
    justify-content: center;
    position: relative;

  }

  .notice-item-icon i {
    font-size: 60px;
    color: #444;
  }
  .notice-item-text {
    text-align: center;
  }
  .notice-item-bubble {
    background-color: red;
    height: 24px;
    padding: 0 5px;
    border-radius: 24px;
    line-height: 24px;
    color: #fff;
    position: absolute;
    left: 60%;
    top: -5px;

  }
</style>
