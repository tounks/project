<template>
  <div>
    <div class="line-tip">
      <span>用户分析</span>
    </div>

    <div class="count-list">
      <span class="table" :class="userType == 1?'active':''" @click="userType = 0">注册用户分析</span>
      <span class="table" :class="userType == 2?'active':''" @click="userType = 1">实名认证用户分析</span>
      <span class="table" :class="userType == 3?'active':''" @click="userType = 2">投资用户分析</span>
      <span class="table" :class="userType == 4?'active':''" @click="userType = 3">首投用户分析</span>
      <span class="table" :class="userType == 5?'active':''" @click="userType = 4">定期投资人数</span>
    </div>

    <div class="count-list">
      <span class="table1" :class="monthType == 0?'active':''" @click="monthType = 0">当月排行版</span>
      <span class="table1" :class="monthType == 1?'active':''" @click="monthType = 1">上月排行榜</span>
    </div>

    <div id="chart" class="chart"></div>

    <div class="line-tip">
      <span>资金分析</span>
    </div>

    <div class="count-list">
      <span class="table" :class="moneyType == 0?'active':''" @click="moneyType = 0">累计充值金额</span>
      <span class="table" :class="moneyType == 1?'active':''" @click="moneyType = 1">累计提现金额</span>
      <span class="table" :class="moneyType == 2?'active':''" @click="moneyType = 2">资金净流入</span>
      <span class="table" :class="moneyType == 3?'active':''" @click="moneyType = 3">回款金额</span>
      <span class="table" :class="moneyType == 4?'active':''" @click="moneyType = 4">活期余额</span>
    </div>

    <div class="count-list">
      <span class="table1" :class="monthType == 0?'active':''" @click="monthType = 0">当月排行版</span>
      <span class="table1" :class="monthType == 1?'active':''" @click="monthType = 1">上月排行榜</span>
    </div>

    <div id="chart1" class="chart"></div>

    <div class="line-tip">
      <span>数据汇总</span>
    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        渠道名称:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="input" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        <span class="times">统计区间:&nbsp;&nbsp;</span>
        <el-date-picker
          v-model="applyStartTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="endDateOpt"
          value-format="yyyy-MM-dd">
        </el-date-picker>

        <span>--</span>

        <span class="times"></span>
        <el-date-picker
          v-model="applyEndTime"
          type="date"
          placeholder="选择日期"
          :picker-options="endDateOpt"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
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
            label="渠道名称"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="累计充值金额"
          >
          </el-table-column>
          <el-table-column
            prop="certificate_type"
            label="累计提现金额"
          >
          </el-table-column>
          <el-table-column
            prop="certificate_type"
            label="资金净流入"
          >
          </el-table-column>
          <el-table-column
            prop="reg_date"
            label="注册用户数量"
          >
          </el-table-column>
          <el-table-column
            prop="a"
            label="实名用户数量"
          >
          </el-table-column>
          <el-table-column
            prop="b"
            label="投资用户数量"
          >
          </el-table-column>
          <el-table-column
            prop="b"
            label="首投用户数量"
          >
          </el-table-column>
          <el-table-column
            prop="b"
            label="定期投资人数"
          >
          </el-table-column>
          <el-table-column
            prop="b"
            label="活期投资人数"
          >
          </el-table-column>
        </el-table>

      </div>

    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        userType:1, //1、注册人数 2、实名认证人数 3、总投资人数 4、首投人数 5、定期投资人数
        monthType:0, //0、当月  1、上月
        moneyType:0,
        tableData:[],
        input:"",
        applyStartTime:"", //最近一个月
        applyEndTime: "",   //结束时间
        endDateOpt: {
          disabledDate: (time) => {
            return time.getTime() >= new Date();
          }
        },
        userId:"" ,//系统用户ID
        teamLevel:"" //团队级别
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.teamLevel = JSON.parse(user).teamLevel;
      //this.getUserInfo();
      this.$nextTick(function() {
        //this.drawPie('main')
        this.draw()
        this.draw1()
      })
    },
    methods:{
      getQry(){

      },
      //获取借款信息
      getUserInfo(){
        let vm = this;
        this.$http.post('/chan/platformChanData/chanCountByTeamData.do',{
          userId: this.userId,
          type:this.userType,
          teamLevel: this.teamLevel,
          monthType: this.monthType,
        }).then(function(res){


        }).catch(function(err){

        })
      },
      //获取图表数据
      getChartInfo(){
        let vm = this;
        this.$http.post('/loan/index_chart.do',{
          system_id: this.system_id,
        }).then(function(res){
//          console.log(res)
        }).catch(function(err){
          vm.validErrorInfo = err.data.msg;
        })
      },
      draw1(){
        var myChart = echarts.init(document.getElementById('chart1'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: ''
          },
          color: ['#FF0000'],
          calculable : true,
          tooltip: {},
          legend: {
            data:['']
          },
          toolbox: {
            show : true,
            x:'90%',
            feature : {
              mark : {show: true},
//              magicType : {show: true, type: ['line', 'bar']},
//              restore : {show: true},
//              saveAsImage : {show: true}
            }
          },
          xAxis: {
            data:['聪明钱科技','西安团队','华北团队','华东团队','华南团队','西南团队','西北团队']
          },
          yAxis: {},
          series: [{
            name: '',
            type: 'bar',
            barWidth : 30,//柱图宽度
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data:['200','435','242','765','176','321','200']
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      draw(){
        var myChart = echarts.init(document.getElementById('chart'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: ''
          },
          color: ['#FF0000'],
          calculable : true,
          tooltip: {},
          legend: {
            data:['']
          },
          toolbox: {
            show : true,
            x:'90%',
            feature : {
              mark : {show: true},
//              magicType : {show: true, type: ['line', 'bar']},
//              restore : {show: true},
//              saveAsImage : {show: true}
            }
          },
          xAxis: {
            data:['聪明钱科技','西安团队','华北团队','华东团队','华南团队','西南团队','西北团队']
          },
          yAxis: {},
          series: [{
            name: '',
            type: 'bar',
            barWidth : 30,//柱图宽度
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data:['725','235','142','265','76','21','300']
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
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
  .count-list{
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 12px;
    margin-bottom: 20px;
    .table{
      width: 130px;
      display: inline-block;
      margin-right: 0px;
      background-color: #f2f2f2;
      text-align: center;
      cursor: pointer;
    }
    .table.active{
      background-color: rgb(51,204,255);
      color: white;
    }
    .table1{
      width: 100px;
      display: inline-block;
      margin-right: 0px;
      background-color: #f2f2f2;
      text-align: center;
      cursor: pointer;
    }
    .table1.active{
      color: rgb(51,204,255);
    }
  }
  .chart{
    width:800px;
    height: 300px;
    margin-top: -1rem;
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
    margin-bottom: 5rem;
  }
</style>
