/**
* Created by newlmy on 2017/10/18.
*/

<template>
  <div>
    <div style="position: absolute;z-index: 1;left: 5%; top:3%">
      <label for="file_input" class="el-button el-button--primary">
        选择图片
        <input type="file" id="file_input"  @change="uploadImg" style="position:absolute;clip:rect(0 0 0 0);left: -1000px;top:0;"/>
      </label>
      <el-button type="primary" @click="clickEdit">
        {{drawBard.editing ? '结束标记' : '开始标记'}}
      </el-button>
      <el-button type="primary" @click="clearMarks">
        清除全部标记
      </el-button>
      <el-button type="primary" @click="send">
        完成提交
      </el-button>
    </div>
    <div class="draw-container"
         @mousemove="mousemoveTarget"
         @mouseup="mouseupTarget"
    >
      <div class="vue-canvas" ref="canvas">
        <div class="vue-canvas-target"
             :class="{'cropper-move': !drawBard.editing}"
             :style="{
                'width': drawBard.imgBoxW + 'px',
                'height': drawBard.imgBoxH + 'px',
                'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ drawBard.x / scale + 'px,' + drawBard.y / scale + 'px,' + '0)'
                + 'rotateZ('+ rotate * 90 +'deg)'
                }"
             @mousedown="mousedownTarget"
             @mouseout="mouseoutTarget"
        >
          <img
            :src="img"
            ref="targetImg"
          />
          <div
            v-show="this.currentSquare.w>0"
            class="vue-selected-square"
            :style="{
                'width': this.currentSquare.w + 'px',
                'height': this.currentSquare.h + 'px',
                'transform': 'translate3d('+ this.currentSquare.startOffsetX + 'px,' + this.currentSquare.startOffsetY + 'px,' + '0)'
              }"
          >
            <span class="crop-info" v-if="this.currentSquare.w>0">{{ this.currentSquare.w }} × {{ this.currentSquare.h  }}</span>
          </div>
          <div
            class="vue-selected-square"
            v-for="(item, index) in squareness"
            :style="{
                'width': item.w + 'px',
                'height': item.h + 'px',
                'transform': 'translate3d('+ item.startOffsetX + 'px,' + item.startOffsetY + 'px,' + '0)'
              }"
          >
            <span class="crop-info" v-if="item.w > 0">{{ item.w }} × {{ item.h }}</span>
            <span class="del-btn">
            <i class="ali-icon-shanchu" v-if="item.w > 0" @click="clickDel(index)"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  class DrawBard {
    constructor ({width = 0, height = 0, startClientX = 0, startClientY = 0, imgBoxW = 0, imgBoxH = 0, moveX = 0, moveY = 0}) {
      this.w = width
      this.h = height
      this.x = startClientX
      this.y = startClientY
      this.imgBoxW = imgBoxW
      this.imgBoxH = imgBoxH
      this.maxDrawWidth = this.w
      this.maxDrawHeight = this.h
      this.moveX = moveX
      this.moveY = moveY
      this.editing = false
      this.moving = false
    }
    startMove (startX, startY) {
      this.moving = true
      this.moveX = startX - this.x
      this.moveY = startY - this.y
    }
    move (nowX, nowY, vue) {
      this.moving && vue.$nextTick(() => {
        this.x = ~~(nowX - this.moveX)
        this.y = ~~(nowY - this.moveY)
      })
    }
    endMove () {
      this.moving = false
    }
    imgReload ({vue}) {
      vue.$refs.targetImg.onload = () => {
        this.w = ~~(window.getComputedStyle(vue.$refs.canvas).width.replace('px', ''))
        this.h = ~~(window.getComputedStyle(vue.$refs.canvas).height.replace('px', ''))
        this.imgBoxW = vue.$refs.targetImg.width
        this.imgBoxH = vue.$refs.targetImg.height
        this.maxDrawWidth = this.imgBoxW
        this.maxDrawHeight = this.imgBoxH
        this.rotate = 0
      }
    }
  }
  class DrawSquareness {
    constructor ({width = 0, height = 0, startClientX = 0, startClientY = 0, startOffsetX = 0, startOffsetY = 0, info = '', style = {}, className = 'vue-selected-square'}) {
      this.w = width
      this.h = height
      this.startClientX = startClientX
      this.startClientY = startClientY
      this.startOffsetX = startOffsetX
      this.startOffsetY = startOffsetY
      this.defaultOffsetX = 0
      this.defaultOffsetY = 0
      this.drawing = false
      this.isMoveout = false
      this.info = this.w + '*' + this.h
      this.style = ''
      this.className = ''
    }
    startDraw ({startClientX, startClientY, startOffsetX, startOffsetY}) {
      this.drawing = true
      this.startClientX = startClientX
      this.startClientY = startClientY
      this.startOffsetX = startOffsetX
      this.startOffsetY = startOffsetY
      this.defaultOffsetX = this.startOffsetX
      this.defaultOffsetY = this.startOffsetY
    }
    draw ({nowClientX, nowClientY, vue, drawBard}) {
      this.drawing && vue.$nextTick(() => {
        let fw = ~~(nowClientX - this.startClientX)
        let fh = ~~(nowClientY - this.startClientY)
        if (fw > 0) {
          this.w = fw > drawBard.maxDrawWidth - this.defaultOffsetX ? drawBard.maxDrawWidth - this.defaultOffsetX : fw
        } else {
          this.w = Math.abs(fw) > this.defaultOffsetX ? this.defaultOffsetX : Math.abs(fw)
          this.startOffsetX = Math.abs(fw) > this.defaultOffsetX ? 0 : this.defaultOffsetX - Math.abs(fw)
        }
        if (fh > 0) {
          this.h = fh > drawBard.maxDrawHeight - this.defaultOffsetY ? drawBard.maxDrawHeight - this.defaultOffsetY : fh
        } else {
          this.h = Math.abs(fh) > this.defaultOffsetY ? this.defaultOffsetY : Math.abs(fh)
          this.startOffsetY = Math.abs(fh) > this.defaultOffsetY ? 0 : this.defaultOffsetY - Math.abs(fh)
        }
      })
    }
    endDraw () {
      this.drawing = false
    }
  }
  export default {
    name: 'test',
    data () {
      return {
        a: 1,
        b: '',
        rotate: 0,
        scale: 1,
        count: '',
        open: true,
        editing: false,
        img: '',
        squareness: [],
        info: true,
        fixedBox: false,
        drawBard: {},
        currentSquare: {}
      }
    },
    watch: {
      img: function (oldVal, newVal) {
        if (newVal !== oldVal) {
          this.initDrawbard()
        }
      }
    },
    methods: {
      mousedownTarget (e) {
        e.preventDefault()
        let startX = e.clientX
        let startY = e.clientY
        let offsetX = e.offsetX
        let offsetY = e.offsetY
        if (!this.drawBard.editing) {
          this.drawBard.startMove(startX, startY, this)
        } else {
          this.currentSquare = new DrawSquareness({})
          this.currentSquare.startDraw({
            startClientX: startX,
            startClientY: startY,
            startOffsetX: offsetX,
            startOffsetY: offsetY
          })
        }
      },
      mousemoveTarget (e) {
        e.preventDefault()
        let nowX = e.clientX
        let nowY = e.clientY
        if (!this.drawBard.editing) {
          this.drawBard.move(nowX, nowY, this)
        } else {
          this.currentSquare.drawing && this.currentSquare.draw({nowClientX: nowX, nowClientY: nowY, vue: this, drawBard: this.drawBard})
        }
      },
      mouseupTarget (e) {
        if (!this.drawBard.editing) {
          this.drawBard.endMove()
        } else {
          this.currentSquare.drawing && this.currentSquare.endDraw()
          if (this.currentSquare.w > 0 || this.currentSquare.h > 0) {
            this.squareness.push(JSON.parse(JSON.stringify(this.currentSquare)))
            this.currentSquare.w = 0
            this.currentSquare.h = 0
          }
        }
      },
      mouseoutTarget (e) {
        if (!this.drawBard.editing) {
          this.drawBard.endMove()
        } else {
          this.currentSquare.isMoveout && this.currentSquare.drawing && this.currentSquare.endDraw()
        }
      },
      uploadImg (e) {
        this.file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.img = e.target.result
        }
        reader.readAsDataURL(this.file)
        this.open = true
      },
      clickEdit () {
        this.drawBard.editing = !this.drawBard.editing
      },
      clickDel (index) {
        this.squareness.splice(index, 1)
      },
      clearMarks () {
        this.squareness.length && this.squareness.splice(0, this.squareness.length)
      },
      send () {
        if (!this.squareness.length) return false
        let obj = []
        this.squareness.forEach((item) => {
          obj.push({w: item.w, h: item.h, x: item.startOffsetX, y: item.startOffsetY, label: ''})
        })
        this.editing = false
        let formdata = new FormData()
        formdata.append('file', this.file)
        console.log(JSON.stringify(obj))
        formdata.append('marks', JSON.stringify(obj))
        axios.post('http://192.168.10.117:93/app/add_image', formdata).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      },
      initDrawbard () {
        this.drawBard.moving = false
        this.drawBard.editing = false
        this.drawBard.x = 0
        this.drawBard.y = 0
        this.clearMarks()
      }
    },
    mounted () {
      this.b = this.a
      this.drawBard = new DrawBard({})
      this.drawBard.imgReload({vue: this})
    },
    destroyed () {
      this.editing = false
    }
  }
