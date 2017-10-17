/**
* Created by newlmy on 2017/9/29.
*/

<template>
  <div class="content">
    <div class="eg-block">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="eg-item">
            <div class="block-title">雷达</div>
            <div class="block-content">
              <div class="point-area">
                <div class="dot"></div>
                <div class="point circle"></div>
                <div class="point circle1"></div>
                <div class="point circle2"></div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="eg-item">
            <div class="block-title">加载中</div>
            <div class="block-content">
              <div data-loader="ball-fade"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cool',
    data () {
      return {
      }
    }
  }

</script>

<style scoped>
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #2d3237;
  }
  .eg-block {
    padding: 20px;
    color: #fff;
  }
  .eg-item {
    border: 1px solid rgba(240,240,240,.5);
    box-shadow: 0 0 1px 1px rgba(240,240,240,.5);
    border-radius: 3px;
    padding: 5px;
  }
  .block-title {
    text-align: center;
    line-height: 36px;
  }
  .block-content {
    min-height: 100px;
  }
  .point-area {
    position: relative;
    min-height: 100px;
    transition: opacity .5s ease-out;
  }
  .dot {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #6ad7e9;
    border: 1px solid rgba(0, 205, 236, .37)
  }
  .point {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .circle:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 2px solid #00cdec;
    opacity: 0;
    animation: ripple 4s ease-out  0ms infinite
  }
  .circle1:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 2px solid #00cdec;
    opacity: 0;
    animation: ripple 4s ease-out 450ms infinite
  }
  .circle2:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 2px solid #00cdec;
    opacity: 0;
    animation: ripple 4s ease-out 900ms infinite;
  }
  @keyframes ripple {
    0% {
      opacity: 0;
      transform: scale(.1);
    }
    50% {
      opacity: 1;

    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }


  [data-loader=ball-fade] {
    position: relative;
    left: 20px;
    width: 10px;
    height: 10px;
    background-color: hsla(0, 0%, 100%, 0);

  }
  @keyframes ball-fade {
    0% {
      background-color: #fff
    }
    to {
      background-color: hsla(0, 0%, 100%, 0)
    }
  }

</style>
