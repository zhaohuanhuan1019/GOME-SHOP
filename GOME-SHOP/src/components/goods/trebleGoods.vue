<template>
    <GoodsContainer :className="'treble-goods-container'" :data="data">
        <div 
            class="treble-goods-row"
            :key="index"
            v-for="(item, index) in data.goodsList"
        >
        <template v-if="item.goodsBean.customPrice>0"><!--04.10:if price>0 then display-->
            <gui-product
                :img="data.goodsList[index].goodsBean.skuThumbImgUrl"
                :href="data.goodsList[index].url || data.goodsList[index].scheme"
                :data-code="getDataCode(index)"
            >
                <div slot="mask" class="mask-container">
                    <slot :product="data.goodsList[index]" :index="index" name="mask"></slot>
                </div>
                <div slot="mask-bottom-bar" class="mask-bottom-bar-container">
                    <slot :product="data.goodsList[index]" :index="index" name="mask-bottom-bar"></slot>
                </div>
                <div v-if="data.goodsList[index].isTagShow" class="tag-container" slot="tag">
                    <slot :product="data.goodsList[index]" :index="index" name="tag"></slot>
                </div>
                <template slot="content">
                    <slot :product="data.goodsList[index]" :index="index" name="content"></slot>
                </template>
            </gui-product>
        </template>
        </div>
    </GoodsContainer>
</template>
<script>
import GoodsContainer from './goods.container.vue'
import guiProduct from './product'
export default {
    props: ['data', 'indexInTagList'],
    components: {
        GoodsContainer,
        guiProduct
    },
    methods: {
        getDataCode (index) {
            if (this.indexInTagList != undefined) {
                return `${this.$parent.$parent.$parent.data.templetId}_${this.data.moduleId}_${index}`
            } else {
                return `${this.data.templetId}_${index}`
            }
        }
    },
    created() {
    }
}
</script>
<style lang="less">
// @import "../product/product.less";
// @import "../product/verticalLayout.less";
// .treble-goods-container {
//     .set-product();
//     .v-layout();
//     .treble-goods-row {
//         .flexbox();
//     }
// }
.product {
        flex: 1;
        .container {
            &.img {
                .mask-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .tag-container {
                    position: absolute;
                    right: 0;
                }
                .mask-bottom-bar-container {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                }
            }
        }
    }
</style>
