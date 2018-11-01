<template>
  <div>

    <div style="text-align: left;">
      <div class="button">
        <el-button type="danger" round @click="showDialog=true">新增人员</el-button>
      </div>
    </div>

    <div style="text-align: left;">

      <div class="qry_term">
        姓名:&nbsp;&nbsp;
        <span  class="qry_span"><el-input v-model="realName" placeholder="请输入内容"></el-input></span>
      </div>

      <div class="qry_term">
        手机号:&nbsp;&nbsp;
        <span class="qry_span" style="width: 120px"><el-input v-model="mobilePhone" placeholder="请输入内容" :maxlength="11"></el-input></span>
      </div>

      <div class="qry_term">
        工作类型:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="jobType" placeholder="请选择">
            <el-option
              v-for="item in jobArray"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </span>
      </div>

      <div class="qry_term">
        状态:&nbsp;&nbsp;
        <span class="qry_span">
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusArray"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </span>
      </div>


      <div class="qry_term">
        <el-button type="primary" @click="getQry">查询</el-button>
      </div>

      <div class="qry_term">
        <span style="color: red"><label for="file" style="cursor: pointer">excel批量导入</label></span>
      </div>

      <form id="form" enctype ="multipart/form-data" style="display: none">
        <input type="file" id="file"  @change="openFile($event)" name="multipartFile"/>
        <input type="text" name="userId" v-model="userId" />
        <input type="submit" value="提交">
      </form>

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
            label="工作类型"
          >
          </el-table-column>
          <el-table-column
            prop="status1"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="teamLevel1"
            label="团队级别"
          >
          </el-table-column>
          <el-table-column
            prop="userLevel1"
            label="用户级别"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="	团队名称"
          >
          </el-table-column>
          <el-table-column
            prop="add_time1"
            label="添加时间"
          >
          </el-table-column>
          <el-table-column
            prop="update_time1"
            label="更新时间"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <!--<el-button @click="applyLoan(scope.row)" type="text" size="small">申请借款</el-button>-->
              <el-button type="text" size="small" @click="editPerson(scope.row)">编辑</el-button>
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
          <!--<i></i>-->
        </div>

        <div class="input-name">
          <span class="input-head">姓名：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入企业名称/姓名"
              v-model="person.realName"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">用户uid：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入用户uid"
              v-model="person.uid"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">手机号：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入手机号"
              v-model="person.mobilePhone" :maxlength="11"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">证件号码：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入证件号码"
              v-model="person.idCard"
              :maxlength="18"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">用户类型：</span>
          <div class="prizes-name1">
            <el-select v-model="person.jobType" placeholder="请输入用户类型" clearable>
              <el-option
                v-for="item in jobArray1"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">用户级别：</span>
          <div class="prizes-name1">
            <el-select v-model="person.level" placeholder="请输入用户级别" clearable>
              <el-option
                v-for="item in levelArray1"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>



        <div class="input-name">
          <span class="input-head">用户所属团队：</span>
          <div class="prizes-name1" style="vertical-align: top;max-height: 227px;overflow-y: scroll;">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="code"
              :check-strictly ="true"
              ref="tree"
              @check="nodeCheck"
              :default-expanded-keys="[]"
              :default-checked-keys="[]"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>

        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary" @click="addPerson">添加</el-button></span>
          <span class="save"><el-button type="info" @click="showDialog=false">取消</el-button></span>
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
          <span class="input-head">姓名：</span>
          <div class="prizes-name1">
            <el-input disabled
              placeholder="请输入企业名称/姓名"
              v-model="person.realName"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">手机号：</span>
          <div class="prizes-name1">
            <el-input disabled
              placeholder="请输入手机号"
              v-model="person.mobilePhone" :maxlength="11"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">证件号码：</span>
          <div class="prizes-name1">
            <el-input disabled
              placeholder="请输入证件号码"
              v-model="person.idCard"
              :maxlength="18"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">用户类型：</span>
          <div class="prizes-name1">
            <el-select v-model="person.jobType" placeholder="请输入用户类型" clearable>
              <el-option
                v-for="item in jobArray1"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">用户级别：</span>
          <div class="prizes-name1">
            <el-select v-model="person.level" placeholder="请输入用户级别" clearable>
              <el-option
                v-for="item in levelArray1"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">状态：</span>
          <div class="prizes-name1">
            <el-select v-model="person.status" placeholder="请输入用户级别" clearable>
              <el-option
                v-for="item in statusArray1"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>



        <div class="input-name">
          <span class="input-head">用户所属团队：</span>
          <div class="prizes-name1" style="vertical-align: top;max-height: 227px;overflow-y: scroll;">
            <el-tree
              :data="treeData"
              :show-checkbox ="true"
              node-key="code"
              :check-strictly ="true"
              ref="tree1"
              @check="nodeCheck1"
              :default-expanded-keys="checkNode"
              :default-checked-keys="[]"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>

        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary" @click="modPerson">添加</el-button></span>
          <span class="save"><el-button type="info" @click="cancel()">取消</el-button></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import  {formatDate1,formatDate} from '../../utils/utils.js'
  import "../../utils/jquery.form.js"
  export default {
    data() {
      return {
        showDialog:false,
        modDialog:false,
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
        person:{
          realName:"",
          mobilePhone:"",
          uid:"",
          status:"",
          idCard:"",//身份证号
          jobType:"",//用户类型
          level:"",//用户级别
          teamCode:"",//用户所属团队
        },
        realName:"",
        mobilePhone:"",
        jobArray:[
          {type:"",name:'全部'},
          {type:1,name:'全职 '},
          {type:2,name:'兼职'},
        ],
        jobArray1:[
          {type:1,name:'全职 '},
          {type:2,name:'兼职'},
        ],
        levelArray:['平台','一级团队','二级团队','三级团队','四级团队'],
        levelArray1:[
          {type:0,name:'平台'},
          {type:1,name:'一级团队'},
          {type:2,name:'二级团队'},
          {type:3,name:'三级团队'},
          {type:4,name:'四级团队'},
        ],
        statusArray:[
          {type:"",name:'全部'},
          {type:1,name:'正常'},
          {type:2,name:'冻结'},
          {type:3,name:'注销'},
        ],
        statusArray1:[
          {type:1,name:'正常'},
          {type:2,name:'冻结'},
          {type:3,name:'注销'},
        ],
        treeData: [],
        checkNode:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id:'level'
        },
        jobType:"", //工作类型（1全职 2兼职）
        status:"", //状态（1正常 2冻结,3注销）
        errorTip:"",
        userId:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.getQry();
      this.getTeamTree();
    },
    methods: {
      openFile(){
//        console.log(document.getElementById(this.index).value);
        if(!document.getElementById('file').value){
          return;
        }
        let vm = this;
        $('#form').ajaxSubmit({
          url: "/smartmoney-report/chan/importChanUsersExcel.do",
          type: 'POST',
          timeout : 20000, //超时时间设置，单位毫秒
          dataType: "json",
          //data: $('#'+ this.index).serialize(),
          //processData: false,
          //contentType: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function (res) {
            if(res.success){
               vm.getQry();
            }else{
              vm.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {

                }
              });
            }
          },
          error: function (obj) {
            // alert('服务器请求失败');
          }
        });
      },
      nodeCheck(node){
        let a= [];
        a[0] = node.code
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setCheckedKeys(a);
        this.person.teamCode = node.code;
      },
      nodeCheck1(node){
        let a= [];
        a[0] = node.code
        this.$refs.tree1.setCheckedKeys([]);
        this.$refs.tree1.setCheckedKeys(a);
        this.person.teamCode = node.code;
      },
      cancel(){
          this.person.uid = "";
          this.person.realName ="";
          this.person.mobilePhone="";
          this.person.idCard ="";
          this.person.jobType ="";
          this.person.level="";
          this.person.teamCode ="";
          this.showDialog = false;
          this.modDialog = false;
          this.errorTip = "";
      },
      editPerson(row){
        this.modDialog = true;
        this.person.uid = row.uid;
        this.person.id = row.id;
        this.person.realName = row.real_name;
        this.person.mobilePhone= row.mobile_phone;
        this.person.idCard = row.id_card;
        this.person.jobType = row.job_type;
        this.person.level= row.userLevel;
        this.person.teamCode = row.team_code;
        this.person.status = row.status;
        let a= [];
        a[0] = this.person.teamCode;
        this.checkNode.push(this.person.teamCode);
        this.$refs.tree1.setCheckedKeys([]);
        this.$refs.tree1.setCheckedKeys(a);
      },
      getTeamTree(){
        let vm = this;
        this.$http.post('/chan/getChanTeamInfoByUserId.do',{
          userId: this.userId,
        }).then(function(res){
          if(res.data.success){
            vm.treeData = res.data.data;
          }
        }).catch(function(err){

        })
      },
      getQry(){
        let vm = this;
        this.$http.post('/chan/getChanUsersInfo.do',{
          userId: this.userId,
          realName: this.realName,
          mobilePhone: this.mobilePhone,
          jobType: this.jobType,
          status: this.status,
        }).then(function(res){
          if(res.data.success){
            let tableData = res.data.data;
            for(let i in  tableData){
              tableData[i].index = parseInt(i) + 1;
              tableData[i].job_type1 =  tableData[i].job_type == 1? '全职':'兼职';
              tableData[i].userLevel1 =  tableData[i].userLevel == 1? '管理员':'职员';
              if( tableData[i].status == 1){
                tableData[i].status1 = '正常 '
              }else if(tableData[i].status == 2){
                tableData[i].status1 = '冻结 '
              }else if(tableData[i].status == 3){
                tableData[i].status1 = '注销 '
              }
              tableData[i].teamLevel1 = vm.levelArray[tableData[i].teamLevel];
              tableData[i].update_time1 = formatDate1(tableData[i].update_time);
              tableData[i].add_time1 = formatDate1(tableData[i].add_time);
            }
            vm.tableData = tableData
          }
        }).catch(function(err){

        })
      },
      //修改
      modPerson(){
        let phone$ = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        if(this.person.realName == ""){
          this.errorTip = "姓名不能为空";
          return false;
        }else if(this.person.mobilePhone == ""){
          this.errorTip = "手机号不能为空";
          return false;
        }else if(!phone$.test(this.person.mobilePhone)){
          this.errorTip = "手机号格式不正确";
          return false;
        }else if(this.person.idCard == ""){
          this.errorTip = "身份证号不能为空";
          return false;
        }else if(this.person.jobType == ""){
          this.errorTip = "用户类型不能为空";
          return false;
        }else if(this.person.level == ""){
          this.errorTip = "用户级别不能为空";
          return false;
        }else if(this.person.status == ""){
          this.errorTip = "用户状态不能为空";
          return false;
        }else if(this.person.teamCode == ""){
          this.errorTip = "用户所属团队不能为空";
          return false;
        }else {
          let vm = this;
          this.errorTip = "";
          this.$http.post('/chan/updateChanUsers.do',{
            userId: this.userId,
            id: this.person.id,
            uid: this.person.uid,
            realName: this.person.realName,
            mobilePhone: this.person.mobilePhone,
            idCard: this.person.idCard,
            jobType:this.person.jobType,
            status:this.person.status,
            level: this.person.level,
            teamCode: this.person.teamCode,
          }).then(function(res){
            if(res.data.success){
              vm.modDialog = false;
              vm.getQry();
            }
          }).catch(function(err){

          })
        }
      },
      //添加
      addPerson(){
        let phone$ = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        if(this.person.realName == ""){
          this.errorTip = "姓名不能为空";
          return false;
        }else if(this.person.mobilePhone == ""){
          this.errorTip = "手机号不能为空";
          return false;
        }else if(!phone$.test(this.person.mobilePhone)){
          this.errorTip = "手机号格式不正确";
          return false;
        }else if(this.person.idCard == ""){
          this.errorTip = "身份证号不能为空";
          return false;
        }else if(this.person.jobType == ""){
          this.errorTip = "用户类型不能为空";
          return false;
        }else if(this.person.level == ""){
          this.errorTip = "用户级别不能为空";
          return false;
        }else if(this.person.teamCode == ""){
          this.errorTip = "用户所属团队不能为空";
          return false;
        }else {
          let vm = this;
          this.errorTip = "";
          this.$http.post('/chan/saveChanUsers.do',{
            userId: this.userId,
            uid: this.person.uid,
            realName: this.person.realName,
            mobilePhone: this.person.mobilePhone,
            idCard: this.person.idCard,
            jobType:this.person.jobType,
            level: this.person.level,
            teamCode: this.person.teamCode,
          }).then(function(res){
            if(res.data.success){
              vm.showDialog = false;
              vm.getQry();
            }
          }).catch(function(err){

          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
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
    cursor: pointer;
    .qry_span{
      width:5rem;
      display:inline-block;
    }
  }
  .list_data{
    margin-top: 1rem;
  }

</style>
