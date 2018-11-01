<template>
  <div>
    <div style="text-align: left;margin-bottom: 1rem">
      <div class="button">
        <el-button type="danger" round  @click="createDialog = true;getTeamLeader(1)">创建团队</el-button>
      </div>
    </div>

    <div id="chart1" style="width:1200px; height:400px;"></div>

    <div style="text-align: left;">

      <div class="qry_term">
        团队名称:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="teamName1" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        负责人:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="realName1" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        团队级别:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="teamLevel1" placeholder="请选择">
            <el-option
              v-for="item in levelList"
              :key="item.level"
              :label="item.label"
              :value="item.level">
            </el-option>
          </el-select>
        </span>
      </div>


      <div class="qry_term">
        <el-button type="primary" @click="getTeamInfo">查询</el-button>
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
            label="团队名称"
          >
          </el-table-column>
          <el-table-column
            prop="teamLevel1"
            label="团队级别"
          >
          </el-table-column>
          <el-table-column
            prop="real_name"
            label="负责人"
          >
          </el-table-column>
          <el-table-column
            prop="area_name"
            label="负责区域"
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
            prop="childrenTeamCount"
            label="下属团队"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="getTeamDetail(scope.row.code)">成员管理</el-button>
              <el-button type="text" size="small" @click="editTeam(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="toDetail(scope.row.code)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--添加按钮输入弹框-->
    <div v-show="showDialog">
      <div class="hide-dialog"></div>
      <div class="input-form">
        <div class="close-button">
          <i @click="showDialog=false"></i>
        </div>
        <div class="manage">

          <div class="button">
            <span class="tip">团队成员</span>   <el-button type="danger" round @click="addDialog=true">新增人员</el-button>
          </div>

          <div class="list_data">
            <el-table
              :data="detailData"
              border
              height="450"
              style="width: 100%">
              <el-table-column
                prop="index"
                label="序号"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="real_name"
                label="姓名"
              >
              </el-table-column>
              <el-table-column
                prop="mobile_phone"
                label="手机号"
              >
              </el-table-column>
              <el-table-column
                prop="id_card"
                label="身份证号"
              >
              </el-table-column>
              <el-table-column
                prop="job_type1"
                label="状态"
              >
              </el-table-column>
              <el-table-column
                prop="level1"
                label="职务"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="showDialog=true">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
    </div>

    <!--创建团队弹框-->
    <div v-show="createDialog">
      <div class="hide-dialog"></div>
      <div class="input-form">
        <div class="close-button">
          <!--<i></i>-->
        </div>

        <div class="input-name">
          <span class="input-head">团队名称：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入区域名称"
              v-model="teamName"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">团队级别：</span>
          <div class="prizes-name1">
            <el-select v-model="teamLevel" placeholder="请输入团队级别" @change="getParentTeam(1);getAreaList(1)">
              <el-option
                v-for="item in levelList1"
                :key="item.level"
                :label="item.label"
                :value="item.level">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">团队负责人：</span>
          <div class="prizes-name1">
            <el-select v-model="teamLeaderId" placeholder="请输入团队负责人">
              <el-option
                v-for="item in leaderArray"
                :key="item.id"
                :label="item.real_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">直接上级：</span>
          <div class="prizes-name1">
            <el-select v-model="parentTeamCode" placeholder="请输入团队类型" @change="teamCode=parentTeamCode">
              <el-option
                v-for="item in parentArray"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">团队编码：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入团队编码"
              v-model="teamCode"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">团队负责区域（大区）：</span>
          <div class="prizes-name1">
            <el-select v-model="areaId" placeholder="请输入负责区域">
              <el-option
                v-for="item in areaArray"
                :key="item.area_code"
                :label="item.area_name"
                :value="item.area_code">
              </el-option>
            </el-select>
          </div>
        </div>


        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary" @click="createTeam()">添加</el-button></span>
          <span class="save"><el-button type="info" @click="cancel()">取消</el-button></span>
        </div>
      </div>
    </div>

    <!--添加按钮输入弹框-->
    <div v-show="modDialog">
      <div class="hide-dialog"></div>
      <div class="input-form">
        <div class="close-button">
          <!--<i></i>-->
        </div>

        <div class="input-name">
          <span class="input-head">团队名称：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入区域名称"
              v-model="teamName"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">团队级别：</span>
          <div class="prizes-name1">
            <el-select v-model="teamLevel" placeholder="请输入团队级别" @change="getParentTeam(2);getAreaList(2)" disabled>
              <el-option
                v-for="item in levelList"
                :key="item.level"
                :label="item.label"
                :value="item.level">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">团队负责人：</span>
          <div class="prizes-name1">
            <el-select v-model="teamLeaderId" placeholder="请输入团队负责人">
              <el-option
                v-for="item in leaderArray"
                :key="item.id"
                :label="item.real_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">直接上级：</span>
          <div class="prizes-name1">
            <el-select v-model="parentTeamCode" placeholder="请输入团队类型" @change="teamCode=parentTeamCode">
              <el-option
                v-for="item in parentArray"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">团队编码：</span>
          <div class="prizes-name1">
            <el-input disabled
              placeholder="请输入团队编码"
              v-model="teamCode"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">团队负责区域（大区）：</span>
          <div class="prizes-name1">
            <el-select v-model="areaId" placeholder="请输入负责区域">
              <el-option
                v-for="item in areaArray"
                :key="item.id"
                :label="item.area_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>


        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary" @click="modTeam()">修改</el-button></span>
          <span class="save"><el-button type="info" @click="cancel()">取消</el-button></span>
        </div>
      </div>
    </div>

    <!--添加按钮输入弹框-->
    <div v-show="addDialog">
      <div class="hide-dialog" style="z-index: 100"></div>
      <div class="input-form" style="z-index: 101">
        <div class="close-button">
          <!--<i></i>-->
        </div>

        <div class="float_left">
          <div>员工列表</div>
          <select v-model="selected" multiple>
            <option :id="item.id" v-for="(item,index) in selectList" @dblclick="select1(index,item,'right')">{{item.name}}</option>
          </select>
        </div>

        <img src="../../image/right.png" class="float_img"/>

        <div class="float_right">
          <div>新增人员</div>
          <select v-model="selected" multiple >
            <option :id="item.id" v-for="(item,index) in selectList1" @dblclick="select1(index,item,'left')">{{item.name}}</option>
          </select>
        </div>

        <div class="clear-float"></div>

        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary">添加</el-button></span>
          <span class="save"><el-button type="info" @click="addDialog=false">取消</el-button></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        showDialog:false,
        createDialog:false, //创建团队弹框
        modDialog:false,
        addDialog:false,
        levelList:[
          {level:0,label:'平台'},
          {level:1,label:'一级团队'},
          {level:2,label:'二级团队'},
          {level:3,label:'三级团队'},
          {level:4,label:'四级团队'},
        ],
        levelList1:[
          {level:1,label:'一级团队'},
          {level:2,label:'二级团队'},
          {level:3,label:'三级团队'},
          {level:4,label:'四级团队'},
        ],
        levelArray:['平台','一级团队','二级团队','三级团队','四级团队'],
        /*************创建团队****************/
        realName:"", //负责人姓名
        realName1:"",
        teamCode:"", //团队编码
        teamName:"", //团队名称
        teamName1:"", //团队名称
        teamLevel:"", //对应用户-团队级别
        teamLevel1:"", //对应用户-团队级别
        teamLeaderId:"", //团队负责人id
        parentTeamCode:"", //上级团队编码
        areaId:"", //负责区域id

        tableData:[], //团队列表
        detailData:[], //当前团队详细信息
        leaderArray:[], //团队负责人列表
        parentArray:[], //获取上级负责人
        areaArray:[], //负责地域树

        option:[],
        input:"",
        errorTip:"",

        selected:[],

        selectList:[
          {id:1,name:' zlg1 15868819694'},
          {id:2,name:' zlg1 15868819695'},
          {id:3,name:' zlg1 15868819696'},
          {id:4,name:' zlg1 15868819697'},
          {id:5,name:' zlg1 15868819698'},
        ],
        selectList1:[
        ],
        userId:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.getTeamTree();
      this.getTeamInfo();
      this.getTeamLeader(1);
    },
    methods: {
      modTeam(){
        let vm = this;
        if(this.teamName == ""){
          this.errorTip = "团队名称不能为空";
          return false;
        } else if(this.teamLevel == ""){
          this.errorTip = "团队级别不能为空";
          return false;
        }else if(this.teamLeaderId == ""){
          this.errorTip = "团队负责人不能为空";
          return false;
        }else if(this.parentTeamCode == ""){
          this.errorTip = "上级团队不能为空";
          return false;
        }else if(this.teamCode == ""){
          this.errorTip = "团队编码不能为空";
          return false;
        }else if(this.areaId== ""){
          this.errorTip = "负责区域不能为空";
          return false;
        }else {
          this.errorTip = "";
          this.$http.post('/chan/updateChanTeam.do', {
            userId: this.userId,
            teamCode: this.teamCode,
            teamName: this.teamName,
            teamLevel: this.teamLevel,
            teamLeaderId: this.teamLeaderId,
            parentTeamCode: this.parentTeamCode,
            areaId: this.areaId,
          }).then(function (res) {
            vm.cancel();
            vm.getTeamInfo();
          }).catch(function (err) {

          })
        }
      },
      //编辑team
      editTeam(row){
        this.realName = row.real_name;
        this.teamCode =  row.code; //团队编码
        this.teamName = row.name; //团队名称
        this.teamLevel = row.level; //对应用户-团队级别
        this.teamLeaderId = row.leaderId; //团队负责人id
        this.parentTeamCode = row.parent_code;//上级团队编码
        this.areaId = row.areaId+""; //负责区域id
        this.getTeamLeader(2);
        this.getParentTeam(2);
        this.getAreaList(2);
        this.modDialog = true;
      },
      //取消
      cancel(){
        this.createDialog = false;
        this.modDialog = false;
        this.realName = "";
        this.teamCode = ""; //团队编码
        this.teamName = ""; //团队名称
        this.teamLevel = ""; //对应用户-团队级别
        this.teamLeaderId = ""; //团队负责人id
        this.parentTeamCode = "";//上级团队编码
        this.areaId = ""; //负责区域id
        this.errorTip = "";
      },
      //获取上级团队
      getParentTeam(type){
        let vm = this;
        this.$http.post('/chan/getParentChanTeams.do',{
          userId: this.userId,
          teamLevel:this.teamLevel,
        }).then(function(res){
          vm.parentArray = res.data.data;
          if(type == 1){
            vm.parentTeamCode = "";
          }
        }).catch(function(err){

        })
      },
      //获取区域
      getAreaList(type){
        let data = {
          userId: this.userId,
          areaLevel:this.teamLevel,
          type:type
        }
        let vm = this;
        if(type == 2){
          data.teamCode = this.teamCode
        }
        this.$http.post('/chan/getAreaListByLevel.do',data).then(function(res){
          vm.areaArray = res.data.data;
          if(type == 1){
            vm.areaId = "";
          }
        }).catch(function(err){

        })
      },
      //获取团队负责人
      getTeamLeader(type){
        let data = {
          userId: this.userId,
          type:type
        }
        let vm = this;
        if(type == 2){ //修改时必传
          data.teamCode = this.teamCode
        }
        this.$http.post('/chan/getChanUsersAsLeader.do',data
        ).then(function(res){
          vm.leaderArray = res.data.data;
        }).catch(function(err){

        })
      },
      //创建团队
      createTeam(){
        let vm = this;
        if(this.teamName == ""){
          this.errorTip = "团队名称不能为空";
          return false;
        } else if(this.teamLevel == ""){
          this.errorTip = "团队级别不能为空";
          return false;
        }else if(this.teamLeaderId == ""){
          this.errorTip = "团队负责人不能为空";
          return false;
        }else if(this.parentTeamCode == ""){
          this.errorTip = "上级团队不能为空";
          return false;
        }else if(this.teamCode == ""){
          this.errorTip = "团队编码不能为空";
          return false;
        }else if(this.areaId== ""){
          this.errorTip = "负责区域不能为空";
          return false;
        }else {
          this.errorTip = "";
          this.$http.post('/chan/establishChanTeam.do',{
            userId: this.userId,
            teamCode: this.teamCode,
            teamName:this.teamName,
            teamLevel:this.teamLevel,
            teamLeaderId:this.teamLeaderId,
            parentTeamCode:this.parentTeamCode,
            areaId:this.areaId,
          }).then(function(res){
            vm.createDialog = false;
            vm.getTeamInfo();
          }).catch(function(err){

          })
        }
      },
      //获取当前团队的所有成员信息
      getTeamDetail(code){
        let vm = this;
        this.$http.post('/chan/getUsersInfoByTeamCode.do',{
          userId: this.userId,
          teamCode:code,
        }).then(function(res){
          vm.showDialog = true;
          let tableData = res.data.data;
          for(let i in tableData){
            tableData[i].index = parseInt(i) + 1;
            tableData[i].job_type1 =  tableData[i].job_type == 1 ? '全职 ': '兼职';
            tableData[i].level1 =  tableData[i].level == 1 ? '管理员 ': '职员';
          }
          vm.detailData = tableData;
        }).catch(function(err){

        })
      },
      //获取团队信息
      getTeamInfo(){
        let vm = this;
        this.$http.post('/chan/getChanTeamInfo.do',{
          userId: this.userId,
          teamName:this.teamName1,
          realName:this.realName1,
          level: this.teamLevel1,
          teamCode:"",
        }).then(function(res){
          let tableData = res.data.data;
          for(let i in tableData){
            tableData[i].index = parseInt(i) + 1;
            tableData[i].teamLevel1 = vm.levelArray[tableData[i].level]
          }
          vm.tableData = tableData;
        }).catch(function(err){

        })
      },
      //画组织结构
      getTeamTree(){
        let vm = this;
        this.$http.post('/chan/getChanTeamTree.do',{
          userId: this.userId,
        }).then(function(res){
          if(res.data.success){
            vm.drawTree(res.data.data[0]);
          }
        }).catch(function(err){

        })
      },
      drawTree(data){
        var myChart = echarts.init(document.getElementById('chart1'));
        var commonStyle = {

        }
        var option = {
          title : {
            text: '组织结构图'
          },
          tooltip : {
            show: false,
            trigger: 'item',
            formatter: "{b}: {c}"
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : false,
          series : [
            {
              name:'树图',
              type:'tree',
              orient: 'horizontal',  // vertical horizontal
              rootLocation: {x: '50%', y: '15%'}, // 根节点位置  {x: 'center',y: 10}
              nodePadding: 20,
              layerPadding:40,
              symbol: 'rectangle',
              borderColor:'black',
              itemStyle: {
                normal: {
                  color: '#fff',//节点背景色
                  label: {
                    show: true,
                    position: 'inside',
                    textStyle: {
                      color: 'black',
                      fontSize: 15,
                      //fontWeight:  'bolder'
                    }
                  },
                  lineStyle: {
                    color: '#000000',
                    width: 1,
                    type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                  }
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              data: [
                data
              ]
            }
          ]
        };
        // 为echarts对象加载数据
        myChart.setOption(option);
      },
      select1(index,item,type){
       if(type == 'right'){
         this.selectList.splice(index,1);
         this.selectList1.push(item);
       }else {
         this.selectList1.splice(index,1);
         this.selectList.push(item);
       }
      },
      getQry(){

      },
      toDetail(code){
        this.$router.push('/mainMenu/teamDetail/'+code)
      }
    }
  }
</script>

<style scoped lang="less">
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
  .el-tree{
    background-color: #f8f8f8;
   }
  .manage{
    padding: 0 30px;
    text-align: left;
    .list_data{
      text-align: center;
    }
    .button{
      display: inline-block;
      .tip{
        font-size: 16px;
        margin-right: 20px;
      }
    }
  }
  .float_left{
    float: left;
    margin-left: 15px;
    font-size: 15px;
    text-align: left;
    select{
      width: 150px;
      height: 200px;
    }
  }
  .float_right{
    float: right;
    font-size: 15px;
    margin-right: 15px;
    text-align: left;
    select{
      width: 150px;
      height: 200px;
    }
  }
  .float_img{
    width: 1rem;
    margin-top: 4rem;
  }
  .clear-float{
    clear: both;
  }
</style>
