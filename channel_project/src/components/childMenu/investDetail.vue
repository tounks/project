<template>
  <div>

    <div class="title">
      <span class="title-span">
        投资总额（<span class="left">邀请</span>/<span class="right">自然</span>）：
        {{totalInvestAmountInvite + totalInvestAmountNature}}
        （<span class="left">{{totalInvestAmountInvite}}</span>/<span class="right">{{totalInvestAmountNature}}</span>）
      </span>
    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        姓名:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="invest.realName" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="invest.mobile" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        推荐人:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="invest.remandName" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        推荐人手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="invest.remandMobile" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        <span class="times">投资时间:&nbsp;&nbsp;</span>
        <el-date-picker
          v-model="invest.investStartTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="endDateOpt"
          value-format="yyyy-MM-dd">
        </el-date-picker>

        <span>--</span>

        <span class="times"></span>
        <el-date-picker
          v-model="invest.investEndTime"
          type="date"
          placeholder="选择日期"
          :picker-options="endDateOpt"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </div>

      <div class="qry_term">
        有无推荐人:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="invest.hasRemand" placeholder="请选择">
            <el-option
              v-for="item in statusArray"
              :key="item.status"
              :label="item.name"
              :value="item.status">
            </el-option>
          </el-select>
        </span>
      </div>


      <div class="qry_term">
        <el-button type="primary" @click="getQry()">查询</el-button>
      </div>

      <div class="qry_term">
        <span style="color: red;cursor: pointer" @click="excel()">导出excel</span>
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
            prop="mobile"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="投资金额"
          >
          </el-table-column>
          <el-table-column
            prop="simplename"
            label="投资产品"
          >
          </el-table-column>
          <el-table-column
            prop="rate"
            label="产品利率"
          >
          </el-table-column>
          <el-table-column
            prop="facttime"
            label="产品期限"
          >
          </el-table-column>
          <el-table-column
            prop="facttime"
            label="回款日期"
          >
          </el-table-column>
          <el-table-column
            prop="remandname"
            label="推荐人"
          >
          </el-table-column>
          <el-table-column
            prop="remandmobile"
            label="推荐人手机号"
          >
          </el-table-column>
          <el-table-column
            prop="investtime"
            label="认证时间"
          >
          </el-table-column>
        </el-table>

      </div>

    </div>

  </div>
</template>

<script>
  import  {formatDate1,formatDate} from '../../utils/utils.js'
  export default {
    data() {
      return {
        invest:{
          realName:"", //用户姓名
          mobile:"", //用户手机号
          remandName:"", //推荐人姓名
          remandMobile:"", //推荐人手机号
          investStartTime:"", //	投资开始时间
          investEndTime:"", //投资结束时间
          hasRemand:"", //有无推荐人
        },
        statusArray:[
          {status: '' ,name: '全部'},
          {status:0 ,name: '否'},
          {status: 1 ,name: '是'},
        ],
        totalInvestAmountNature:0, //	投资总额(自然)
        totalInvestAmountInvite:0, //投资总额(邀请
        tableData: [],
        endDateOpt: {
          disabledDate: (time) => {
            return time.getTime() >= new Date();
          }
        },
        userId:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.getQry();
    },
    methods: {
      //导出
      excel(){
        window.location.href ="/smartmoney-report/chan/dataItem/exportInvestItem.do?realName=" + this.invest.realName + "&mobile=" + this.invest.mobile
          + "&remandName=" +  this.invest.remandName + "&remandMobile=" + this.invest.remandMobile + "&investStartTime="
          + formatDate(this.invest.investStartTime) + "&investEndTime=" + formatDate(this.invest.investEndTime) + "&hasRemand=" + this.invest.hasRemand
          + "&userId=" + this.userId;
      },
      getQry(){
        let vm = this;
        this.$http.post('/chan/dataItem/investItemList.do',{
          userId: this.userId,
          realName:this.invest.realName,
          phone:this.invest.phone,
          remandName:this.invest.remandName,
          remandMobile:this.invest.remandMobile,
          investStartTime:formatDate(this.invest.investStartTime),
          investEndTime: formatDate(this.invest.investEndTime),
          hasRemand:this.invest.hasRemand,
        }).then(function(res){
          let tableData = res.data.data.investList;
          vm.totalInvestAmountNature =  res.data.data.totalInvestAmountNature.toFixed(2);
          vm.totalInvestAmountInvite =  res.data.data.totalInvestAmountInvite.toFixed(2);
          for(let i in tableData){
            tableData[i].index = parseInt(i) + 1;
          }
          vm.tableData = tableData;
        }).catch(function(err){

        })
      },
    }
  }
</script>

<style scoped lang="less">
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

</style>
