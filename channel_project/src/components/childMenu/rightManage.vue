<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 60%">
      <el-table-column
        prop="role_code"
        label="角色编码"
       >
      </el-table-column>

      <el-table-column
        prop="role_name"
        label="角色"
       >
      </el-table-column>

      <el-table-column
        prop="status1"
        label="角色状态"
        >
      </el-table-column>

      <el-table-column
        label="编辑"
        width="80"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editRight(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="modDialog">
      <div class="hide-dialog"></div>
      <div class="input-form">
        <div class="close-button">
          <!--<i></i>-->
        </div>

        <div class="input-name">
          <span class="input-head">角色名称：</span>
          <div class="prizes-name1">
            <el-input
              placeholder="请输入角色名称"
              v-model="roleName"
            >
            </el-input>
          </div>
        </div>

        <div class="input-name">
          <span class="input-head">角色状态：</span>
          <div class="prizes-name1">
            <el-select v-model="status" placeholder="请输入角色状态" clearable>
              <el-option
                v-for="item in statusArray"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>


        <div class="input-name">
          <span class="input-head">菜单权限：</span>
          <div class="prizes-name1" style="vertical-align: top;height: 227px;overflow-y: scroll;">
            <el-tree
              :data="treeData"
              :show-checkbox ="true"
              node-key="menu_ky"
              ref="tree"
              :default-expanded-keys="checkNode"
              :default-checked-keys="checkNode"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>

        <div class="error-tip"><span>{{errorTip}}</span></div>
        <div class="sure-button">
          <span class="save" style="margin-right: 20px;"><el-button type="danger" @click="clearRight()">清空</el-button></span>
          <span class="save" style="margin-right: 20px;"><el-button type="primary" @click="modRight">修改</el-button></span>
          <span class="save"><el-button type="info" @click="modDialog = false;treeData=[]">取消</el-button></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        errorTip:"",
        modDialog:false,
        treeData:[],
        checkNode:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id:'level'
        },
        roleId:"", //	角色id
        localRole:"", //本地角色ID
        roleCode:"", //角色编码
        roleName:"", //角色名称
        status:"", //角色状态（0：不可用，1：可用）
        statusArray:[
          {type:0,name:'不可用'},
          {type:1,name:'可用'},
        ],
        remark:"", //角色备注
        menuKys:"", //菜单权限(中间用英文逗号“,”隔开，如：164,165,166)
        userId:"" //系统用户ID
      }
    },
    //调用
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.localRole = JSON.parse(user).role;
      this.getQry();
    },
    methods: {
      clearRight(){
        this.$refs.tree.setCheckedKeys([]);
      },
      //编辑权限
      editRight(row){
        this.roleId = row.id;
        this.roleCode = row.role_code;
        this.roleName = row.role_name;
        this.status = row.status;
        this.remark = row.remark;
        this.getRight();
      },
      //修改权限
      modRight(){
        this.menuKys ="";
        let check_node = this.$refs.tree.getCheckedNodes();
        for(let i in check_node){
          this.menuKys = this.menuKys + check_node[i].menu_ky + ','
        }
        let vm = this;
        if(this.roleName == ""){
          this.errorTip = "角色名称不能为空";
          return false;
        }else if(this.status == ""){
          this.errorTip = "角色状态不能为空";
          return false;
        }
        this.$http.post('/chan/role/updateRoleInfo.do', {
          userId: this.userId,
          roleId:this.roleId,
          roleCode: this.roleCode,
          roleName: this.roleName,
          status: this.status,
          remark: this.remark,
          menuKys: this.menuKys,
        }).then(function (res) {

          if(res.data.success){
            vm.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                vm.getQry();
                vm.modDialog = false;
                if( vm.localRole == vm.roleId){ //如果修改自己的权限就刷新
                  vm.$router.go(0);
                }
              }
            });
          }
        }).catch(function (err) {

        })
      },
      getRight(){
        let vm = this;
        this.$http.post('/chan/menu/getMenuTreeByRole.do', {
          userId: this.userId,
          roleId:this.roleId
        }).then(function (res) {
          vm.modDialog = true;
          vm.treeData = res.data.data.list;
          vm.checkNode = res.data.data.menuKyList;
        }).catch(function (err) {

        })
      },
      getQry(){
        let vm = this;
        this.$http.post('/chan/role/getAllChanRoleList.do', {
          userId: this.userId,
        }).then(function (res) {
          let tableData = res.data.data;
          for(let i in tableData){
            tableData[i].status1 = tableData[i].status == 0? '不可用':'可用';
          }
           vm.tableData = tableData;
        }).catch(function (err) {

        })
      }
    }
  }
</script>

<style scoped lang="less">
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
