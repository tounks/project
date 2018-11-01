<template>
  <div>
    <div>
       <div class="main_top">
        <div class="main_left">
          <img src="../image/LOGO.png" />
          <span>聪明钱渠道管理后台</span>
        </div>
        <div class="main_right">
          <span>您好！</span>
          <img src="../image/LOGO.png" />
          <span>{{name}}</span>
          <span class="modPass" @click="modPass()">修改密码</span>
          <span class="modPass" @click="exit()">安全退出</span>
        </div>
      </div>
    </div>

    <div class="navMenu v-cloak" v-cloak>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="isRouter"
          background-color="#545c64"
          text-color="#fff"
          :default-active="routerChange()"
          active-text-color="#ffd04b">

          <div v-for="(item,index) in sysMenuList" >
            <el-menu-item :index="item.url" v-if="item.children.length ==0 && item.checked">
              <i :class="iconClass[index]"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

            <el-submenu :index="'level_'+index" v-if="item.children.length >0 && item.checked">
              <template slot="title">
                <i :class="iconClass[index]"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <div v-for="(i,index) in item.children" style="padding-left: 15px;">
                  <el-menu-item  :index="i.url"  v-if="i.children.length == 0 && i.checked">{{i.name}}</el-menu-item>
                  <el-submenu v-if="i.children.length >0 && i.checked" index="8-5">
                    <template slot="title">{{i.name}}</template>
                    <el-menu-item :index="la.url" v-for="(la,index) in i.children" v-if="la.checked" :key="'la_'+index">{{la.name}}</el-menu-item>
                  </el-submenu>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </div>

          <!--<el-menu-item index="/mainMenu/mainPage" class="elem-menu">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">首页</span>-->
          <!--</el-menu-item>-->

          <!--<el-menu-item index="/mainMenu/teamManage">-->
            <!--<i class="el-icon-document"></i>-->
            <!--<span slot="title">团队管理</span>-->
          <!--</el-menu-item>-->

          <!--<el-submenu index="2" >-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-date"></i>-->
              <!--<span>数据明细</span>-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
              <!--<el-menu-item index="/mainMenu/userCount" >用户明细</el-menu-item>-->
              <!--<el-menu-item index="/mainMenu/investDetail">投资明细</el-menu-item>-->
              <!--<el-menu-item index="/mainMenu/rechargeDetail">充值明细</el-menu-item>-->
              <!--<el-menu-item index="/mainMenu/withdrawDetail">提现明细</el-menu-item>-->
            <!--</el-menu-item-group>-->
          <!--</el-submenu>-->

          <!--<el-menu-item index="/mainMenu/activityManage">-->
            <!--<i class="el-icon-rank"></i>-->
            <!--<span slot="title">活动管理</span>-->
          <!--</el-menu-item>-->

          <!--<el-menu-item index="/mainMenu/areaSetting" >-->
            <!--<i class="el-icon-plus"></i>-->
            <!--<span slot="title">区域划分</span>-->
          <!--</el-menu-item>-->

          <!--<el-menu-item index="/mainMenu/personManage" >-->
            <!--<i class="el-icon-circle-check"></i>-->
            <!--<span slot="title">人员管理</span>-->
          <!--</el-menu-item>-->

          <!--<el-menu-item index="/mainMenu/channelMange" >-->
            <!--<i class="el-icon-sold-out"></i>-->
            <!--<span slot="title">渠道管理</span>-->
          <!--</el-menu-item>-->

          <!--<el-menu-item index="/mainMenu/channelCount" >-->
            <!--<i class="el-icon-sold-out"></i>-->
            <!--<span slot="title">渠道统计</span>-->
          <!--</el-menu-item>-->

          <!--<el-submenu index="3" >-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-date"></i>-->
              <!--<span>系统管理</span>-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
              <!--<el-menu-item index="/mainMenu/rightManage" >权限管理</el-menu-item>-->
              <!--<el-menu-item index="/mainMenu/modPassword">修改密码</el-menu-item>-->
            <!--</el-menu-item-group>-->
          <!--</el-submenu>-->

        </el-menu>
    </div>

    <div class="main_content">
      <!--<label for="img-upload">上传照片</label>-->
      <!--<img-upload  @imgSrc="getImg" :large-show="dialogShow" @closeShow="dialogShow= false" ></img-upload>-->
      <router-view/>
    </div>

    <div class="clearFloat"></div>

  </div>
