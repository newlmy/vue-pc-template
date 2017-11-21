<template>
  <div>
    <div style="position: absolute; z-index: 99">
      <label for="file_input" class="el-button el-button--primary">
        选择图片
        <input type="file" id="file_input"  @change="uploadImg" style="position:absolute;clip:rect(0 0 0 0);left: -1000px;top:0;"/>
      </label>
      <el-button type="primary">
        打点数：{{currentPolygon && currentPolygon.dots.length > 0 ? currentPolygon.dots.length : 0}}
      </el-button>
      <span>
        shift：切换拖拉/绘图；
        command/ctrl+space: 闭合多边形，填充颜色；
        command/ctrl+z：返回；
        command/ctrl+d: 导出图片；
      </span>
    </div>
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
  </div>
</template>
<script>
  import {formatTime} from 'utils/util'
  class Polygon {
    constructor ({ctx, strokeStyle = 'red', fillStyle = 'rgba(135, 210, 3, .8)', dotRadius = 1}) {
      this.ctx = ctx
      this.dotRadius = dotRadius
      this.strokeStyle = strokeStyle
      this.fillStyle = fillStyle
      this.dots = []
      this.finish = false
      this.startX = ''
      this.startY = ''
    }
    startDraw ({x, y}) {
      this.startX = x
      this.startY = y
      this.ctx.beginPath()
      this.ctx.fillStyle = this.fillStyle
      this.ctx.strokeStyle = this.strokeStyle
      this.ctx.arc(x, y, this.dotRadius, 0, Math.PI * 2)
      this.ctx.fill()
    }
    draw ({x, y}) {
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.dots.push({x, y})
    }
    endDraw () {
      this.draw({x: this.startX, y: this.startY})
      this.finish = true
      this.ctx.fill()
    }
    reDraw () {
      this.startDraw({x: this.dots[0].x, y: this.dots[0].y})
      for (let i = 1; i < this.dots.length; i++) {
        this.ctx.lineTo(this.dots[i].x, this.dots[i].y)
        this.ctx.stroke()
      }
      if (this.finish) this.endDraw()
    }
    save () {
      this.ctx.save()
    }
  }
  export default {
    name: 'polygon',
    data: () => {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        canvasContainerW: '',
        canvasContainerH: '',
        imgBoxW: '',
        imgBoxH: '',
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        moveX: 0,
        moveY: 0,
        polygons: [],
        currentPolygon: '',
        canvas: '',
        ctx: '',
        moving: false,
        scale: 1,
        editing: false,
        retractCount: 0,
        img: '',
        imgName: '',
        imgType: ''
      }
    },
    components: {},
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {
      let _this = this
      this.imgReload(_this.getCanvas)
      document.onkeydown = function (e) {
        console.log(e)
        e.preventDefault()
        if (e && (e.ctrlKey || e.metaKey) && (e.keyCode === 32 || e.keyCode === 8) && _this.editing && _this.currentPolygon) {
          _this.finishPolygon()
        }
        if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 68) {
          _this.getCanvasImg()
        }
        if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 90 && _this.editing && _this.currentPolygon) {
          _this.retract()
        }
        if (e && e.key === 'Shift' || e.keyCode === 16) {
          _this.clickEdit()
        }
      }
    },
    beforeUpdate () {},
    updated () {},
    beforeDestroy () {},
    destroyed () {},
    methods: {
      uploadImg (e) {
        this.file = e.target.files[0]
        this.imgType = this.file.type
        this.imgName = this.file.name
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.img = e.target.result
          this.ctx && this.clearRect()
          this.polygons = []
          this.currentPolygon = ''
          this.scale = 1
        }
        reader.readAsDataURL(this.file)
      },
      clickEdit () {
        this.editing = !this.editing
      },
      getCanvasImg () {
        let type = 'jpeg'
        let imgdata = this.canvas.toDataURL('image/png')
        let fixtype = function (type) {
          type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg')
          let r = type.match(/png|jpeg|bmp|gif/)[0]
          return 'image/' + r
        }
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
        let savaFile = function (data, filename) {
          let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
          saveLink.href = data
          saveLink.download = filename
          let event = document.createEvent('MouseEvents')
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
          saveLink.dispatchEvent(event)
        }
        let filename = '' + this.imgName.substring(0, this.imgName.lastIndexOf('.')) + '.' + formatTime().format('yyyyMMdd') + '.' + type
        savaFile(imgdata, filename)
      },
      getCanvas () {
        this.$nextTick(() => {
          this.canvas = document.getElementById('canvas-layer')
          this.ctx = this.canvas.getContext('2d')
        })
      },
      createPolygon ({offsetX, offsetY}) {
        this.currentPolygon = new Polygon({ctx: this.ctx})
        this.currentPolygon.save()
        this.currentPolygon.startDraw({x: offsetX, y: offsetY})
        this.currentPolygon.draw({x: offsetX, y: offsetY})
      },
      finishPolygon () {
        this.currentPolygon.endDraw()
        this.polygons.push(this.currentPolygon)
        this.currentPolygon = ''
      },
      retract () {
        this.clearRect()
        for (let i = 0; i < this.polygons.length; i++) {
          this.polygons[i].reDraw()
        }
        this.currentPolygon.dots.pop()
        if (this.currentPolygon.dots.length > 0) this.currentPolygon.reDraw()
        else this.currentPolygon = ''
      },
      clearRect () {
        this.ctx.clearRect(0, 0, this.imgBoxW, this.imgBoxH)
      },
      imgReload (callback) {
        let _this = this
        this.$refs.bgImg.onload = () => {
          this.x = 0
          this.y = 0
          _this.$nextTick(function () {
            _this.canvasContainerW = ~~(window.getComputedStyle(_this.$refs.canvasContainer).width.replace('px', ''))
            _this.canvasContainerH = ~~(window.getComputedStyle(_this.$refs.canvasContainer).height.replace('px', ''))
            _this.imgBoxW = _this.$refs.bgImg.width
            _this.imgBoxH = _this.$refs.bgImg.height
            if (_this.imgBoxW > _this.canvasContainerW) {
              _this.scale = _this.canvasContainerW / _this.imgBoxW
            }
            if (_this.imgBoxH * _this.scale > _this.canvasContainerH) {
              _this.scale = _this.canvasContainerH / _this.imgBoxH
            }
            _this.x = -(_this.imgBoxW - _this.imgBoxW * _this.scale) / 2 + (_this.canvasContainerW - _this.imgBoxW * _this.scale) / 2
            _this.y = -(_this.imgBoxH - _this.imgBoxH * _this.scale) / 2 + (_this.canvasContainerH - _this.imgBoxH * _this.scale) / 2
            callback && callback()
          })
        }
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
          if (this.currentPolygon) {
            this.currentPolygon.draw({x: offsetX, y: offsetY})
          } else {
            this.createPolygon({offsetX, offsetY})
          }
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
  .canvas-container {
    color: red;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 90%;
    width: 90%;
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
