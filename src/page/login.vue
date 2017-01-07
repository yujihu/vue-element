<template>
<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm2.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="handleSubmit2">提交</el-button>
        <el-button @click="handleReset2">重置</el-button>
    </el-form-item>
</el-form>
</template>
<script>
    export default {
        data() {
            var checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    password: '',
                    username: '',
                    userid: ''
                },
                rules2: {
                    password: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    username: [{
                        validator: checkUsername,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$http.post("http://localhost:3000/api/login", this.ruleForm2, {
                            emulateJSON: true
                        }).then(
                            function(res) {
                                if (res.body !== 0) {
                                    // alert(res.body);
                                    var response = res.body;
                                    this.ruleForm2.userid = '' + response.id;
                                    this.$store.commit('setUser', this.ruleForm2);
                                    this.$router.replace({
                                        path: 'home/'
                                    });
                                } else {
                                    this.$message.error('用户名或密码错误，请重新输入！');
                                }
                            },
                            function(res) {
                                // 处理失败的结果
                                this.$message.error('登录失败！');
                            }
                        );
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
    .demo-ruleForm {
        margin-top: 300px;
        margin-left: 30vw;
        width: 30vw;
    }
</style>