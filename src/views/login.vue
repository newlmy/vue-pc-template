/**
* Created by newlmy on 2017/9/19.
*/

<template>
  <div class="content">
    <div class="com-body el-menu--dark">
      <div class="com-bd-bg">
        <div class="com-bd-img"></div>
        <div class="com-bd-title">列队欢迎</div>
        <div class="com-bd-form">
          <login-form :title="title" :form-data="formData" :label-position ='labelPosition' :rules="rules" @submitForm="submitForm"></login-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Form from 'components/Form'
  export default {
    name: 'login',
    components: {
      loginForm: Form
    },
    data () {
      return {
        labelPosition: 'top',
        title: '',
        formData: [
          {
            label: '账号',
            type: 'input',
            value: '',
            key: 'account',
            placeholder: '请输入账号',
            required: true
          },
          {
            label: '密码',
            type: 'password',
            value: '',
            key: 'password',
            placeholder: '请输入密码',
            required: true
          },
          {
            type: 'remark',
            value: '',
            key: 'remark',
            required: true,
            list: [
              {
                type: 'link',
                text: '忘记密码',
                to: '/index'
              },
              {
                type: 'checkbox',
                value: [],
                key: 'remarkPassword',
                required: true,
                checkboxs: [
                  {
                    label: '记住密码',
                    value: 0
                  }
                ]
              }
            ]
          },
          {
            type: 'button',
            text: '确定',
            size: 'large',
            isBlock: true
          }
        ],
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        form: {}
      }
    },
    methods: {
      submitForm (form) {
        console.log(form)
      }
    }
  }

</script>
<style>
  .el-form-item.is-required .el-form-item__label:before{
    content: '';
  }

</style>

<style scoped>
  .com-body {
    padding: 100px 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  }
  .com-bd-bg {
    width: 300px;
    margin: 0 auto;
  }
  .com-bd-img {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border-radius: 80px;
    border: 2px solid #fff;
    background: url(http://img2.3png.com/d2a58e207d6d30faaae173732a1e3fb598ad.png),rgb(50, 65, 87);
    background-size: cover;
  }
  .com-bd-title {
    color: #fff;
    font-size: 18px;
    line-height: 46px;
    text-align: center;
  }
  .com-bd-form{
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
</style>
