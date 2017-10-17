/**
* Created by newlmy on 2017/6/16.
*/
<template>
  <div>
    <product-list :table-data="table.data" :table-title="table.title" :table-operate="table.operate" @deleteRow="deleteEvent" @lookMore="lookEvent" @clickRow="clickRowEvent"></product-list>
    <product-pagination :page-size="pagination.pageSize" :total-num="pagination.totalNum" :current="pagination.current" @handleSizeChange="sizeChange" @handleCurrentChange="currentChange"></product-pagination>
  </div>
</template>

<script>
  import List from 'components/List'
  import Pagination from 'components/Pagination'
  import {fetch} from 'utils/fetch'
  export default {
    name: '',
    components: {
      productList: List,
      productPagination: Pagination
    },
    data () {
      return {
        filterConfig: {
          select: {
            show: true,
            require: true,
            msg: '值不能为空',
            ops: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭北京烤鸭北京烤鸭北京烤鸭北京烤鸭'
            }]
          },
          date: {
            show: true,
            require: true,
            msg: '值不能为空',
            lable: '开始-结束：',
            format: 'yyyy-MM-dd',
            placeholder: '请选择'
          },
          search: {
            show: true,
            require: true,
            msg: '值不能为空',
            placeholder: '请输入搜索内容'
          },
          btn: {
            text: '搜索'
          }
        },
        table: {
          title: [
            {
              prop: 'id',
              label: 'ID',
              width: '50'
            },
            {
              prop: 'date',
              label: '日期',
              width: '180',
              click: true
            },
            {
              prop: 'name',
              label: '姓名',
              width: '180'
            },
            {
              prop: 'address',
              label: '地址',
              width: '',
              click: true

            }
          ],
          data: [
            {
              id: 1,
              date: '2017-08-21',
              name: '**002',
              address: '广州市天河区**基地1'
            },
            {
              id: 2,
              date: '2017-08-23',
              name: '**001',
              address: '广州市天河区**基地2'
            },

            {
              id: 3,
              date: '2017-08-24',
              name: '**001',
              address: '广州市天河区**基地3'
            },

            {
              id: 4,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            },

            {
              id: 5,
              date: '2017-08-20',
              name: '**001',
              address: '广州市天河区**基地'
            }
          ],
          operate: {
            width: 180,
            del: {
              show: true,
              text: '移除'
            },
            look: {
              show: true,
              text: '查看更多'
            }
          }
        },
        pagination: {
          pageSize: 100,
          totalNum: 501,
          current: 1
        }
      }
    },
    mounted () {
      console.log(fetch)
      setTimeout(() => {
        console.log(fetch)
      }, 1000)
    },
    computed: {
    },
    methods: {
      deleteEvent (index) {
        this.table.data.splice(index, 1)
        console.log('点击删除数据的时候要干什么就写在这里，是数据的下标')
      },
      lookEvent (index) {
        console.log('点击查看更多的时候要干什么就写在这里，是数据的下标')
      },
      clickRowEvent ({index, row}) {
        if (index === 1) {
          alert(row.date)
        } else if (index === 3) {
          alert(row.address)
        }
      },
      search (obj) {
        console.log(obj)
      },
      sizeChange (pageSize) {
        console.log('pageSize 改变时要干什么就写在这里')
      },
      currentChange (current) {
        console.log('current 改变时要干什么就写在这里')
      }
    }
  }
</script>

<style>
</style>
