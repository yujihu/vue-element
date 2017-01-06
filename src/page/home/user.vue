<template>
  <div>
      <div class="search">
          <el-input placeholder="请输入内容" v-model="searchTxt" style="width: 300px;">
         <el-button slot="append" icon="search"></el-button>
      </div>
    
    <el-button type="primary" @click="addUserClick" class="add-contract">添加用户</el-button>
    
    <el-table
    :data="tableData"
    stripe
    border
    empty-text="暂无数据"
    @row-click="rowClick"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      inline-template
      :context="_self"
      label="操作"
      width="150">
      <span>
        <el-button @click="handleClick($index)" type="text" size="small">查看</el-button>
        <el-button @click="handleClick2($index)" type="text" size="small">编辑</el-button>
        <el-button @click.native.prevent="deleteRow($index, tableData)" type="text" size="small">删除</el-button>
      </span>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalSize"
      @current-change="changePage">
    </el-pagination>
  </div>
  <el-dialog title="详细信息" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="id" :label-width="formLabelWidth">
      <el-input disabled v-model="form.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="btnSubmit">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
    export default {
        methods: {
            getUsers() {
                this.$http.get("http://localhost:3000/api/user", {
                    emulateJSON: true
                }).then(
                    function(res) {
                        if (res.body !== 0) {
                            // alert(res.body);
                            var response = JSON.parse(res.body);
                            this.allData = response;
                            this.totalSize = this.allData.length;
                            this.totalPage = Math.ceil(this.totalSize / this.pageSize);
                            if (this.totalSize >= this.pageSize) {
                                this.tableData = this.allData.slice(0, this.pageSize);
                            } else {
                                this.tableData = this.allData.slice(0, this.totalSize);
                            }
                        } else {
                            alert('暂无数据');
                        }
                    },
                    function(res) {
                        // 处理失败的结果
                    }
                );
            },
            addUserSubmit() {
                this.$http.post("http://localhost:3000/api/user", this.form, {
                    emulateJSON: true
                }).then(
                    function(res) {
                        if (res.body.id) {
                            this.form = res.body;
                            this.tableData.push(this.form);
                            alert('添加用户成功');
                        } else {
                            alert('添加用户失败');
                        }
                        this.addUser = false;
                    },
                    function(res) {
                        // 处理失败的结果
                        this.addUser = false;
                    }
                );
            },
            updUserSubmit() { //更新用户信息
                this.$http.put("http://localhost:3000/api/user", this.form, {
                    emulateJSON: true
                }).then(
                    function(res) {
                        if (res.body[0] === 1) {
                            Object.assign(this.tableData[this.index], this.form);
                            alert('更新用户成功');
                        } else {
                            alert('更新用户失败');
                        }
                        this.updUser = false;
                        this.dialogFormVisible = false;
                    },
                    function(res) {
                        // 处理失败的结果
                        this.updUser = false;
                    }
                );
            },
            handleClick(index) {
                this.dialogFormVisible = true;
                this.disabled = true;
                this.form = this.tableData[index];
            },
            handleClick2(index) {
                this.dialogFormVisible = true;
                this.disabled = false;
                // this.form = this.tableData[index];
                Object.assign(this.form, this.tableData[index]);
                this.index = index;
                this.updUser = true;
                // console.log(this.index);

            },
            addUserClick() {
                this.form = {};
                this.dialogFormVisible = true;
                this.disabled = false;
                this.addUser = true;
            },
            rowClick(row, event) {
                // console.log(row.id);
            },
            deleteRow(index, rows) {
                this.$http.delete("http://localhost:3000/api/user/" + rows[index].id, this.form, {
                    emulateJSON: true
                }).then(
                    function(res) {
                        if (res.body === 1) {
                            alert('删除用户成功');
                            rows.splice(index, 1);
                        } else {
                            alert('删除用户失败');
                        }
                    },
                    function(res) {
                        // 处理失败的结果
                    }
                );
            },
            btnSubmit() {
                if (!this.disabled) {
                    //Object.assign(this.tableData[this.index], this.form);
                    if (this.addUser) {
                        this.addUserSubmit();
                    }
                    if (this.updUser) {
                        this.updUserSubmit();
                    }
                }
                this.dialogFormVisible = false;
            },
            changePage(currentPage) {
                this.currentPage = currentPage;
                if (this.currentPage === this.totalPage) {
                    this.tableData = this.allData.slice((this.currentPage - 1) * this.pageSize, this.totalSize);
                } else {
                    this.tableData = this.allData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
                }
                // console.log(currentPage);
            }
        },

        data() {
            return {
                allData: [],
                tableData: [],
                form: {},
                addUser: false,
                updUser: false,
                dialogFormVisible: false,
                formLabelWidth: '60px',
                disabled: true,
                searchTxt: '',
                index: -1,
                pageSize: 15,
                totalSize: 0,
                currentPage: 1,
                totalPage: 0
            }
        },
        created() {
            this.getUsers();
        }
    }
</script>
<style lang="scss">
    .search {
        margin-bottom: 10px;
    }
    
    .add-contract {
        position: absolute;
        top: 80px;
        right: 20px;
    }
    
    .block {
        margin-top: 10px;
    }
</style>