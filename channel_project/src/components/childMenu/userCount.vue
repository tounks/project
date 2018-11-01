<template>
  <div>

    <div class="title">
      <span class="title-span">
        注册人数（<span class="left">邀请</span>/<span class="right">自然</span>）：
        {{countRegisterUserInvite+countRegisterUserNature}}
        （<span class="left">{{countRegisterUserInvite}}</span>/<span class="right">{{countRegisterUserNature}}</span>）
      </span>

      <span class="title-span left1">
         投资用户（<span class="left">邀请</span>/<span class="right">自然</span>）：
        {{countInvestUserNature + countInvestUserInvite}}
        （<span class="left">{{countInvestUserInvite}}</span>/<span class="right">{{countInvestUserNature}}</span>）
      </span>

      <span class="title-span left1">
         复投用户（<span class="left">邀请</span>/<span class="right">自然</span>）：
         {{countTredeliveryUserInvite + countTredeliveryUserNature}}
        （<span class="left">{{countTredeliveryUserInvite}}</span>/<span class="right">{{countTredeliveryUserNature}}</span>）
      </span>

    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        姓名:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="user.name" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="user.phone" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        推荐人:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="user.referrer" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        推荐人手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="user.referrerPhone" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        <span class="times">注册时间:&nbsp;&nbsp;</span>
        <el-date-picker
          v-model="user.registerStartTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="endDateOpt"
          value-format="yyyy-MM-dd">
        </el-date-picker>

        <span>--</span>

        <span class="times"></span>
        <el-date-picker
          v-model="user.registerEndTime"
          type="date"
          placeholder="选择日期"
          :picker-options="endDateOpt"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </div>

      <div class="qry_term">
        有无推荐人:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="user.isReferrer" placeholder="请选择">
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
        是否投资过:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="user.isInvest" placeholder="请选择">
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
        是否绑卡:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="user.isBind" placeholder="请选择">
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
        是否实名:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="user.isRealverify" placeholder="请选择">
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
            prop="status1"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="realverify1"
            label="实名"
          >
          </el-table-column>
          <el-table-column
            prop="regdate"
            label="注册时间"
          >
          </el-table-column>
          <el-table-column
            prop="tdate"
            label="认证时间"
          >
          </el-table-column>
          <el-table-column
            prop="investtime"
            label="首投时间"
          >
          </el-table-column>
          <el-table-column
            prop="cityname"
            label="归属地"
          >
          </el-table-column>
          <el-table-column
            label="详情"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toDetail(scope.row.code)">详情</el-button>

            </template>
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
        user:{
          name:"", //	用户姓名
          phone:"", //用户手机号
          referrer:"", //推荐人姓名
          referrerPhone:"", //	推荐人手机号
          registerStartTime:"", //注册开始时间
          registerEndTime:"", //注册结束时间
          isReferrer:"", //有无推荐人
          isInvest:"", //是否投资;
          isBind:"", //是否绑卡
          isRealverify:"", //	是否实名
        },
        countRegisterUserNature: 0, //注册人数(自然)
        countRegisterUserInvite: 0, //	注册人数(邀请)
        countInvestUserNature: 0, //投资用户(自然)
        countInvestUserInvite: 0, //投资用户(邀请)
        countTredeliveryUserNature: 0, //复投用户(自然)
        countTredeliveryUserInvite: 0, //复投用户(邀请)
        statusArray:[
          {status: '' ,name: '全部'},
          {status:0 ,name: '否'},
          {status: 1 ,name: '是'},
        ],
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
        window.location.href ="/smartmoney-report/chan/dataItem/exportDataItem.do?name=" + this.user.name + "&phone=" + this.user.phone + "&referrer=" + this.user.referrer
          + "&referrerPhone=" +  this.user.referrerPhone + "&registerStartTime=" + formatDate(this.user.registerStartTime) + "&registerEndTime="
          + formatDate(this.user.registerEndTime)+ "&isReferrer=" + this.user.isReferrer + "&isInvest=" + this.user.isInvest + "&isBind="
          + this.user.isBind + "&isRealverify=" + this.user.isRealverify + "&userId=" + this.userId;
      },
      //查询
      getQry(){
        let vm = this;
        this.$http.post('/chan/dataItem/dataItemList.do',{
          userId: this.userId,
          name:this.user.name,
          phone:this.user.phone,
          referrer:this.user.referrer,
          referrerPhone:this.user.referrerPhone,
          registerStartTime:formatDate(this.user.registerStartTime),
          registerEndTime: formatDate(this.user.registerEndTime),
          isReferrer:this.user.isReferrer,
          isInvest:this.user.isInvest,
          isBind:this.user.isBind,
          isRealverify:this.user.isRealverify,
        }).then(function(res){
          let tableData = res.data.data.platDataItemVoList;
           vm.countRegisterUserNature =  res.data.data.countRegisterUserNature.toFixed(2);
           vm.countRegisterUserInvite =  res.data.data.countRegisterUserInvite.toFixed(2);
           vm.countInvestUserNature =  res.data.data.countInvestUserNature.toFixed(2);
           vm.countInvestUserInvite =  res.data.data.countInvestUserInvite.toFixed(2);
           vm.countTredeliveryUserNature =  res.data.data.countTredeliveryUserNature.toFixed(2);
           vm.countTredeliveryUserInvite =  res.data.data.countTredeliveryUserInvite.toFixed(2);
           for(let i in tableData){
             tableData[i].index = parseInt(i) + 1;
             if(tableData[i].status == 0){
               tableData[i].status1 ="未绑卡";
             }else if(tableData[i].status == 1){
               tableData[i].status1 ="已绑卡";
             }else if(tableData[i].status == 2){
               tableData[i].status1 ="解绑";
             }
             if(tableData[i].realverify == 0){
               tableData[i].realverify1 ="未实名";
             }else if(tableData[i].realverify == 1){
               tableData[i].realverify1 ="已实名";
             }
           }
           vm.tableData = tableData;
        }).catch(function(err){

        })
      },
      toDetail(code){
        this.$router.push('/mainMenu/userDetail/'+ code.uid)
      }
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
