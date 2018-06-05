<template>
    <div class="tag-goods-container" v-if="this.data && this.data.templetCode">
        <CTitle :data="templetData"></CTitle>
        <vu-tabs :isAveragePlacement="isAveragePlacement || true" :isSticky="true" :list="tagNameList" @click="onActive" sticky
        :class="{'one-tab-goods-list': tagCount <= 1}">
            <vu-tab v-for="(item, index) in templetData.tagGoodsList" :title="item.tagName" :key="index">
                <TrebleGoods
                    :data="item" 
                    :indexInTagList="index" 
                    :key="index"
                >
                    <template slot="mask" class="mask-container" slot-scope="{product, index}">
                        <slot :product="product" :index="index" :indexInTagList="index" name="mask"></slot>
                    </template>
                    <template slot="mask-bottom-bar" class="mask-bottom-bar-container" slot-scope="{product, index}">
                        <slot :product="product" :index="index" :indexInTagList="index" name="mask-bottom-bar"></slot>
                    </template>
                    <template class="tag-container" slot="tag" slot-scope="{product, index}">
                        <slot :product="product" :index="index" :indexInTagList="index" name="tag"></slot>
                    </template>
                    <template slot="content" slot-scope="{product, index}">
                        <slot name="content" :product="product" :index="index" :indexInTagList="index"></slot>
                    </template>
                </TrebleGoods>
                <div v-if="!templetData.tagGoodsList[curIdx].goodsList" class="tag-loading">
                    <vu-loading :isFixed="false"></vu-loading>
                </div>
            </vu-tab>
        </vu-tabs>
    </div>
</template>
<script>
import CTitle from '../common/title.vue'
import TrebleGoods from '../goods/trebleGoods.vue'
import mixin from './tagGoodsListMixin.vue'
export default {
    mixins: [mixin],
    components: {
        TrebleGoods,
    },
    //04.10:if price>0 then display
    created() {
        let i=0,m = this.data.tagGoodsListTemplet.tagGoodsList,
        status = false
        let ary = m.filter((item,index,ar)=>{
            let g = item.goodsList,status = false,i=0,l=g.length
            if(g.length){
                for(;i<l;i++){
                    if(parseFloat(g[i].goodsBean.customPrice)>0){
                        status = true
                        break
                    }
                }
                return status
            }else{
                return false
            }
        })
        //console.table(ary)
this.data.tagGoodsListTemplet.tagGoodsList = ary
    },
    computed: {
        tagCount () {
            if (!this.templetData) return 0
            console.log(this.templetData.tagGoodsList.length)
            return this.templetData.tagGoodsList.length
        }
    }
}
</script>
<style scoped lang="scss">
.tag-loading {
    .vu-loading {
        margin: .2rem auto;

    }
}
</style>
<style lang="scss">
.one-tab-goods-list {
    padding-top: 0!important;

    .vu-tabs__wrap {
        display: none!important;
    }
}
</style>

