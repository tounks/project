<template>
  <div id="app">
    <!--<el-dialog-->
      <!--title="提示"-->
      <!--:visible="showDialog"-->
      <!--width="20%"-->
      <!--top="20%"-->
      <!--:show-close="false">-->
      <!--<span>{{netWorkError}}</span>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button type="primary" @click="closeButton()">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->

    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapActions,mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      loginDialog:false
    }
  },
  components: {

  },
  computed:{
    ...mapState({
      showDialog: state => state.showDialog,
      netWorkError: state => state.netWorkError,
      netWorkCode: state => state.netWorkCode
    })
  },
  mounted() {
     console.log(3333);
  },
  methods: {
    closeButton(){
      this.showDialog1(false);
    },
    ...mapActions({
      showDialog1: 'showDialog',
      netWorkError1: 'netWorkError',
      netWorkCode1:'netWorkCode'
    })
  },
  watch:{
    showDialog:function (curr,old) {
      let vm = this;
      if(curr){
        this.$alert(this.netWorkError, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            vm.showDialog1(false);
            if(vm.netWorkCode == '9998'){
              vm.netWorkCode1('');
              localStorage.removeItem('ngStorage-ditch');
              localStorage.removeItem('uid');
              vm.$router.push('/login');
            }
          }
        });
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1080px;
  width: 100%;
  height: 100%;
}
</style>
