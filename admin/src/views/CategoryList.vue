<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <!-- 最后不要写成输入框的形式来选择父级，这样子会形成数据冗余 -->
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
       <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
              <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        items: []
      }
    },
    methods: {
      async fetch(){
        const res = await this.$http.get('rest/categories')
        this.items = res.data;
      },
      async remove(row){
        this.$confirm(`是否确定要删除分类 "${row.name}"`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
                .then(async () => {
                  const res = await this.$http.delete(`rest/categories/${row._id}`)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  // 删除成功之后，需要重新获取数据
                  this.fetch()
                })
      }
    },
    created(){
      // 创建完成列表之后要自动执行
      this.fetch()
    }
  }
</script>

<style>
</style>