</script>
<style scoped>
  .draw-container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .vue-canvas {
    width: 90%;
    height: 80%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    user-select: none;
    direction: ltr;
    touch-action: none;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }
  .vue-canvas-target img {
    position: relative;
    user-select: none;
    transform: none;
  }
  .cropper-move {
    cursor: move;
  }
  .cropper-crop {
    cursor: crosshair;
  }
  .vue-selected-square {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid red
  }

  .cropper-modal {
    background: rgba(0, 0, 0, 0.5);
  }

  .cropper-crop-box {
    /*border: 2px solid #39f;*/
  }

  .cropper-view-box {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
    user-select: none;
  }

  .cropper-view-box img {
    user-select: none;
  }

  .cropper-face {
    top: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.1;
  }

  .crop-info {
    position: absolute;
    left: 0px;
    top:0px;
    min-width: 65px;
    text-align: center;
    color: white;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
  .del-btn {
    cursor: pointer;
    position: absolute;
    right: -10px;
    top:-10px;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 20px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }

  .crop-line {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .1;
  }

  .line-w {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize;
  }

  .line-a {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize;
  }

  .line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize;
  }

  .line-d {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize;
  }

  .crop-point {
    position: absolute;
    width: 8px;
    height: 8px;
    opacity: .75;
    background-color: #39f;
    border-radius: 100%;
  }

  .point1 {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
  }

  .point2 {
    top: -5px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize;
  }

  .point3 {
    top: -4px;
    right: -4px;
    cursor: ne-resize;
  }

  .point4 {
    top: 50%;
    left: -4px;
    margin-top: -3px;
    cursor: w-resize;
  }

  .point5 {
    top: 50%;
    right: -4px;
    margin-top: -3px;
    cursor: w-resize;
  }

  .point6 {
    bottom: -5px;
    left: -4px;
    cursor: sw-resize;
  }

  .point7 {
    bottom: -5px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize;
  }

  .point8 {
    bottom: -5px;
    right: -4px;
    cursor: nw-resize;
  }

  @media screen and (max-width: 500px) {
    .crop-point {
      position: absolute;
      width: 20px;
      height: 20px;
      opacity: .45;
      background-color: #39f;
      border-radius: 100%;
    }

    .point1 {
      top: -10px;
      left: -10px;
    }

    .point2, .point4, .point5, .point7 {
      display: none;
    }

    .point3 {
      top: -10px;
      right: -10px;
    }

    .point4 {
      top: 0;
      left: 0;
    }

    .point6 {
      bottom: -10px;
      left: -10px;
    }

    .point8 {
      bottom: -10px;
      right: -10px;
    }
  }
</style>
