<template>
  <div>

    <div class="area-title">
      <div class="button">
        <el-button type="danger" round  @click="showDialog=true">新增区域</el-button>
      </div>
    </div>


    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="区域"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="区域范围（省市）"
      >
        <template slot-scope="scope">
          <span class="checkbox-span">
            <span v-for="(item,index) in tableData[scope.$index].box" class="box">
               <label>{{item.name}}</label>
            </span>
          </span>
          <!--<el-button  v-if="scope.row.status == 3" type="text" size="small" disabled>{{scope.row.order_no}}</el-button>-->
        </template>
      </el-table-column>
      <el-table-column
        label="编辑"
        width="120"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加按钮输入弹框-->
    <div v-show="showDialog">
      <div class="hide-dialog"></div>
      <div class="input-form">
        <div class="close-button">
          <!--<i></i>-->
        </div>

        <div class="input-name">
          <span class="input-head">区域名称：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入区域名称"
              v-model="areaName"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">区域编码：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入区域编码"
              v-model="areaCode"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">区域级别：</span>
          <div class="prizes-name1">
            <el-select v-model="areaLevel" placeholder="请输入区域级别">
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
          <span class="input-head">上级区域：</span>
          <div class="prizes-name1">
            <el-select v-model="parentId" placeholder="请输入上级区域">
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
          <span class="input-head">区域范围：</span>
          <div class="prizes-name1" style="vertical-align: top">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[]"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>


        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary" @click="addArea">添加</el-button></span>
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
          <span class="input-head">区域名称：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入区域名称"
              v-model="areaName"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">区域编码：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入区域编码"
              v-model="areaCode"
            >
            </el-input>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">区域级别：</span>
          <div class="prizes-name1">
            <el-select v-model="areaLevel" placeholder="请输入区域级别">
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
          <span class="input-head">上级区域：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入上级区域"
              v-model="areaLevel"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">区域范围：</span>
          <div class="prizes-name1" style="vertical-align: top">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[]"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>


        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="primary">添加</el-button></span>
          <span class="save"><el-button type="info" @click="showDialog=false">取消</el-button></span>
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
        input:"",
        errorTip:"",
        showDialog:false,
        modDialog: false,

        chAreaId:"", //区域id
        areaName:"", //区域名称
        areaCode:"", //区域code
        areaLevel:"", //区域级别
        parentId:"", //上级区域id
        sysCityId:"", //区域范围id集合
        levelList:[
          {level:1,label:'一级区域'},
          {level:2,label:'二级区域'},
          {level:3,label:'三级区域'},
          {level:4,label:'四级区域'},
        ],
        tableData: [{
          index:1,
          name: '西北片区',
          box:[
            {name:"新疆省（乌鲁木齐、克拉玛依、阿克苏地区）"},
            {name:"杭州市"},
          ]
        }, {
          index:2,
          name: '西安团队',
          box:[
            {name:"陕西省（西安）"},
          ]
        }
        ],
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id:'level'
        },
        userId:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
    },
    methods: {
      //获取区域信息
      getQry(){
        let vm = this;
        this.$http.post('/chan/area/addOrUpdateArea.do', {
          userId: this.userId,
          areaName: this.areaName,
          areaCode: this.areaCode,
          areaLevel: this.areaLevel,
          parentId: this.parentId,
          sysCityId: this.sysCityId,
        }).then(function (res) {

        }).catch(function (err) {

        })
      },
      cancel(){
        this.showDialog = false;
        this.modDialog = false;
        this.errorTip = "";
        this.areaName = '';
        this.areaCode = '';
        this.areaLevel = '';
        this.parentId = '';
        this.sysCityId = '';
      },
      modArea(){
        let vm = this;
        if(this.areaName == ''){
          this.errorTip = "区域名称不能为空";
          return ;
        }else if(this.areaCode == ''){
          this.errorTip = "区域code不能为空";
          return ;
        }else if(this.areaLevel == ''){
          this.errorTip = "区域级别不能为空";
          return ;
        }else if(this.parentId == ''){
          this.errorTip = "上级区域不能为空";
          return ;
        }else if(this.sysCityId == ''){
          this.errorTip = "区域范围不能为空";
          return ;
        }else {
          this.errorTip = "";
          this.$http.post('/chan/area/addOrUpdateArea.do', {
            userId: this.userId,
            chAreaId:this.chAreaId,
            areaName: this.areaName,
            areaCode: this.areaCode,
            areaLevel: this.areaLevel,
            parentId: this.parentId,
            sysCityId: this.sysCityId,
          }).then(function (res) {
            vm.modDialog = false;
            vm.getQry();
          }).catch(function (err) {

          })
        }
      },
      //添加区域
      addArea(){
        let vm = this;
        if(this.areaName == ''){
          this.errorTip = "区域名称不能为空";
          return ;
        }else if(this.areaCode == ''){
          this.errorTip = "区域code不能为空";
          return ;
        }else if(this.areaLevel == ''){
          this.errorTip = "区域级别不能为空";
          return ;
        }else if(this.parentId == ''){
          this.errorTip = "上级区域不能为空";
          return ;
        }else if(this.sysCityId == ''){
          this.errorTip = "区域范围不能为空";
          return ;
        }else {
          this.errorTip = "";
          this.$http.post('/chan/area/addOrUpdateArea.do', {
            userId: this.userId,
            areaName: this.areaName,
            areaCode: this.areaCode,
            areaLevel: this.areaLevel,
            parentId: this.parentId,
            sysCityId: this.sysCityId,
          }).then(function (res) {
            vm.showDialog = false;
            vm.getQry();
          }).catch(function (err) {

          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .area-title{
    text-align: left;
    margin-bottom: 1rem;
    .button{
      display: inline-block;
      margin-left: 0rem;
    }
  }
  .checkbox-span{
    text-align: left;
    display: inline-block;
    width: 100%;
    .box{
      margin-left: 0.8rem;
      input{
        vertical-align: middle;
      }
    }
  }
</style>
