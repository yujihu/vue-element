<template>
  <div>
      <div class="search">
          <el-input placeholder="请输入内容" v-model="searchTxt" style="width: 300px;">
         <el-button slot="append" icon="search"></el-button>
      </div>
    
    <el-button type="primary" @click="handleClick3" class="add-contract">添加合同</el-button>
    <el-table
    :data="tableData"
    stripe
    border
    empty-text="暂无数据"
    @row-click="rowClick"
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      inline-template
      :context="_self"
      fixed="right"
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
      <el-input :disabled="disabled" v-model="form.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="日期" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.date" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="省份" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.province" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="市区" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.city" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.address" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮编" :label-width="formLabelWidth">
      <el-input :disabled="disabled" v-model="form.zip" auto-complete="off"></el-input>
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
                // console.log(this.index);

            },
            handleClick3() {
                this.form = {};
                this.dialogFormVisible = true;
                this.disabled = false;
            },
            rowClick(row, event) {
                // console.log(row.id);
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            btnSubmit() {
                if (!this.disabled) {
                    Object.assign(this.tableData[this.index], this.form);
                    alert("修改完成");
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
            this.allData = [{
                date: '2016-05-03',
                id: '1',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                id: '2',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                id: '3',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '4',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '5',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '6',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '7',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '8',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '9',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '10',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '11',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '12',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '13',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '14',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '15',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '16',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                id: '17',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }];
            this.totalSize = this.allData.length;
            this.totalPage = Math.ceil(this.totalSize / this.pageSize);
            if (this.totalSize >= this.pageSize) {
                this.tableData = this.allData.slice(0, this.pageSize);
            } else {
                this.tableData = this.allData.slice(0, this.totalSize);
            }

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