<template>
  <div>
    <div class="line-tip">
      <span>团队详情</span>
    </div>

    <div class="team-title">
      <span>团队名称: {{team.teamName}}</span>
      <span>团队负责人：{{team.leaderName}}</span>
      <span>团队级别：{{team.teamLevel}}</span>
      <span>团队总人数：{{team.count}}</span>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px">
      <el-table-column
        prop="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        label="团队名称"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        label="团队级别"
        prop="level"
      >
      </el-table-column>
      <el-table-column
        label="负责人"
        prop="real_name"
      >
      </el-table-column>
      <el-table-column
        label="负责区域"
        prop="area_name"
      >
      </el-table-column>
      <el-table-column
        label="团队人数（全职/兼职）"
      >
        <template slot-scope="scope">
          <span>{{scope.row.count}}</span>
          (<span>{{scope.row.fullcount}}</span>/<span>{{scope.row.partcount}}</span>)
        </template>
      </el-table-column>
      <el-table-column
        label="团队成员"
        prop="members"
      >
      </el-table-column>
    </el-table>

    <div class="line-tip">
      <span>用户数据</span>
    </div>

    <div>
      <ul class="user-data">
        <li>总注册用户数量</li>
        <li>总实名认证数量</li>
        <li>总投资用户数量</li>
        <li>总复投用户数量</li>
        <li>累计投资金额</li>
        <li>在投总金额</li>
        <li>累计充值金额</li>
        <li>累计提现金额</li>
      </ul>
      <ul class="user-data">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul class="user-data">
        <li>邀请注册用户数量</li>
        <li>邀请用户实名认证数量</li>
        <li>邀请用户投资数量</li>
        <li>邀请用户复投数量</li>
        <li>邀请用户累计投资金额</li>
        <li>邀请用户在投总金额</li>
        <li>邀请用户累计充值金额</li>
        <li>邀请用户累计提现金额</li>
      </ul>
      <ul class="user-data">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul class="user-data">
        <li>自然注册用户数量</li>
        <li>自然用户实名认证数量</li>
        <li>自然用户投资数量</li>
        <li>自然用户复投数量</li>
        <li>自然用户累计投资金额</li>
        <li>自然用户在投总金额</li>
        <li>自然用户累计充值金额</li>
        <li>自然用户累计提现金额</li>
      </ul>
      <ul class="user-data">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="clear-float"></div>
    </div>

    <div class="line-tip">
      <span>团队详情</span>
    </div>

    <div class="user-detail">
      <ul>
        <li style="width: 10%"></li>
        <li>总注册用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>总实名认证数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>总投资用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>总复投用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>累计投资金额（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>在投总金额（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>累计充值金额（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
        <li>累计提现金额（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
      </ul>
      <ul>
        <li style="width: 10%">聪明科技</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
      </ul>
      <ul>
        <li style="width: 10%">聪明科技</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
        <li>1000（<span class="left">200</span>/<span  class="right">800</span>）</li>
      </ul>
    </div>


  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        tableData:[],
        teamCode:"",
        team:{
          teamName:"",
          teamLevel: 1, //团队级别
          count:0,  //团队人员数量
          leaderName:"", //负责人姓名
        },
        userId:"" ,//系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.teamCode =  this.$route.params.code;
      this.getTeamInfo();
      this.getTeamCount();

    },
    methods:{
      //获取团队信息
      getTeamInfo(){
        let vm = this;
        this.$http.post('/chan/getChanTeamInfo.do',{
          userId: this.userId,
          teamName:this.teamName,
          realName:this.realName,
          level: this.teamLevel,
          teamCode: this.teamCode,
        }).then(function(res){
          let tableData = res.data.data;
          for(let i in tableData){
            tableData[i].index = parseInt(i) + 1;
          }
          vm.tableData = tableData;
        }).catch(function(err){

        })
      },
      //获取团队的统计数据
      getTeamCount(){
        let vm = this;
        this.$http.post('/chan/getChanTeamInfoByTeamCode.do',{
          userId: this.userId,
          teamCode:this.teamCode,
        }).then(function(res){
           vm.team = res.data.data;
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
  .team-title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: left;
    margin-bottom: 18px;
    span{
      display: inline-block;
      margin-right: 130px;
    }
  }
  .user-data{
    list-style: none;
    float: left;
    display: inline-block;
    font-size: 13px;
    li{
      display: block;
      width: 160px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ebeef5;
      margin-bottom: -1px;
      margin-right: -1px;
    }
  }
  .clear-float{
    clear: both;
  }
  .user-detail{
    overflow-x: scroll;
    margin-bottom: 4rem;
    ul{
      list-style: none;
      display: flex;
      width: 1692px;
      font-size: 13px;
      li{
        display: inline-block;
        width: 160px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #ebeef5;
        margin-bottom: -1px;
        margin-right: -1px;
        width: 11.5%;
        .left{
          color: red;
        }
        .right{
          color: #00B83F;
        }
      }
    }
  }

</style>
