<template>
  <div>

    <div class="total-data">
      <span class="data">累计交易量：{{demandAmount}}元</span>
      <span class="data right">活期存量：{{investAmount}}元</span>
    </div>

    <div class="line-tip">
      <span>用户分析</span>
    </div>

    <div class="count-list">
      <span class="table" :class="userType == 1?'active':''" @click="userTypeChange(1)">注册用户分析</span>
      <span class="table" :class="userType == 2?'active':''" @click="userTypeChange(2)">实名认证用户分析</span>
      <span class="table" :class="userType == 3?'active':''" @click="userTypeChange(3)">投资用户分析</span>
      <span class="table" :class="userType == 4?'active':''" @click="userTypeChange(4)">首投用户分析</span>
      <span class="table" :class="userType == 5?'active':''" @click="userTypeChange(5)">定期投资人数</span>
    </div>

    <div style="text-align: left">
      <div class="chart-left">

        <div class="qry_term">
          <span class="qry_span">
            <el-select v-model="firstValue" placeholder="请选择团队" @change="getNextTeam1(firstValue)">
              <el-option
                v-for="item in firstOpt"
                :key="item.code"
                :label="item.label"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
        </div>

        <div class="qry_term" v-for="(object,index) in nextOpt" >
          <span class="qry_span">
            <el-select v-model="nextOpt[index].code" placeholder="请选择" @change="getNextTeam1(nextOpt[index].code)">
              <el-option
                v-for="item in object"
                :key="item.code"
                :label="item.label"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
        </div>


        <div id="chart1"></div>

      </div>
      <div class="chart-right">

        <div class="qry_term">
          <span class="qry_span">
            <el-select v-model="teamLevel" placeholder="请选择团队" @change="getTeamUser()">
              <el-option
                v-for="item in levelList"
                :key="item.level"
                :label="item.label"
                :value="item.level"
                :disabled="item.level <= currLevel"
              >
              </el-option>
            </el-select>
          </span>
        </div>

        <div class="count-list" style="display:inline">
          <span class="table1" :class="monthType.user == 0?'active':''" @click="monthType.user = 0;getTeamUser()">当月排行版</span>
          <span class="table1" :class="monthType.user == 1?'active':''" @click="monthType.user = 1;getTeamUser()">上月排行榜</span>
        </div>

        <div id="chart2"></div>

      </div>
    </div>

    <div class="line-tip">
      <span>资金分析</span>
    </div>

    <div class="count-list">
      <span class="table" :class="moneyType == 1?'active':''" @click="moneyTypeChange(1)">累计充值金额</span>
      <span class="table" :class="moneyType == 2?'active':''" @click="moneyTypeChange(2)">累计提现金额</span>
      <span class="table" :class="moneyType == 3?'active':''" @click="moneyTypeChange(3)">资金净流入</span>
      <span class="table" :class="moneyType == 4?'active':''" @click="moneyTypeChange(4)">回款金额</span>
      <!--<span class="table" :class="moneyType == 5?'active':''" @click="moneyType = 5">活期余额</span>-->
    </div>


    <div style="text-align: left">
      <div class="chart-left">

        <div class="qry_term">
          <span class="qry_span">
            <el-select v-model="firstValue1" placeholder="请选择团队" @change="getNextTeam2(firstValue1)">
              <el-option
                v-for="item in firstOpt"
                :key="item.code"
                :label="item.label"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
        </div>

        <div class="qry_term" v-for="(object,index) in nextOpt1" >
          <span class="qry_span">
            <el-select v-model="nextOpt1[index].code" placeholder="请选择" @change="getNextTeam2(nextOpt1[index].code)">
              <el-option
                v-for="item in object"
                :key="item.code"
                :label="item.label"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
        </div>

        <div id="chart3"></div>

      </div>
      <div class="chart-right">

        <div class="qry_term">
          <span class="qry_span">
             <el-select v-model="teamLevel1" placeholder="请选择团队" @change="getMoneyTeam">
              <el-option
                v-for="item in levelList"
                :key="item.level"
                :label="item.label"
                :value="item.level"
                :disabled="item.level <= currLevel"
              >
              </el-option>
            </el-select>
          </span>
        </div>

        <div class="count-list" style="display: inline-block">
          <span class="table1" :class="monthType.money == 0?'active':''" @click="monthType.money = 0;getMoneyTeam()">当月排行版</span>
          <span class="table1" :class="monthType.money == 1?'active':''" @click="monthType.money = 1;getMoneyTeam()">上月排行榜</span>
        </div>

        <div id="chart4"></div>

      </div>
    </div>

    <div class="line-tip">
      <span>团队数据汇总</span>
    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        团队名称/姓名:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="team.teamName" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        <span class="times">统计区间:&nbsp;&nbsp;</span>
        <el-date-picker
          v-model="team.startDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="endDateOpt"
          value-format="yyyy-MM-dd">
        </el-date-picker>

        <span>--</span>

        <span class="times"></span>
        <el-date-picker
          v-model="team.endDate"
          type="date"
          placeholder="选择日期"
          :picker-options="endDateOpt"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </div>

      <div class="qry_term">
         团队级别：
          <span class="qry_span">
            <el-select v-model="team.level" placeholder="请选择">
              <el-option
                v-for="item in levelList1"
                :key="item.level"
                :label="item.label"
                :value="item.level"
                :disabled="item.level <= currLevel"
              >
              </el-option>
            </el-select>
          </span>
      </div>


      <div class="qry_term">
        <el-button type="primary" @click="getTeamTotal('');getTeamTotal(1);getTeamTotal(3)">查询</el-button>
      </div>


      <!--列表-->
      <div class="user-detail">
        <ul>
          <li style="width: 5%">序号</li>
          <li>团队名称/姓名</li>
          <li>累计充值金额（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>累计提现金额（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>资金净流入（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>注册用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>实名用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>投资用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>首投用户数量（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <li>定期投资人数（<span class="left">邀请</span>/<span class="right">自然</span>）</li>
          <!--<li>活期投资人数（<span class="left">邀请</span>/<span class="right">自然</span>）</li>-->
        </ul>
        <ul v-for="(item,index) in totalData.total" v-if="totalData.invite.length>0 && totalData.nature.length>0">
          <li style="width: 5%">1</li>
          <li>{{item.name}}</li>
          <li>{{item.crushamount}}（<span class="left">{{totalData.invite[index].crushamount}}</span>/<span  class="right">{{totalData.nature[index].crushamount}}</span>）</li>
          <li>{{item.carryamount}}（<span class="left">{{totalData.invite[index].carryamount}}</span>/<span  class="right">{{totalData.nature[index].carryamount}}</span>）</li>
          <li>{{item.increase}}（<span class="left">{{totalData.invite[index].increase}}</span>/<span  class="right">{{totalData.nature[index].increase}}</span>）</li>
          <li>{{item.regcount}}（<span class="left">{{totalData.invite[index].regcount}}</span>/<span  class="right">{{totalData.nature[index].regcount}}</span>）</li>
          <li>{{item.realcount}}（<span class="left">{{totalData.invite[index].realcount}}</span>/<span  class="right">{{totalData.nature[index].realcount}}</span>）</li>
          <li>{{item.investcount}}（<span class="left">{{totalData.invite[index].investcount}}</span>/<span  class="right">{{totalData.nature[index].investcount}}</span>）</li>
          <li>{{item.finvestcount}}（<span class="left">{{totalData.invite[index].finvestcount}}</span>/<span  class="right">{{totalData.nature[index].finvestcount}}</span>）</li>
          <li>{{item.dinvestcount}}（<span class="left">{{totalData.invite[index].dinvestcount}}</span>/<span  class="right">{{totalData.nature[index].dinvestcount}}</span>）</li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import  {formatDate1,formatDate} from '../../utils/utils.js'
  export default {
    data() {
      return {
        levelList:[
          {level:1,label:'一级团队'},
          {level:2,label:'二级团队'},
          {level:3,label:'三级团队'},
          {level:4,label:'四级团队'},
        ],
        levelList1:[
          {level:'',label:'全部'},
          {level:1,label:'一级团队'},
          {level:2,label:'二级团队'},
          {level:3,label:'三级团队'},
          {level:4,label:'四级团队'},
        ],
        teamLevel:1, //对应用户-团队级别
        teamLevel1:1, //对应资金-团队级别
        currLevel:"", //当前自己的团队类型
        currCode:"", //当前自己的团队code
        firstOpt: [{
          code: '全部.1',
          level: 1, //默认最高级为1
          label: '全部'
        }],
        monthType:{ //0、当月 1、上月
          user: 0,
          money: 0
        },
        firstValue:"", //用户-首值
        firstValue1:"", //资金-首值
        selectLevel:"", //用户-当前选择的层级
        selectLevel1:"", //资金-当前选择的层级
        nextOpt:[], //用户-下一级
        nextOpt1:[], //资金-下一级
        team:{
          teamName:"", //团队名称
          startDate: formatDate(new Date() - 3600 * 1000 * 24 * 30), //开始时间
          endDate:formatDate(new Date()), //结束时间
          level:"", //团队层级
          regsource:"", //渠道
        },
        totalData:{
          total:{},
          nature:{},
          invite:{},
        }, //总得团队数据
        endDateOpt: {
          disabledDate: (time) => {
            return time.getTime() >= new Date();
          }
        },
        moneyType:1, //1、累计充值金额 2、累计提现金额 3、资金净流入 4、汇款金额
        userType:1, //1、注册人数 2、实名认证人数 3、总投资人数 4、首投人数 5、定期投资人数
        userId:"" ,//系统用户ID
        demandAmount: 0, //活期存量
        investAmount: 0 //总交易量
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      let teamLevel = JSON.parse(user).teamLevel;
      this.currLevel = teamLevel;
      this.teamLevel = teamLevel + 1;
      this.teamLevel1 = teamLevel + 1;
      this.team.level = teamLevel == 0 ? "": teamLevel;

      this.currCode = JSON.parse(user).team_code;
      this.firstOpt[0].code = this.firstOpt[0].code+ '.' +  this.currCode;
      this.getInvestAmount();
      this.getNextTeam();
      this.getUserCount(this.currCode);
      this.getTeamUser();
      this.getMoneyCount(this.currCode);
      this.getMoneyTeam()
      //总数据汇总
      this.getTeamTotal('');
      this.getTeamTotal(1);
      this.getTeamTotal(3)
    },
    methods: {
      //获取总交易量和活期存量
      getInvestAmount(){
        let vm = this;
        this.$http.post('/chan/platformChanData/getInvestAndDemandAmount.do',{
          userId: this.userId,
        }).then(function(res){
          vm.demandAmount = res.data.data.demandAmount.toFixed(2);
          vm.investAmount = res.data.data.investAmount.toFixed(2);
        }).catch(function(err){

        })
      },
      //根据团队编码获取下级团队
      getNextTeam(){
        let vm = this;
        this.$http.post('/chan/getNextLevelTeam.do',{
          userId: this.userId,
          teamCode: this.currCode,
        }).then(function(res){
          let list = res.data.data;
          for(let i in list){
            let listI ={
              code:  list[i].code + '.' + 1 + '.'+ vm.currCode,
              level: 1,
              label: list[i].name,
            }
            vm.firstOpt.push(listI)
          }
        }).catch(function(err){

        })
      },
      //根据团队编码获取下级团队
      getNextTeam1(value){
        let vm = this;
        this.from = value.split('.')[2];
        this.selectLevel = value.split('.')[1];
        this.currCode = value.split('.')[0];

        if(this.currCode == '全部'){ //如果是全部，查询上一级的数据
          this.getUserCount(this.from)
        }else {
          this.getUserCount(this.currCode)
        }

        if(this.selectLevel == '1' && this.currCode =='全部'){ //如果选择全部，下面的都不需要了
           this.nextOpt = [];
        }else {
          let select_array=[];
          for(let i=0;i< this.nextOpt.length;i++){
            if(this.nextOpt[i][0].level > this.selectLevel){
              break;
            }else {
              select_array.push(this.nextOpt[i]);
            }
          }
          this.nextOpt = select_array;

          if(this.currCode == '全部'){
            return;
          }

          this.$http.post('/chan/getNextLevelTeam.do',{
            userId: this.userId,
            teamCode: this.currCode,
          }).then(function(res){
            let list = res.data.data;
            if(list.length > 0){
              vm.selectLevel ++;
              let object_array =[
                {
                  code: '全部.'+ vm.selectLevel+ '.'+ vm.currCode,
                  level: vm.selectLevel, //默认最高级为1
                  label: '全部'
                }
              ]
              for(let i in list){
                let listI ={
                  code:  list[i].code + '.' + vm.selectLevel+ '.'+ vm.currCode,
                  level: vm.selectLevel,
                  label: list[i].name,
                }
                object_array.push(listI)
              }
              vm.nextOpt.push(object_array)
            }
          }).catch(function(err){
          })
        }
      },
      //根据团队编码获取下级团队
      //根据团队编码获取下级团队
      getNextTeam2(value){
        let vm = this;
        this.from = value.split('.')[2];
        this.selectLevel1 = value.split('.')[1];
        this.currCode = value.split('.')[0];

        if(this.currCode == '全部'){ //如果是全部，查询上一级的数据
          this.getMoneyCount(this.from)
        }else {
          this.getMoneyCount(this.currCode)
        }

        if(this.selectLevel1 == '1' && this.currCode =='全部'){ //如果选择全部，下面的都不需要了
          this.nextOpt1 = [];
        }else {
          let select_array=[];
          for(let i=0;i< this.nextOpt1.length;i++){
            if(this.nextOpt1[i][0].level > this.selectLevel1){
              break;
            }else {
              select_array.push(this.nextOpt1[i]);
            }
          }
          this.nextOpt1 = select_array;

          if(this.currCode == '全部'){
            return;
          }

          this.$http.post('/chan/getNextLevelTeam.do',{
            userId: this.userId,
            teamCode: this.currCode,
          }).then(function(res){
            let list = res.data.data;
            if(list.length > 0){
              vm.selectLevel1 ++;
              let object_array =[
                {
                  code: '全部.'+ vm.selectLevel1+ '.'+ vm.currCode,
                  level: vm.selectLevel1, //默认最高级为1
                  label: '全部'
                }
              ]
              for(let i in list){
                let listI ={
                  code:  list[i].code + '.' + vm.selectLevel1+ '.'+ vm.currCode,
                  level: vm.selectLevel1,
                  label: list[i].name,
                }
                object_array.push(listI)
              }
              vm.nextOpt1.push(object_array)
            }
          }).catch(function(err){
          })
        }
      },
      //用户类别切换
      userTypeChange(type){
        this.userType = type;
        if(this.currCode == '全部'){ //如果是全部，查询上一级的数据
          this.getUserCount(this.from)
        }else {
          this.getUserCount(this.currCode)
        }
        this.getTeamUser()
      },
      //资金类别切换
      moneyTypeChange(type){
        this.moneyType = type;
        if(this.currCode == '全部'){ //如果是全部，查询上一级的数据
          this.getMoneyCount(this.from)
        }else {
          this.getMoneyCount(this.currCode)
        }
        this.getMoneyTeam()
      },
      //根据月份获取用户数
      getUserCount(code){
        let vm = this;
        this.$http.post('/chan/platformChanData/chanCountByMonthData.do',{
          userId: this.userId,
          type:this.userType,
          teamCode: code,
        }).then(function(res){
          let list = res.data.data.count;
          let nameList = []; //名字列表
          let countList =[]; //统计列表
          let rateList =[]; //增长率列表
          for(let i in list){
            nameList[i] = list[i].month_date;
            countList[i] = list[i].count;
            rateList[i] = list[i].rate;
          }
          vm.draw1(nameList,countList,rateList);
        }).catch(function(err){

        })
      },
      //根据团队获取用户数
      getTeamUser(){
        let vm = this;
        this.$http.post('/chan/platformChanData/chanCountByTeamData.do',{
          userId: this.userId,
          type:this.userType,
          teamLevel:this.teamLevel,
          monthType: this.monthType.user,
        }).then(function(res){
          let list = res.data.data;
          let nameList = []; //名字列表
          let countList =[]; //统计列表
          for(let i in list){
            nameList[i] = list[i].name;
            countList[i] = list[i].count;
          }
          vm.draw2(nameList,countList);
        }).catch(function(err){

        })
      },
      //根据月份获取资金量
      getMoneyCount(code){
        let vm = this;
        this.$http.post('/chan/platCapitalDataAnalyze/getCapitalDataGroupMonth.do',{
          userId: this.userId,
          capitalType:this.moneyType,
          teamCode: code,
        }).then(function(res){
          let list = res.data.data.amountList;
          let nameList = []; //名字列表
          let countList =[]; //统计列表
          let rateList =[]; //增长率列表
          for(let i in list){
            nameList[i] = list[i].tdate;
            countList[i] = list[i].amount;
            rateList[i] = list[i].rate;
          }
          vm.draw3(nameList,countList,rateList);
        }).catch(function(err){

        })
      },
      //根据资金分析团队
      getMoneyTeam(){
        let vm = this;
        this.$http.post('/chan/platCapitalDataAnalyze/getCapitalDataGroupTeam.do',{
          userId: this.userId,
          capitalType:this.moneyType,
          teamLevel:this.teamLevel1,
          monthType: this.monthType.money,
        }).then(function(res){
          let list = res.data.data;
          let nameList = []; //名字列表
          let countList =[]; //统计列表
          for(let i in list){
            nameList[i] = list[i].name;
            countList[i] = list[i].amount;
          }
          vm.draw4(nameList,countList);
        }).catch(function(err){

        })
      },
      draw1(nameList,countList,rateList){
        var myChart = echarts.init(document.getElementById('chart1'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '近半年注册用户增长情况',
            left:'220',
          },
          calculable : true,
          tooltip: {},
          legend: {
            data:['注册数','增长率'],
            top:"bottom"
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
            data: nameList
          },
          yAxis: [
            {
              type: 'value',
              name: '注册数',
            },
            {
              type: 'value',
              name: '增长率',
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: [
            {
              name: '注册数',
              type: 'bar',
              color: ['#00B050'],
              barWidth : 30,//柱图宽度
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data:countList
            },
            {
              name:'增长率',
              type:'line',
              color: ['#FF0000'],
              yAxisIndex: 1,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data:rateList
            }
         ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      draw2(nameList,countList){
        var myChart = echarts.init(document.getElementById('chart2'));
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
            data:nameList
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
            data:countList
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      draw3(nameList,countList,rateList){
        var myChart = echarts.init(document.getElementById('chart3'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '近半年资金增长情况',
            left:'220',
          },
          calculable : true,
          tooltip: {},
          legend: {
            data:['资金量','增长率'],
            top:"bottom"
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
            data:nameList
          },
          yAxis: [
            {
              type: 'value',
              name: '资金量',
              axisLabel: {
                formatter: '{value}万'
              }
            },
            {
              type: 'value',
              name: '增长率',
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: [
            {
              name: '资金量',
              type: 'bar',
              color: ['#00B050'],
              barWidth : 30,//柱图宽度
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data:countList
            },
            {
              name:'增长率',
              type:'line',
              color: ['#FF0000'],
              yAxisIndex: 1,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data:rateList
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      draw4(nameList,countList){
        var myChart = echarts.init(document.getElementById('chart4'));
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
            data:nameList
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
            data:countList
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      //获取团队总数据
      getTeamTotal(type){
        let vm = this;
        this.$http.post('/chan/teamDataSummary.do',{
          userId: this.userId,
          teamName:this.team.teamName,
          startDate:formatDate(this.team.startDate),
          endDate: formatDate(this.team.endDate),
          level:this.team.level,
          regsource: type,
        }).then(function(res){
          if(type == ''){
            vm.totalData.total = res.data.data;
          }else  if(type == 1){
            vm.totalData.nature= res.data.data;
          }else{
            vm.totalData.invite = res.data.data;
          }
//          console.log(vm.totalData)
        }).catch(function(err){

        })
      }
    }
  }
</script>

<style scoped lang="less">
  .total-data{
    text-align: left;
    .data{
      display: inline-block;
      width: 270px;
      height: 70px;
      line-height: 70px;
      font-size: 15px;
      text-align: center;
      background-color: rgb(51,204,255);
      color: white;
      margin-right: 10px;
    }
    .data.right{
      background-color: rgb(255,102,0);
    }
  }
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
  .qry_term{
    display: inline-block;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    .qry_span{
      width:5rem;
      display:inline-block;
    }
  }
  .chart-left{
    text-align: left;
    display: inline-block;
    #chart1,#chart3{
      width:700px;
      height: 300px;
      margin-left: -1rem;
      margin-top: 1rem;
    }
  }
  .chart-right{
    text-align: left;
    display: inline-block;
    #chart2,#chart4{
      width:700px;
      height: 300px;
      margin-left: -1rem;
      margin-top: 1rem;
    }
  }
  .user-detail{
    overflow-x: scroll;
    margin-bottom: 4rem;
    margin-top: 1rem;
    ul{
      list-style: none;
      display: flex;
      width: 1750px;
      font-size: 13px;
      li{
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #ebeef5;
        margin-bottom: -1px;
        margin-right: -1px;
        width: 10.5%;
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
