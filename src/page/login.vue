<template>
<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="ruleForm2.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
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
                    pass: '',
                    username: '',
                    userid: ''
                },
                rules2: {
                    pass: [{
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
                        this.$store.commit('setUser', this.ruleForm2);
                        this.$router.replace({
                            path: 'home/'
                        });
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