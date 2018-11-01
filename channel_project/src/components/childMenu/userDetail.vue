<template>
  <div>
    <div class="line-tip">
      <span>用户信息</span>
    </div>
      <!--列表-->
    <div class="list_data">
        <el-table
          :data="userData"
          border
          style="width: 100%">
          <el-table-column
            prop="mobilePhone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="推荐人"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="推荐人手机号"
          >
          </el-table-column>
          <el-table-column
            prop="realverify1"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="regdate1"
            label="注册时间"
          >
          </el-table-column>
          <el-table-column
            prop="addTime1"
            label="绑卡时间"
          >
          </el-table-column>
          <el-table-column
            prop="finvestTime1"
            label="首投时间"
          >
          </el-table-column>
          <el-table-column
            prop="cityname"
            label="归属地"
          >
          </el-table-column>
        </el-table>

      </div>

    <div class="line-tip">
      <span>投资记录</span>
    </div>

    <div class="list_data">
      <el-table
        :data="investData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="investTime1"
          label="投资时间"
        >
        </el-table-column>
        <el-table-column
          prop="fullName"
          label="产品名称"
        >
        </el-table-column>
        <el-table-column
          prop="rate"
          label="产品利率"
        >
        </el-table-column>
        <el-table-column
          prop="activityRate"
          label="活动利率"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="投资金额（元）"
        >
        </el-table-column>
        <el-table-column
          prop="shouldTime1"
          label="回款日期"
        >
        </el-table-column>
      </el-table>

    </div>

    <div class="line-tip">
      <span>邀请好友</span>
    </div>

    <div class="list_data">
      <el-table
        :data="inviteData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="mobilePhone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="regdate1"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column
          prop="addTime1"
          label="绑卡时间"
        >
        </el-table-column>
        <el-table-column
          prop="finvestTime1"
          label="首投时间"
        >
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
  import  {formatDate1,formatDate} from '../../utils/utils.js'
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
        userData:[],
        investData:[],
        inviteData:[],
        uid:"",
        userId:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.uid =  this.$route.params.id;
      this.getUserInfo();
      this.getInvestInfo();
      this.getInviteInfo();
    },
    methods: {
      getQry(){
      },
      //获取用户信息
      getUserInfo(){
        let vm = this;
        this.$http.post('/chan/getUserInfoByUid.do',{
          userId: this.userId,
          uid: this.uid
        }).then(function(res){
          if(res.data.success){
            let userData = res.data.data;
            userData.realverify1 = userData.realverify == 0? '未实名':'已实名';
            userData.regdate1 = formatDate1(userData.regdate);
            userData.addTime1 = formatDate1(userData.addTime);
            userData.finvestTime1 = formatDate1(userData.finvestTime);
            vm.userData.push(userData)
          }
        }).catch(function(err){

        })
      },
      //获取投资信息
      getInvestInfo(){
        let vm = this;
        this.$http.post('/chan/getUserInvestLog.do',{
          userId: this.userId,
          uid: this.uid
        }).then(function(res){
          if(res.data.success){
            let investData = res.data.data;
            for(let i in  investData){
              investData[i].investTime1 = formatDate1(investData[i].investTime);
              investData[i].shouldTime1 = formatDate1(investData[i].shouldTime);
            }
            vm.investData = investData
          }
        }).catch(function(err){

        })
      },
      //获取邀请信息
      getInviteInfo(){
        let vm = this;
        this.$http.post('/chan/getRecommendedFriendsInfo.do',{
          userId: this.userId,
          uid: this.uid
        }).then(function(res){
          if(res.data.success){
            let inviteData = res.data.data;
            for(let i in  inviteData){
              inviteData[i].regdate1 = formatDate1(inviteData[i].regdate);
              inviteData[i].addTime1 = formatDate1(inviteData[i].addTime);
              inviteData[i].finvestTime1 = formatDate1(inviteData[i].finvestTime);
            }
            vm.inviteData = inviteData
          }
        }).catch(function(err){

        })
      },
    }
  }
</script>

<style scoped lang="less">
  .line-tip{
    text-align: left;
    margin: 0.5rem 0 0.5rem;
    font-size: 15px;
    font-weight: bold;
    span{
      color: #909399;
      border-left: 4px solid #909399;
      padding-left: 10px;
    }
    .button{
      display: inline-block;
      margin-left: 1rem;
    }
  }

</style>
