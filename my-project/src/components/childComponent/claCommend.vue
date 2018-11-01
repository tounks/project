<template>
  <div class="claCommend-wrapper">
    <div class="commend_title">理财推荐</div>
    <swiper :options="swiperOption" ref="mySwiper"  @click.native="slideClicked(swiper.activeIndex)" class="swiper-no-swiping">
      <swiper-slide v-for="(item,key) in cpList" :key="key">
        <div class="check">
          <p v-show="active == key" style="font-size: 0.8rem">预期年化</p>
          <div class="checkRate"><span class="rate">{{Math.floor(item.rate*10)/10}}</span>%+{{Math.floor(item.activityRate*10)/10}}%</div>
          <p class="deadline" v-show="active == key">锁定期 : {{item.deadline}}天</p>
        </div>
        <div  v-show="active == key">
          <p class="fullName">{{item.fullName}}</p>
          <p class="surplusAmount">(剩余可投{{item.surplusAmount}}元)</p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
    <div class="investment" @click="invest()">
      立即投资
    </div>
</div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 3,
          onSlideChangeEnd: swiper => {
              //这个位置放swiper的回调方法
              this.page = swiper.realIndex+1;
              this.index = swiper.realIndex;
              console.log(this.page)
              console.log(swiper.activeIndex)
          },
        },
        cpList: [],
        active:'',
      }
    },
    components:{
      swiper,
      swiperSlide
  },
  mounted(){
    this.getList();
    console.log(this.swiper.realIndex)
    this.swiper.slideTo(0, 1000, false)
    if($(this.$refs.mySwiper).is(":animated")){    //判断元素是否正处于动画状态

    }else {
      $('.swiper-wrapper').css('margin-left','-10px')
    }
  },
  computed: {
     swiper() {
       return this.$refs.mySwiper.swiper
     }
  },
  // updated() {
  //   this.swiper.slideTo(0, 1000, false)
  // },
  methods:{
    getList(){
      var vm = this
      this.axios.post('/product/list.dos',{
        'status':5,
        'pageSize':30,
        'version':'1.0.0',
        'channel':3
      }).then(function(res){
        vm.cpList = res.data.map.page.rows;
        console.log(vm.cpList)
      }).catch(function(err){
        console.log(err)
      })
    },
    slideClicked(val){
      this.active = val;
      if(val == 0){
        $('.swiper-wrapper').css('margin-left','-10px')
      }else {
        $('.swiper-wrapper').css('margin-left','-5px')
      }

    },
    invest(){
      console.log(this.swiper.realIndex)
      console.log(this.active)
      console.log(this.cpList[this.active])
        if(this.cpList[this.active] == undefined){
          window.location.href = '/cpDetail?from=littleGold&pid=' + this.cpList[0].id
        }else{
          window.location.href = '/cpDetail?from=littleGold&pid=' + this.cpList[this.active].id
        }
        // window.location.href = '/main/bankBillList'
    }
  }
}
</script>
<style scoped lang="scss">
  .claCommend-wrapper{
    text-align: center;
    font-size: 1rem;
    margin-top: 2.5rem;
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }
  .commend_title{
    font-size: 1.3rem;
    color: #33cacc;
    padding: 1rem 0;
    display: inline-block;
    width: 100%;
    border-radius: 2rem 2rem 0 0;
    background: #fff;
    font-weight: bold;
  }
  .swiper-container{
    width: 100%;
    background:#fff;
    color: #fff;
    height: 22rem;
    border-radius:0 0 2rem 2rem;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  .swiper-wrapper{
      margin-left: -24px !important;
  }
  .swiper-slide-active{
    background:url("../../assets/claChecked.png") center center no-repeat!important;
    background-size:100%;
    width: 10rem!important;
    height: 10rem!important;
    border-radius:0.5rem;
    margin-top: 2rem!important;
    p{
      padding:0.5rem 0;
    }
    .checkRate{
      border-bottom:1px dashed #fff;
      height: 5rem;
      line-height: 5rem;
      .rate{
        font-size: 2rem;
      }
    }
    p.deadline{
      line-height: 2rem;
      font-size: 0.8rem;
    }
  }
  .swiper-slide{
    background:url("../../assets/claCheck.png") center center no-repeat;
    height: 5.5rem;
    width:5.5rem;
    margin-top: 6.5rem;
  }
  .swiper-slide-next{
    margin-left:1rem;
    margin-right:1rem;
    line-height: 5.5rem;
    width: 5.5rem!important;
  }
  .swiper-slide-prev{
    margin-right:1rem;
    margin-left:1rem;
    line-height: 5.5rem;
    width: 5.5rem!important;
  }
  .swiper-button-next{
    right: 4rem;
    top: 70%;
    background-image:url(../../assets/right_next.png);
    background-size:1rem;
  }
  .swiper-button-prev{
    left: 4rem;
    top: 70%;
    background-image:url(../../assets/left_prve.png);
    background-size:1rem;
  }
  .swiper-wrapper{
    justify-content: center
  }
  .fullName{
    color: #33cacc;
    background:#fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.12rem;
    font-weight: bold;
    padding: 1.2rem 0 0 !important;
  }
  .surplusAmount{
    color: #999999;
    background:#fff;
    font-size: 0.8rem;
    padding: 0 !important;
  }
  .investment{
    display: inline-block;
    width: 50%;
    background-color: #ff6937;
    border-radius: 2rem;
    position: absolute;
    bottom:3rem;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    z-index: 9;
    left: 27%;
  }

</style>

