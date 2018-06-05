<template>
    <div class="goods-container" :class="className">
        <CTitle :data="data"></CTitle>
        <slot></slot>
    </div>
</template>
<script>
    // import templetStyle from '@base/comps/common/templet.mixin.vue'
    import CTitle from '../common/title.vue'
    export default {
        components: {
            CTitle,
        },
        // mixins: [templetStyle],
        props: ['data', 'className'],
        created () {
            // this.spacing = this.$store.state.data.templetList[this.templetId].goodsTemplet
        },
    }
</script>