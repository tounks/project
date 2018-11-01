<template>
  <div>
    <div class="common-head" v-show="isShow" >
      <i @click="back()"></i>
      <span>{{title}}</span>
    </div>
    <div class="common-bottom"></div>
  </div>
</template>

<script>
  export default {
    name: 'common-title',
    props: {
      title: {
        type: String,
        default: ''
      },
      isShow:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {

      };
    },
    computed: {

    },
    methods: {
      //返回上一页
      back:function () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .common-head {
    height: 3.40741rem;
    background: #FFFFFF;
    color: #333333;
    width: 100%;
    max-width: 750px;
    position: relative;
  }
  .common-bottom{
    height: 0.4rem;
    background-color: #eee;
  }
  .common-head i{
    z-index: 5;
    width: 1rem;
    height: 1.9rem;
    display: block;
    position: absolute;
    background-image: url(../../assets/icon_left.png);
    background-size: cover;
    top: 50%;
    left: 2rem;
    transform: translate(0,-50%);
    -webkit-transform: translate(0,-50%);
    -o-transform: translate(0,-50%);
    -moz-transform: translate(0,-50%);
  }
  .common-head span{
    text-align: center;
    font-size: 1.28rem;
    line-height: 3.40741rem;
    position: absolute;
    width: 100%;
  }
</style>
