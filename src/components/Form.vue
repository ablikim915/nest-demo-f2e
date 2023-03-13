<template>
  <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
      <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div style="display: flex;">
        <el-input v-model.number="ruleForm.code"></el-input>
        <img :src="codeImg" @click="resetCode"/>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    name: 'FormComp',
    data() {
      return {
        ruleForm: {
          name: '',
          password: '',
          code: ''
        },
        codeImg: '/api/user/code',
      }
    },
    created() {
    },
    methods: {
      submitForm() {
        fetch('/api/user/create', {
          method: 'post',
          body: JSON.stringify(this.ruleForm),
          headers: {
            'content-type': 'application/json'
          }
        }).then(res => res.json()).then(res => {
          console.log(res);
        })
      },
      resetCode() {
        this.codeImg = this.codeImg + '?' + Math.random()
      }
    }
}
</script>

<style>

</style>