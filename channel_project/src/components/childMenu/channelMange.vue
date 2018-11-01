<template>
  <div class="total-channel">

    <div style="text-align: left;">
      <div class="button">
        <el-button type="danger" round @click="showDialog=true">添加渠道</el-button>
      </div>

      <div style="display: inline-block;float: right;">
        <div class="button">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="button">
          <el-button type="primary">查询</el-button>
        </div>
      </div>

    </div>
      <!--列表-->
    <div class="list_data">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="渠道名称"
          >
          </el-table-column>
          <el-table-column
            prop="mobile_phone"
            label="渠道码"
          >
          </el-table-column>

          <el-table-column
            prop="certificate_type"
            label="渠道账号"
          >
          </el-table-column>
          <el-table-column
            prop="reg_date"
            label="联系人手机号"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">重置密码</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    <div class="channel">
      <img src="../../image/channel.png"/>
    </div>


      <!--添加按钮输入弹框-->
      <div v-show="showDialog">
        <div class="hide-dialog"></div>
        <div class="input-form">
          <div class="close-button">
            <!--<i></i>-->
          </div>
          <!--<div class="input-name">-->
          <!--<span class="input-head">用户名：</span>-->
          <!--<div class="prizes-name1">-->
          <!--<el-input-->
          <!--placeholder="请输入中奖人姓名"-->
          <!--v-model="input"-->
          <!--&gt;-->
          <!--</el-input>-->
          <!--</div>-->
          <!--</div>-->
          <div class="input-name">
            <span class="input-head">渠道名称：</span>
            <div class="prizes-name1">
              <el-input
                placeholder="请输入渠道名称"
                v-model="input"
              >
              </el-input>
            </div>
          </div>

          <div class="input-name">
            <span class="input-head">渠道码：</span>
            <div class="prizes-name1">
              <el-input
                placeholder="请输入渠道码"
                v-model="input" :maxlength="11"
              >
              </el-input>
            </div>
          </div>

          <div class="input-name">
            <span class="input-head">渠道账号：</span>
            <div class="prizes-name1">
              <el-input
                placeholder="请输入渠道账号"
                v-model="input"
                :maxlength="18"
              >
              </el-input>
            </div>
          </div>

          <div class="input-name">
            <span class="input-head">联系人手机号：</span>
            <div class="prizes-name1">
              <el-input
                placeholder="请输入联系人手机号"
                v-model="input"
                :maxlength="18"
              >
              </el-input>
            </div>
          </div>

          <div class="error-tip"><span>{{errorTip}}</span></div>
          <div class="sure-button">
            <span class="save" style="margin-right: 20px;"><el-button type="primary">添加</el-button></span>
            <span class="save"><el-button type="info" @click="showDialog=false">取消</el-button></span>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        showDialog:false,
        input:"",
        applyStartTime:"", //最近一个月
        applyEndTime: "",   //结束时间
        tableData: [],
        option:[],
        endDateOpt: {
          disabledDate: (time) => {
            return time.getTime() >= new Date();
          }
        },
        errorTip:"",
        system_id:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-loan");
//      this.system_id = JSON.parse(user).userKy;
      //this.getLoanInfo();
    },
    methods: {
      getQry(){

      }
    }
  }
</script>

<style scoped lang="less">
  .total-channel{
    width: 60%;
  }
  .button{
    display: inline-block;
    margin-left: 0rem;
  }
  .title{
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-color: #f8f8f8;
    text-align: left;
    font-size: 14px;
    .title-span{
      margin-left: 20px;
      .left{
        color: red;
      }
      .right{
        color: #00B83F;
      }
    }
  }
  .qry_term{
    display: inline-block;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    .qry_span{
      width:5rem;
      display:inline-block;
    }
  }
  .list_data{
    margin-top: 1rem;
  }
  .channel{
    text-align: left;
    margin-top: 2rem;
    img{
      width: 100%;
    }
  }

</style>
