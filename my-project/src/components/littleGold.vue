<template>
  <div class="littleGold-wrapper">
    <div id="xw-3d-parent">
      <div class="AI-title-wrapper">
        <div class="AI-title">
           <div class="title-left"  @click="back()"><img src="../assets/icon_left.png">返回</div>
           智能机器人
        </div>
        <div class="AI-day">
          <div class="day">

            已培育<span class="dayDetail">{{days}}</span>天
          </div>
        </div>
        <div class="five-content">
          <div class="fir-content">
            <div>
              <img src="../assets/record.png" @click="born()">
              <p>出生档案</p>
            </div>
            <div>
              <img src="../assets/m_commend.png" @click="redPacket()">
              <p style="padding-right: 0.2rem;">理财推荐</p>
            </div>
            <div>
              <img src="../assets/appraisal.png" @click="risk()">
              <p style="padding-right: 0.2rem;">风险评测</p>
            </div>
          </div>
          <div class="mid-content">
            <div>
              <img :src="picUrl" @click="redEveryday()">
              <p>
                每日红包
              </p>
            </div>
            <div>
              <img src="../assets/red_voice.png"  @click="packetVioce()">
              <p>
                红包口令
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="AI-move">
      <div class="AI-name" @click="dialogVisible = true">
        <span class="name">{{name}}</span>
      </div>
      <div class="move">
        <div id="TouchHead">
          <img src="../assets/sprout.png">
          <p>卖萌</p>
        </div>
        <div id="TouchFace">
          <img src="../assets/kiss.png">
          <p>亲亲</p>
        </div>
        <div id="TouchYouShou">
          <img src="../assets/coquetry.png">
          <p>撒娇</p>
        </div>
        <div id="TouchShenTi">
          <img src="../assets/vioce.png">
          <p>说话</p>
        </div>
        <div id="TouchYouJiao">
          <img src="../assets/dance.png">
          <p>跳舞</p>
        </div>
      </div>
    </div>
    <my-dialog @openDialog="dialogVisible = true" @closeDialog="dialogVisible = false" :is-show="dialogVisible">
      <born-reord></born-reord>
      <span slot="footer" class="dialog-footer">
        <!-- <button class="confirm" @click="addFollow()">确定</button> -->
      </span>
    </my-dialog>
    <my-dialog @openDialog="dialogredPacket = true" @closeDialog="dialogredPacket = false" :is-show="dialogredPacket">
      <cla-commend></cla-commend>
      <span slot="footer" class="dialog-footer">
        <!-- <button class="confirm" @click="addFollow()">确定</button> -->
      </span>
    </my-dialog>

    <my-dialog @openDialog="dialogExchange = true" @closeDialog="dialogExchange = false" :is-show="dialogExchange">
      <exchange></exchange>
      <span slot="footer" class="dialog-footer">
      </span>
    </my-dialog>

    <my-dialog @openDialog="dialogRiskProtocol = true" @closeDialog="dialogRiskProtocol = false" :is-show="dialogRiskProtocol" :show-close="false">
      <risk-protocol></risk-protocol>
    </my-dialog>

    <my-dialog @openDialog="dialogExchangeAward = true" @closeDialog="dialogExchangeAward = false" :is-show="dialogExchangeAward">
      <exchange-award></exchange-award>
    </my-dialog>

    <my-dialog @openDialog="dialogeveryRed = true" @closeDialog="dialogeveryRed = false" :is-show="dialogeveryRed" :show-close="false">
      <every-red></every-red>
    </my-dialog>


  </div>


</template>

