<template>
    <el-menu default-active="/testManagement" class="el-menu-vertical-demo" router>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>信息管理</template>
<el-menu-item-group>
    <template slot="title">合同管理</template>
    <el-menu-item index="/home/">合同管理</el-menu-item>
    <el-menu-item index="/home/home2">用户分群管理</el-menu-item>
</el-menu-item-group>
<el-menu-item-group title="分组2">
    <el-menu-item index="/home/home3">用户管理</el-menu-item>
</el-menu-item-group>
</el-submenu>
<el-menu-item index="/home/home2"><i class="el-icon-setting"></i>用户管理</el-menu-item>
</el-menu>

</template>