<template>
  <div>

    <div class="title">
      <span class="title-span">
        累计提现金额（<span class="left">邀请</span>/<span class="right">自然</span>）：
        {{txAmountInvite + txAmountNatrue}}
        （<span class="left">{{txAmountInvite}}</span>/<span class="right">{{txAmountNatrue}}</span>）
      </span>

      <span class="title-span left1">
         累计手续费（<span class="left">邀请</span>/<span class="right">自然</span>）：
        {{servicechargeInvite + servicechargeNatrue}}
        （<span class="left">{{servicechargeInvite}}</span>/<span class="right">{{servicechargeNatrue}}</span>）
      </span>
    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        姓名:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="withdraw.realName" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="withdraw.realName" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        推荐人:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="withdraw.realName" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        推荐人手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="withdraw.realName" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        <span class="times">提现时间:&nbsp;&nbsp;</span>
        <el-date-picker
          v-model="withdraw.realName"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="endDateOpt"
          value-format="yyyy-MM-dd">
        </el-date-picker>

        <span>--</span>

        <span class="times"></span>
        <el-date-picker
          v-model="withdraw.realName"
          type="date"
          placeholder="选择日期"
          :picker-options="endDateOpt"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </div>

      <div class="qry_term">
        有无推荐人:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="withdraw.realName" placeholder="请选择">
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
        <span style="color: red;cursor: pointer"  @click="excel()">导出excel</span>
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
            label="提现金额"
          >
          </el-table-column>
          <el-table-column
            prop="poundage"
            label="手续费"
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
            prop="addtime"
            label="提现时间"
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
        withdraw:{
          realName:"", //用户姓名
          mobile:"", //用户手机号
          remandName:"", //推荐人姓名
          remandMobile:"", //推荐人手机号
          carryStartTime:"", //提现开始时间
          carryEndTime:"", //提现结束时间
          hasRemand:"", //有无推荐人
        },
        statusArray:[
          {status: '' ,name: '全部'},
          {status:0 ,name: '否'},
          {status: 1 ,name: '是'},
        ],
        txAmountNatrue:0, //累计提现总额(自然)
        txAmountInvite:0, //累计提现总额(邀请)
        servicechargeNatrue:0,//累计提现手续费(自然)
        servicechargeInvite:0,//累计提现手续费(邀请)
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
        window.location.href ="/smartmoney-report/chan/dataItem/exportCarryItem.do?realName=" + this.withdraw.realName + "&mobile=" + this.withdraw.mobile
          + "&remandName=" +  this.withdraw.remandName + "&remandMobile=" + this.withdraw.remandMobile + "&carshStartTime="
          + formatDate(this.withdraw.carryStartTime) + "&carshEndTime=" + formatDate(this.withdraw.carryEndTime) + "&hasRemand=" + this.withdraw.hasRemand
          + "&userId=" + this.userId;
      },
      getQry(){
        let vm = this;
        this.$http.post('/chan/dataItem/carryItemData.do',{
          userId: this.userId,
          realName:this.withdraw.realName,
          phone:this.withdraw.phone,
          remandName:this.withdraw.remandName,
          remandMobile:this.withdraw.remandMobile,
          carryStartTime:formatDate(this.withdraw.carryStartTime),
          carryEndTime: formatDate(this.withdraw.carryEndTime),
          hasRemand:this.withdraw.hasRemand,
        }).then(function(res){
          let tableData = res.data.data.carshItemVoList;
          vm.txAmountNatrue =  res.data.data.txAmountNatrue.toFixed(2);
          vm.txAmountInvite =  res.data.data.txAmountInvite.toFixed(2);
          vm.servicechargeNatrue =  res.data.data.servicechargeNatrue.toFixed(2);
          vm.servicechargeInvite =  res.data.data.servicechargeInvite.toFixed(2);
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
    .title-span.left1{
      margin-left: 100px;
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