<script>
  import MyDialog from './commons/dialog'
  import bornReord from './childComponent/bornRecord'
  import claCommend from './childComponent/claCommend'
  import exchange from './childComponent/exchange'
  import riskProtocol from './childComponent/riskProtocol'
  import everyRed from './childComponent/everyRed'
  import exchangeAward from './childComponent/exchangeAward.vue'
  import {mapActions} from 'vuex'

  export default {
    name: 'littleGold',
    data () {
      return {
        dialogVisible: false, //添加的弹框
        dialogredPacket: false, //添加的弹框
        dialogExchange:false,    //兑换弹框开启
        dialogRiskProtocol: false , //风险测试协议
        dialogExchangeAward:false, //兑换奖品弹框
        dialogeveryRed:false,//每日红包
        picUrl:'./static/hint_red.png',
        everydayPacket:true,
        name:'',//名字
        days:'',//领养的天数
        isBagin:false,
        cpList:[],
      }
    },
    components: {
      MyDialog,
      bornReord,
      claCommend,
      exchange,  //兑换组件
      riskProtocol, //风险协议
      exchangeAward, //兑换奖励
      everyRed
    },
    mounted() {
      this.iforNot()
      this.getTheName()
      this.getList();
      XW3DCtrl.XW3DInit({
        xw3dSceneDom:'xw-3d-parent',
      });
      var loginSound = document.getElementById('dodo3d_loginSound_music');
      var zhaohu = document.getElementById('dodo3d_maimeng_music');
      var myAudio = document.getElementById('dodo3d_qinqin_music');
      var maimeng = document.getElementById('dodo3d_sajiao_music');
      var shuohua = document.getElementById('dodo3d_shuohua_music');
      var tiaowu = document.getElementById('dodo3d_tiaowu_music');
      var dazhaohu = document.getElementById('dodo3d_zhaohu_music');
      // 加载3D场景时 是否 加载入场动画（默认为true）
      XW3DCtrl.XW3DConfig.XW3DIsLoadedRuChangAni = false;
      this.isBagin = false
      var vm = this
      document.addEventListener("WeixinJSBridgeReady", function() {
              // 加载3D场景时 是否 加载入场动画（默认为true）
            XW3DCtrl.XW3DConfig.XW3DIsLoadedRuChangAni = true;
              vm.isBagin = true
              loginSound.play()
              myAudio.play()
              zhaohu.play()
              maimeng.play()
              shuohua.play()
              tiaowu.play()
              dazhaohu.play()
              setTimeout(function(){
                myAudio.pause()
                zhaohu.pause()
                maimeng.pause()
                shuohua.pause()
                tiaowu.pause()
                dazhaohu.pause()
              },100)

      }, false);
      XW3DCtrl.XW3DConfig.XW3DIsLoadedAudio = true

    XW3DCtrl.OnAniEndedRuChang = function(){
        vm.isBagin = false
        console.log("入场动画播放完成");
    };

    XW3DCtrl.TouchCallBackDaHongBao = function(){
        console.log("点击大红包完成");
    };

    if(zhaohu){
          zhaohu.loop = false;
          zhaohu.addEventListener('playing', function (val) {  
                  console.log(this)
                  vm.isBagin = true
          }, false);
    }
    // 重定义“卖萌”动画开始的回调
    XW3DCtrl.OnAniStartedMM = function(){
        zhaohu.muted = false
        if(vm.isBagin){
          return 
        }else{
         zhaohu.play()
        }
        console.log("“卖萌”动画开始");
    };
    // 重定义“卖萌”动画结束的回调
    XW3DCtrl.OnAniEndedMM = function(){
        vm.isBagin = false
        console.log("“卖萌”动画结束");
    };
    // 卖萌.1
    $('#TouchHead').click(function(){
        zhaohu.muted = false
        if(vm.isBagin){
          return 
        }else{
         zhaohu.play()
        }
        window.magicFunc.TouchYouShou();
    });

    if(myAudio){
          myAudio.loop = false;
          myAudio.addEventListener('playing', function (val) {  
                  console.log(val)
                  vm.isBagin = true
          }, false);
    }
    // 重定义“亲亲”动画开始的回调
    XW3DCtrl.OnAniStartedQQ = function(){
        myAudio.muted = false
        if(vm.isBagin){
          return 
        }else{
         myAudio.play()
        }
        console.log("“亲亲”动画开始");
    };
    // 重定义“亲亲”动画结束的回调
    XW3DCtrl.OnAniEndedQQ = function(){
        vm.isBagin = false
        console.log("“亲亲”动画结束");
    };
    //亲亲 1.0
    $('#TouchFace').click(function(){
        myAudio.muted = false
        if(vm.isBagin){
          return 
        }else{
         myAudio.play()
        }
        window.magicFunc.TouchZouShou();
    });

    if(maimeng){
          maimeng.loop = false;
          maimeng.addEventListener('playing', function (val) {  
                  console.log(val)
                  vm.isBagin = true
          }, false);
    }
    // 重定义“撒娇”动画开始的回调
    XW3DCtrl.OnAniStartedSJ = function(){
        console.log("“撒娇”动画开始");
        maimeng.muted = false
        if(vm.isBagin){
          return 
        }else{
          maimeng.play()
        }
    };
    // 重定义“撒娇”动画结束的回调
    XW3DCtrl.OnAniEndedSJ = function(){
        vm.isBagin = false
        console.log("“撒娇”动画结束");
    };

    $('#TouchYouShou').click(function(){
        maimeng.muted = false
        if(vm.isBagin){
          return 
        }else{
          maimeng.play()
        }
        window.magicFunc.TouchFace();
    });
    // // 点击左手
    // $('#TouchZouShou').click(function(){
    //     window.magicFunc.TouchZouShou(function(){
    //         console.log("点击左手“亲亲”动画播放完成");
    //     });
    // });
    // 点击身体
    if(shuohua){
          shuohua.loop = false;
          shuohua.addEventListener('playing', function (val) {  
                  console.log(val)
                  vm.isBagin = true
          }, false);
    }

    // 重定义“说话”动画开始的回调
    XW3DCtrl.OnAniStartedSH = function(){
        shuohua.muted = false
        console.log("“说话”动画开始");
        if(vm.isBagin){
          return 
        }else{
          shuohua.play();
        }
    };
    // 重定义“说话”动画结束的回调
    XW3DCtrl.OnAniEndedSH = function(){
        vm.isBagin = false
        console.log("“说话”动画结束");
    };
    $('#TouchShenTi').click(function(){
        shuohua.muted = false
        if(vm.isBagin){
          return 
        }else{
          shuohua.play();
        }
        window.magicFunc.TouchYouJiao();
    });
    if(tiaowu){
          tiaowu.loop = false;
          tiaowu.addEventListener('playing', function (val) {  
                  console.log(val)
                  vm.isBagin = true
          }, false);
    }
    // 重定义“跳舞”动画开始的回调
    XW3DCtrl.OnAniStartedTW = function(){
        tiaowu.muted = false
        if(vm.isBagin){
          return 
        }else{
          tiaowu.play();
        }
        console.log("“跳舞”动画开始");
    };
    // 重定义“跳舞”动画结束的回调
    XW3DCtrl.OnAniEndedTW = function(){
        vm.isBagin = false
        console.log("“跳舞”动画结束");
    };
    // “跳舞”
    $('#TouchYouJiao').click(function(){
        tiaowu.muted = false
        if(vm.isBagin){
          return 
        }else{
          tiaowu.play();
        }
        window.magicFunc.TouchShenTi();
    });
    if(dazhaohu){
          dazhaohu.loop = false;
          dazhaohu.addEventListener('playing', function (val) {  
                  console.log(val)
                  vm.isBagin = true
          }, false);
    }
    // 重定义“打招呼”动画开始的回调
    XW3DCtrl.OnAniStartedDZH = function(){
        dazhaohu.muted = false
        if(vm.isBagin){
          return 
        }else{
          dazhaohu.play();
        }
        console.log("“打招呼”动画开始");
    };
    // 重定义“打招呼”动画结束的回调
    XW3DCtrl.OnAniEndedDZH = function(){
        vm.isBagin = false
        console.log("“打招呼”动画结束");
    };
    var sahongB = document.getElementById('dodo3d_sahongbao_music')
    if(sahongB){
      sahongB.loop = false;
      sahongB.addEventListener('playing', function (val) {  
              console.log(val)
              vm.isBagin = true
      }, false);
    }
    XW3DCtrl.OnAniStartedSHB =function(){
        sahongB.muted = false
    }
    XW3DCtrl.OnAniEndedSHB = function(){
      vm.isBagin = false
      vm.dialogVisible = false;
      vm.dialogredPacket = false; //添加的弹框
      vm.dialogExchange = false;    //兑换弹框开启
      vm.dialogRiskProtocol = false; //风险测试协议
      vm.dialogExchangeAward = false; //兑换奖品弹框
      vm.dialogeveryRed = false;//每日红包
      vm.dialogeveryRed = true
    };

    },
    methods: {
      getList(){
        var vm = this
        this.axios.post('/product/list.dos',{
          'status':5,
          'pageSize':30,
          'version':'1.0.0',
          'channel':3
        }).then(function(res){
          vm.cpList = res.data.map.page.rows;
          // console.log(vm.cpList)
        }).catch(function(err){
          console.log(err)
        })
      },
      back(){
        window.location.href = '/main/home'
      },
      getTheName(){
        var vm = this
        this.axios.post('/pet/info.dos',{
          'uid':JSON.parse(localStorage.getItem("ngStorage-user")).member.uid,
          'token':JSON.parse(localStorage.getItem("ngStorage-user")).token,
        }).then(function(res){
            vm.name = res.data.map.nickname
            vm.days = res.data.map.days
        }).catch(function(err){
          console.log(err)
        })
      },
      born(){
        console.log(1)
          this.dialogVisible = false;
          this.dialogredPacket = false; //添加的弹框
          this.dialogExchange = false;    //兑换弹框开启
          this.dialogRiskProtocol = false; //风险测试协议
          this.dialogExchangeAward = false; //兑换奖品弹框
          this.dialogeveryRed = false;//每日红包
          this.dialogVisible = true;
      },
      redPacket(){
        console.log(this.cpList)
        if(this.cpList.length == 0){
          this.showDialog1(true);
          this.netWorkError1('暂无理财推荐');
        }else{
          this.dialogVisible = false;
          this.dialogredPacket = false; //添加的弹框
          this.dialogExchange = false;    //兑换弹框开启
          this.dialogRiskProtocol = false; //风险测试协议
          this.dialogExchangeAward = false; //兑换奖品弹框
          this.dialogeveryRed = false;//每日红包
          this.dialogredPacket = true
        }
      },
      packetVioce(){
        console.log(3)
        this.dialogVisible = false;
        this.dialogredPacket = false; //添加的弹框
        this.dialogExchange = false;    //兑换弹框开启
        this.dialogRiskProtocol = false; //风险测试协议
        this.dialogExchangeAward = false; //兑换奖品弹框
        this.dialogeveryRed = false;//每日红包
        this.dialogExchange = true
      },
      risk(){
        this.dialogVisible = false;
        this.dialogredPacket = false; //添加的弹框
        this.dialogExchange = false;    //兑换弹框开启
        this.dialogRiskProtocol = false; //风险测试协议
        this.dialogExchangeAward = false; //兑换奖品弹框
        this.dialogeveryRed = false;//每日红包
        this.dialogeveryRed = false;//每日红包
        var vm = this;
        this.axios.post('/risk_evaluation/my_score.dos',{
          'version':'1.0.0',
          'channel':3,
          'uid':JSON.parse(localStorage.getItem("ngStorage-user")).member.uid,
          'token':JSON.parse(localStorage.getItem("ngStorage-user")).token,
        }).then(function(res){
            console.log(res.data.map)
            if(res.data.map.status!=0){
              vm.$router.push({ path: 'riskResult', query: { riskLevel: res.data.map.grade }})
            }else{
              vm.dialogRiskProtocol = true
            }
        }).catch(function(err){
          console.log(err)
        })
      },
      iforNot(){
        var vm = this
        this.axios.post('/gw/p2p/member/isSined.dos',{
          'uid':JSON.parse(localStorage.getItem("ngStorage-user")).member.uid,
          'token':JSON.parse(localStorage.getItem("ngStorage-user")).token,
        }).then(function(res){
            if(res.data.map.isSign == false){
              vm.picUrl = './static/hint_red.png'
              vm.everydayPacket = true
            }else{
              vm.picUrl = './static/red_packet.png'
              vm.everydayPacket = false
            }
        }).catch(function(err){
            if(err.data.map.isSign == false){
              vm.picUrl = './static/hint_red.png'
              vm.everydayPacket = true
            }else{
              vm.picUrl = './static/red_packet.png'
              vm.everydayPacket = false
            }
            vm.showDialog1(false);
        })
      },
      redEveryday(){
        var sahongB = document.getElementById('dodo3d_sahongbao_music')
        if(this.isBagin){
          return 
        }else{
          sahongB.play();
        }
        window.magicFunc.SaHongBao();
        // var vm = this
        // XW3DCtrl.OnAniEndedSHB = function(){
        //     vm.isBagin = false
        //     // console.log("“撒红包”动画结束");
        // };
      },
      ...mapActions({
        showDialog1: 'showDialog',
        netWorkError1: 'netWorkError'
      })

    }
  }
</script>

<style lang="scss" src="../css/littleGold.scss" scoped></style>

