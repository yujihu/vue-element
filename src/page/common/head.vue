<template>
<div class="header-wraper">
    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">

        <li class="title">
            <i class="el-icon-menu"></i>
            <span>合同管理系统</span>
        </li>
        <span class="username">欢迎您！ {{username}}</span>
    </el-menu>
</div>
</template>


<script>
    export default {
        data() {
            return {
                username: '',
            }
        },
        methods: {

        },
        created() {
            this.username = this.$store.state.user.username;
        }
    }
</script>


<style lang="scss">
    .header-wraper li {
        float: left;
        margin-right: 20px;
        margin-top: 5px;
    }
    
    .title {
        font-size: 1.5em;
        padding: 1em .2em;
    }
    
    .title span {
        margin-left: 5px;
    }
    
    .username {
        position: absolute;
        top: 25px;
        right: 100px;
        font-size: 1em;
        color: #ffffff;
    }
</style>