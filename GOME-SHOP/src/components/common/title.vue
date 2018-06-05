<template>
    <div class="cms-module-title">
        <div v-if="data.backImgUrl || data.displayName">
            <div class="title pic" v-if="data.backImgUrl">
                <a :data-code="`${data.templetId}_title`" :href="data.scheme || 'javascript:;'">
                    <CImage :placeholder="placeholder" :src="data.backImgUrl"></CImage>
                </a>
            </div>
            <div class="title" :style="customStyle" v-else>
                <h2>{{data.displayName}}</h2>
                <a :data-code="`${data.templetId}_title`"  v-if="data.templetPromo" :href="data.scheme || 'javascript:;'" :style="customStyle">
                    {{data.templetPromo}}
                    <i></i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {CImage} from './image'
    export default Vue.extend({
        props:['data'],
        components:{
            CImage,
        },
        data (){
            return {
                placeholder:require('../images/default_bg.png'),
                customStyle:{
                    'background':'#fff',
                    'color':''
                }
            }
        },
        created(){
            if (this.data) {
                this.data.displayColor ? this.customStyle.color = this.data.displayColor : ''
                this.data.displayBackColor ? this.customStyle.background = this.data.displayBackColor : ''
            }
        }
    })
</script>
<style lang="scss">
// @import '~gome-ui-kit/components/less/var.less';
// @import '~gome-ui-kit/components/less/layout.less';
   .title{
        height:.86rem;
        line-height:.86rem;
        // .flexbox();
        position:relative;
        text-align:center;
        &.pic>a{
            width:100%;
            height:100%;
            margin-right:0;
            .gome-ui-img-container{
                height:100%;
                img{
                    height:100%;
                }
            }
        }
        h2{
            height:100%;
            line-height:.86rem;
            font-size:.32rem;
            margin-left:.2rem;
            // .flexitem(1);
        }
        a{
           font-size:.24rem;
           margin-right:.2rem;
           position: absolute;
            right: 0;
            top: 0;
           i{
             display:block;
             width:.24rem;
             height:.24rem;
             float:right;
             background:url(../images/more.png);
             background-size:100% 100%;
             margin-top:.3rem;
             margin-left:.08rem;
           }
        }
    }
</style>