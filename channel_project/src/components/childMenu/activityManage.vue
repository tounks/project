<template>
  <div>
    <div style="text-align: left;">
      <div class="button">
        <el-button type="danger" round >新增活动</el-button>
      </div>
    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        活动名称:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="input" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        负责人手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="input" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        <el-button type="primary" @click="getQry">查询</el-button>
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
            prop="mobile_phone"
            label="活动名称"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="活动编号"
          >
          </el-table-column>
          <el-table-column
            prop="certificate_type"
            label="负责人手机号"
          >
          </el-table-column>
          <el-table-column
            prop="certificate_type"
            label="活动链接"
          >
          </el-table-column>
          <el-table-column
            prop="reg_date"
            label="二维码"
          >
          </el-table-column>

          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <!--<el-button @click="applyLoan(scope.row)" type="text" size="small">申请借款</el-button>-->
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
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
  .button{
    display: inline-block;
    margin-left: 0rem;
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

</style>
