<template>
  <div class="bg-img-num1">
    <el-row>
      <div class="header">
        {{file && file.name}}
      </div>
    </el-row>
    <el-row class="main-container">
      <el-col :span="2" class="tools">
        <el-row class="tool-item">
          打点数：{{targets.points && targets.points.length > 0 ? targets.points.length : 0}}
        </el-row>
        <el-row class="tool-item">
          <label for="file_input" class="el-button el-tooltip item el-button--default">
            选图
            <input type="file" id="file_input"  @change="selectImg" style="position:absolute;clip:rect(0 0 0 0);left: -1000px;top:0;"/>
          </label>
        </el-row>
        <el-row class="tool-item">
          <el-tooltip class="item" effect="dark" content="Shift" placement="right-start">
            <el-button @click="clickEdit">切换</el-button>
          </el-tooltip>
        </el-row>
        <el-row class="tool-item">
          <el-tooltip class="item" effect="dark" content="Ctrl + Z" placement="right-start">
            <el-button @click="retract">返回</el-button>
          </el-tooltip>
        </el-row>
        <el-row class="tool-item">
          <el-tooltip class="item" effect="dark" content="Ctrl + D" placement="right-start">
            <el-button @click="getJSON">导出</el-button>
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="22" class="canvas-c">
        <div class="canvas-container" ref="canvasContainer">
          <div
            class="canvas-actual-layer"
            :class="{'cursor-move': !editing}"
            :style="{
                'width': imgBoxW + 'px',
                'height': imgBoxH + 'px',
                'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x / scale + 'px,' + y / scale + 'px,' + '0)'
                }"
            @mousedown="mousedownTarget"
            @mouseout="mouseoutTarget"
            @mousemove="mousemoveTarget"
            @mouseup="mouseupTarget"
            @mousewheel="scaleImg"
          >
            <div class="canvas-bg-layer">
              <img :src="img" alt="" style="display:block" ref="bgImg">
            </div>
            <canvas id="canvas-layer" class="canvas" :width="imgBoxW" :height="imgBoxH"></canvas>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {formatTime} from 'utils/util'
  import {fileTransformDataURL, isImage, getFile, autoDownload, dataTransformJSONDataURL} from 'utils/file'
  class Point {
    constructor ({ctx, lineWidth = 2, strokeStyle = 'rgba(255, 113, 98, 1)', fillStyle = 'rgba(255, 113, 98, 1)', dotRadius = 2}) {
      this.ctx = ctx
      this.dotRadius = dotRadius
      this.strokeStyle = strokeStyle
      this.lineWidth = lineWidth
      this.fillStyle = fillStyle
      this.x = 0
      this.y = 0
    }
    draw ({x, y}) {
      this.x = x
      this.y = y
      this.ctx.beginPath()
      this.ctx.fillStyle = this.fillStyle
      this.ctx.lineWidth = this.lineWidth
      this.ctx.arc(x, y, this.dotRadius, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }
  class PointGroup {
    constructor () {
      this.points = []
    }
    draw () {
      this.points.forEach((point, index) => {
        point.draw({x: point.x, y: point.y})
      })
    }
    add ({point}) {
      this.points.push(point)
    }
    del () {
      this.points.length > 0 && this.points.pop()
    }
  }
  export default {
    name: 'polygon',
    data: () => {
      return {
        dotRadius: '',
        canvasContainerW: '',
        canvasContainerH: '',
        imgBoxW: 0,
        imgBoxH: 0,
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        moveX: 0,
        moveY: 0,
        targets: '',
        currentTarget: '',
        canvas: '',
        ctx: '',
        moving: false,
        scale: 1,
        editing: false,
        img: '',
        file: ''
      }
    },
    components: {},
    beforeCreate () {
    },
    created () {},
    beforeMount () {},
    mounted () {
      let _this = this
      _this.dotRadius = _this.$route.query.dotRadius ? _this.$route.query.dotRadius : 2
      _this.$nextTick(() => {
        _this.canvasContainerW = ~~(window.getComputedStyle(_this.$refs.canvasContainer).width.replace('px', ''))
        _this.canvasContainerH = ~~(window.getComputedStyle(_this.$refs.canvasContainer).height.replace('px', ''))
        _this.getCanvas()
      })
      _this.$refs.bgImg.onload = () => {
        _this.imgBoxW = _this.$refs.bgImg.width
        _this.imgBoxH = _this.$refs.bgImg.height
        if (_this.imgBoxW > _this.canvasContainerW) _this.scale = _this.canvasContainerW / _this.imgBoxW
        if (_this.imgBoxH * _this.scale > _this.canvasContainerH) _this.scale = _this.canvasContainerH / _this.imgBoxH
        _this.x = (_this.canvasContainerW - _this.imgBoxW) / 2
        _this.y = (_this.canvasContainerH - _this.imgBoxH) / 2
      }
      document.onkeydown = function (e) {
        e.preventDefault()
        if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 68) _this.getJSON()
        if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 90) _this.retract()
        if (e && e.key === 'Shift' || e.keyCode === 16) _this.clickEdit()
      }
      _this.targets = new PointGroup()
    },
    beforeUpdate () {},
    updated () {},
    beforeDestroy () {},
    destroyed () {},
    methods: {
      selectImg (e) {
        this.initCanvas()
        this.previewImg(e)
      },
      initCanvas () {
        this.ctx && this.clearRect()
        this.targets = new PointGroup()
        this.currentTarget = ''
        this.scale = 1
      },
      previewImg (e) {
        this.file = getFile({e})
        if (!this.file && !isImage(this.file.ext)) {
          this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示')
          return false
        }
        this.img = fileTransformDataURL(this.file.file)
      },
      getCanvas () {
        this.canvas = document.getElementById('canvas-layer')
        this.ctx = this.canvas.getContext('2d')
      },
      clickEdit () {
        this.editing = !this.editing
      },
      getJSON () {
        let points = []
        this.targets.points.forEach((point, index) => {
          points.push({x: point.x, y: point.y})
        })
        if (points.length < 0 || !this.file) {
          this.$alert('暂无标注数据，请先标注', '提示')
          return false
        }
        let dataURL = dataTransformJSONDataURL(points)
        let filename = '' + this.file.name + '_' + formatTime().format('yyyyMMdd') + '.json'
        autoDownload({dataURL, filename})
      },
      createPoint ({offsetX, offsetY}) {
        this.currentTarget = new Point({ctx: this.ctx, dotRadius: this.dotRadius})
        this.currentTarget.draw({x: offsetX, y: offsetY})
      },
      retract () {
        if (this.editing && this.currentTarget) {
          this.clearRect()
          this.targets.del()
          this.targets.draw()
        }
      },
      clearRect () {
        this.ctx.clearRect(0, 0, this.imgBoxW, this.imgBoxH)
      },
      mousedownTarget (e) {
        e.preventDefault()
        let offsetX = e.offsetX
        let offsetY = e.offsetY
        if (!this.editing) {
          let startX = e.clientX
          let startY = e.clientY
          this.startMove(startX, startY)
        } else {
          this.createPoint({offsetX, offsetY})
          this.targets.add({point: this.currentTarget})
        }
      },
      mouseoutTarget (e) {
        if (!this.editing) this.endMove()
      },
      mousemoveTarget (e) {
        e.preventDefault()
        let nowX = e.clientX
        let nowY = e.clientY
        this.move(nowX, nowY, this)
      },
      mouseupTarget (e) {
        this.endMove()
      },
      scaleImg (e) {
        let change = e.deltaY || e.wheelDelta
        this.changeSize({change})
      },
      changeSize ({change}) {
        let coe = 0.2
        coe = coe / this.imgBoxW > coe / this.imgBoxH ? coe / this.imgBoxH : coe / this.imgBoxW
        let num = coe * change
        num < 0 ? this.scale += Math.abs(num) : this.scale > Math.abs(num) ? this.scale -= Math.abs(num) : this.scale
      },
      startMove (startX, startY) {
        this.moving = true
        this.moveX = startX - this.x
        this.moveY = startY - this.y
      },
      move (nowX, nowY, vue) {
        this.moving && vue.$nextTick(() => {
          this.x = ~~(nowX - this.moveX)
          this.y = ~~(nowY - this.moveY)
        })
      },
      endMove () {
        this.moving = false
      }
    }
  }
</script>
<style scoped>
  .header {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
  }
  .main-container {
    width: 100%;
    height: calc(100% - 50px);
  }

  .tools {
    padding: 0 10px;
    height: 100%;
  }
  .tool-item {
    height: 40px;
  }
  .canvas-c {
    height: 100%;
    position: relative;
  }
  .bg-img-num1 {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: rgba(255,255,255,0.65);
    background-color: #24292e;
    background-image: url(../../assets/images/star-bg.svg),linear-gradient(#191c20, #24292e 15%);
    background-repeat: repeat-x;
    background-position: center 0, 0 0, 0 0;
  }
  .canvas-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }
  .canvas-actual-layer {
    position: relative;
  }
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .cursor-move {
    cursor: move;
  }
  .img-draw {
    cursor: crosshair;
  }
  #ui-layer {
    z-index: 3;
  }
</style>
