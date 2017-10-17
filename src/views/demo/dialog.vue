/**
* Created by newlmy on 2017/8/29.
*/
<template>
  <div>
    <el-button @click="open('type1')">点我演示</el-button>
    <product-dialog :dialog="dialogs.type1" @cancel="cencelFn" @confirm="confirmFn">
      <div slot="dialogContent">
        <p>在这里可以自定义弹出层内容</p>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <el-button type="text" @click="open('type2')">第二个弹出层</el-button>
      </div>
    </product-dialog>
    <product-dialog :dialog="dialogs.type2" @cancel="cencelFn" @confirm="confirmFn">
      <div slot="dialogContent">
        <p>在这里可以自定义弹出层内容</p>
      </div>
    </product-dialog>
  </div>
</template>

<script>
  import Dialog from 'components/Dialog'
  export default {
    name: '',
    data () {
      return {
        dialogs: {
          type1: {
            key: 'type1',
            title: '第一个弹出框',
            show: false,
            isFooter: true,
            modal: false,
            size: 'small'
          },
          type2: {
            key: 'type2',
            title: '第二个弹出框',
            show: false,
            isFooter: true,
            modal: false,
            size: 'tiny'
          }
        }
      }
    },
    computed: {
    },
    methods: {
      open (key) {
        let _this = this
        _this.dialogs[key].show = true
      },
      full (key) {
        let _this = this
        _this.dialogs[key].size = 'full'
      },
      cencelFn (diagol) {
        let _this = this
        _this.dialogs[diagol.key].show = diagol.show
        _this.dialogs[diagol.key].size = diagol.size
        console.log('点击弹出层取消按钮要干什么可以在这里写')
      },
      confirmFn (diagol) {
        let _this = this
        _this.dialogs[diagol.key].size = diagol.size

        console.log('点击弹出层确认按钮要干什么可以在这里写')
      }
    },
    components: {
      productDialog: Dialog
    }
  }
</script>

<style scoped>

</style>
