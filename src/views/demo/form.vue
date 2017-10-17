/**
* Created by newlmy on 2017/8/29.
*/
<template>
  <div>
    <demo-form :form-data="formData" :rules="rules" :title="formTitle" @submitForm="send"></demo-form>
  </div>
</template>
<script>
  import form from 'components/Form'
  export default {
    name: '',
    data () {
      return {
        formTitle: '表单标题',
        formData: [
          {
            label: 'input',
            type: 'input',
            value: '',
            key: 'name',
            placeholder: '请输入姓名',
            required: true
          },
          {
            label: '日期',
            type: 'date',
            value: new Date('2017-09-13'),
            key: 'testDate',
            placeholder: '请选择日期',
            required: true

          },
          {
            label: '时间',
            type: 'fixed-time',
            value: '',
            key: 'testTime',
            placeholder: '请选择时间',
            required: true

          },
          {
            label: 'select',
            type: 'select',
            value: '',
            key: 'testSelect',
            placeholder: '选择地区',
            required: true,
            options: [
              {
                value: '1',
                label: '广州'
              },
              {
                value: '2',
                label: '深圳'
              }
            ]
          },
          {
            label: '开关',
            type: 'switch',
            value: '',
            key: 'testSwitch',
            required: true

          },
          {
            label: '多选',
            type: 'checkbox',
            value: [],
            key: 'checkbox',
            required: true,
            checkboxs: [
              {
                label: '选项一',
                value: 1
              },
              {
                label: '选项二',
                value: 2
              },
              {
                disabled: true,
                label: '选项三',
                value: 3
              }
            ]
          },
          {
            label: '单选',
            type: 'radio',
            value: '',
            key: 'testRadio',
            required: true,
            radios: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              },
              {
                disabled: true,
                label: '选项三',
                value: '3'
              }
            ]
          },
          {
            label: 'textarea',
            type: 'textarea',
            value: '',
            key: 'testTextarea',
            required: true,
            placeholder: '请输入备注内容'
          },
          {
            type: 'button',
            text: '提交'
          }
        ],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          testDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          testTime: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          testSelect: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          checkbox: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          testRadio: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          testTextarea: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
    },
    methods: {
      send (result) {
        console.log(result)
      }
    },
    components: {
      demoForm: form
    }
  }
</script>

<style scoped>

</style>
