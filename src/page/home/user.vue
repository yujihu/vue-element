<template>
  <div>
      <div class="search">
          <el-input placeholder="请输入内容" v-model="searchTxt" style="width: 300px;">
          <el-button slot="append" icon="search" @click="search"></el-button>
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
  <el-dialog title="详细信息" :show-close="false" v-model="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="userForm">
    <el-form-item label="id" :label-width="formLabelWidth">
      <el-input disabled v-model="form.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
      <el-input :disabled="disabled" v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input :disabled="disabled" v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit">取 消</el-button>
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
                            this.$message.error('暂无数据');
                        }
                    },
                    function(res) {
                        // 处理失败的结果
                        this.$message.error('获取数据失败');
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
                            this.$message({
                                type: 'success',
                                message: '添加用户成功!'
                            });
                        } else {
                            this.$message.error('添加用户失败');
                        }
                        // this.addUser = false;
                        // this.form = {};
                    },
                    function(res) {
                        // 处理失败的结果
                        this.$message.error('添加用户失败');
                        // this.addUser = false;
                        // this.form = {};
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
                            this.$message({
                                type: 'success',
                                message: '更新用户成功!'
                            });
                        } else {
                            this.$message.error('更新用户失败');
                        }
                        // this.updUser = false;
                        // this.form = {};
                        // this.dialogFormVisible = false;
                    },
                    function(res) {
                        // 处理失败的结果
                        this.$message.error('更新用户失败');
                        // this.updUser = false;
                        // this.form = {};
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
                this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete("http://localhost:3000/api/user/" + rows[index].id, this.form, {
                        emulateJSON: true
                    }).then(
                        function(res) {
                            if (res.body === 1) {
                                rows.splice(index, 1);
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message.error('删除失败');
                            }
                        },
                        function(res) {
                            // 处理失败的结果
                            this.$message.error('删除失败');
                        }
                    );
                });
            },
            btnSubmit() {
                if (!this.disabled) {
                    //Object.assign(this.tableData[this.index], this.form);
                    this.$refs.userForm.validate((valid) => {
                        if (valid) {
                            if (this.addUser) {
                                this.addUserSubmit();
                            } else if (this.updUser) {
                                this.updUserSubmit();
                            } else {
                                this.form = {};
                            }
                        } else {
                            return false;
                        }

                    });
                    // this.dialogFormVisible = false;
                }
            },
            cancelSubmit() {
                this.dialogFormVisible = false;
                this.form = {};
                if (this.updUser) {
                    this.updUser = false;
                }
                if (this.addUser) {
                    this.addUser = false;
                }
            },
            changePage(currentPage) {
                this.currentPage = currentPage;
                if (this.currentPage === this.totalPage) {
                    this.tableData = this.allData.slice((this.currentPage - 1) * this.pageSize, this.totalSize);
                } else {
                    this.tableData = this.allData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
                }
                // console.log(currentPage);
            },
            search() {
                if (this.searchTxt) {
                    this.$http.get("http://localhost:3000/api/user/" + this.searchTxt, {
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
                                this.$message.error('暂无数据');
                            }
                        },
                        function(res) {
                            // 处理失败的结果
                            this.$message.error('搜索失败');
                        }
                    );
                } else {
                    this.getUsers();
                }
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
                formLabelWidth: '80px',
                disabled: true,
                searchTxt: '',
                index: -1,
                pageSize: 15,
                totalSize: 0,
                currentPage: 1,
                totalPage: 0,
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
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