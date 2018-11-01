<template>
  <transition name="dialog-fade">
    <div v-if="isShow" @click.self="handleWrapperClick">
      <div class="wrapper" ></div>
      <div
        class="dialog"
        :class="[sizeClass]"
        :style="style">
        <img class="close-btn" src="../../assets/dialog_close_btn.png" @click="close()" v-if="showClose"/>
        <div class="header">
          <span class="title">{{title}}</span>
          <div class="headerbtn">
            <i v-if="showClose" class="close" @click='close()'></i>
          </div>
        </div>

        <div class="body">
          <slot></slot>
        </div>

        <div class="footer" v-if="$slots.footer">
          <slot name="footer"></slot>
          <!--           <img class="bg-corner" src="../../assets/dialog_footer_corner.png"/> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'my-dialog',
    props: {
      title: {
        type: String,
        default: ''
      },
      modal: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'small'
      },
      customClass: {
        type: String,
        default: ''
      },
      top: {
        type: String,
        default: '15%'
      },
      isShow:{
        type:Boolean,
        default:false
      },
      showClose:{
        type:Boolean,
        default:true
      }
    },
    mounted(){
      $(window).scroll(function(){
        $('.wrapper').css('height','100%');
      });
    },
    data() {
      return {
        visible: this.isShow
      };
    },
    computed: {
      sizeClass() {
        return `${ this.size }`;
      },
      style() {
        return this.size === 'full' ? {} : { 'margin-bottom': '50px', 'top': this.top };
      }
    },
    methods: {
      handleWrapperClick() {
        this.close();
      },
      close(){
        this.$emit('closeDialog');
      },
      open(){
        this.$emit('openDialog');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.75);
  }

  .bg-corner{
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .close-btn{
    position: absolute;
    bottom: -5.2rem;
    width: 3rem;
    left:12rem;
  }

  .dialog{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    width: 100%;
    max-width: 750px;
    z-index: 999;
  }
  .close{
    cursor: pointer;
    color: #c0ccda;

    &:hover {
      color: #20a0ff;
    }
  }
  .title{
      line-height: 1;
      font-size: 16px;
      font-weight: bold;
      color: #1f2d3d;
  }
  .header {
    // padding: 20px 20px 0;
  }
  .body {
    // padding: 30px 20px;
    color: #475669;
    font-size: 14px;
  }
  .header-btn {
    float: right;
  }
  .footer {
    // background: url("../../assets/dialog_footer_corner.png") right bottom no-repeat;
    margin-bottom:28px;
    padding-right: 30px;
    text-align: right;
    box-sizing: border-box;
  }

  .dialog-fade-enter-active {
    animation: dialog-fade-in .3s;
  }
  .dialog-fade-leave-active {
    animation: dialog-fade-out .3s;
  }
  @keyframes dialog-fade-in {
    0% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes dialog-fade-out{
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }
</style>