</template>

<script>

  export default {
    data () {
      return {
        isRouter: true,
        img:"",
        name:"", //管理员名字
        userId:"",
        roleKy:0, //角色key
        sysMenuList:[], //菜单权限列表
        dialogShow:true,
        iconClass:['el-icon-document','el-icon-setting','el-icon-rank','el-icon-plus','el-icon-circle-check','el-icon-sold-out',
          'el-icon-date','el-icon-circle-plus','el-icon-edit',''],
      }
    },
    created(){
      if(!localStorage.getItem("ngStorage-ditch")){
        this.$router.push("/login");
        return;
      }
    },
    mounted(){
      var user = localStorage.getItem("ngStorage-ditch");
      this.userId = JSON.parse(user).id;
      this.name = JSON.parse(user).username;
      this.getMenuRights();
    },
    methods: {
      //修改密码
      modPass(){
        this.$router.push("/mainMenu/modPassword")
      },
      routerChange(){
        let path = "";
        this.$nextTick(function () {  //解决IE浏览器下UI出现的缺陷
          $('.el-table__header,.el-table__body').css('width','100%');
          $('.el-table td, .el-table th').css('padding','6px 0');
          $('.el-menu-item-group .el-menu-item,.el-menu-item-group .el-submenu__title').css('color','rgb(186, 174, 170');
          $('.el-menu-item-group .el-menu-item.is-active').css('color','rgb(255, 208, 75)');
        })
        if(this.$route.path.indexOf('teamDetail')>0){
          path = '/mainMenu/teamManage'
        }else if(this.$route.path.indexOf('userDetail')>0){
          path = '/mainMenu/userCount'
        }else {
          path = this.$route.path;
        }
        return path;
      },
      //获取菜单权限
      getMenuRights(){
        let vm = this;
        this.$http.post('/chan/menu/getChanSysMenuGradeOne.do',{
          userId: this.userId,
        }).then(function(res){
          vm.sysMenuList = res.data.data;
        }).catch(function(err){

        })
      },
      //退出
      exit(){
        let vm = this;
        this.$http.post('/chan/chanUsers/logout.do',{
          userId: this.userId,
        }).then(function(res){
          localStorage.removeItem('ngStorage-ditch');
          vm.$router.push('/login');
        }).catch(function(err){

        })
      },
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .el-submenu .el-menu-item{
    min-width: 0;
  }
   .main_top{
     width: 90.6%;
      height: 3rem;
      border-bottom: 1px solid #CCC;
      min-width: 800px;
     .main_left{
       float: left;
       font-size: 1.12rem;
       font-weight: bold;
       margin-top: .5rem;
       margin-left: 0.5rem;
       img{
         display: inline-block;
         width: 2rem;
         height: 2rem;
         vertical-align: bottom;
       }
     }
     .main_right{
       float: right;
       font-size: 14px;
       margin-top: 1rem;
       margin-left: 0.5rem;
       img{
         display: inline-block;
         width: 1rem;
         height: 1rem;
         vertical-align: bottom;
         border-radius: 1rem;
       }
       .modPass{
         background-color: #CCC;
         height: 22px;
         width: 79px;
         display: inline-block;
         margin: 0 10px;
         text-align: center;
         cursor: pointer;
       }
     }
   }
   .navMenu{
     width: 10.6%;
     text-align: left;
     display: inline-block;
     float: left;
     overflow: hidden;
     min-width: 150px;
   }
   .main_content{
     float: left;
     display: inline-block;
     width: 80%;
     margin-left: 1%;
     margin-top: 0.5rem;
     min-width: 800px;
   }
  .clearFloat{
    clear: both;
  }
</style>
