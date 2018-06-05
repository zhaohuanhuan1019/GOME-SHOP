<template>
  <div style="overflow: hidden;background-color: #fff" v-if="this.data && this.data.templetCode">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in this.data.focusPhotoListTemplet" :key="index"><a :href="'//'+item.promsUrl"><img :src="item.imageUrl" alt=""></a></swiper-slide>
        
      </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props:['data'],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // loop: true,
        initialSlide :1,
        spaceBetween: 15
      }
    }
  },

}
</script>
<style>
.swiper-container {
  width: 2.2rem;
  overflow: visible !important;
  background-color: #fff;
}
.swiper-wrapper a {
    display: block;
}
.swiper-wrapper img{
    width: 100%;
}

</style>
