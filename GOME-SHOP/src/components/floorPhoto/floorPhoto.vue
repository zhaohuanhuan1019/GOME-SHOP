<template>
    <div class="floor-photo-wrapper" v-if="this.data && this.data.floorPhotoTemplet">
        <CTitle :data="templetData"></CTitle>
        <div v-if="templetData.imgList.length <= 4" class="floor-photo-container">
            <div  class="pic" v-for="(item, index) in templetData.imgList" :key="index">
                <a :href="item.scheme" 
                   :data-code="`${data.templetId}_${index}`"
                >
                    <gui-image :placeholder="placeholder" :src="item.imageUrl" :alt="item.promsName"></gui-image>
                </a>
            </div>
        </div>
        <div v-else class="floor-photo-container no-flex">
            <div class="floor-photo-row">
                <div class="pic" :key="index" v-for="(item, index) in templetData.imgList.slice(0, templetData.imgList.length / 2)">
                    <a  :href="item.scheme"
                        :data-code="`${data.templetId}_${index}`"
                    >
                        <gui-image :placeholder="placeholder" :src="item.imageUrl" :alt="item.promsName"></gui-image>
                    </a>
                </div>
            </div>
            <div class="floor-photo-row">
                <div class="pic" :key="index" v-for="(item, index) in templetData.imgList.slice(templetData.imgList.length / 2, templetData.imgList.length)">
                    <a  :href="item.scheme"
                        :data-code="`${data.templetId}_${index + templetData.imgList.length / 2}`"
                    >
                        <gui-image :placeholder="placeholder" :src="item.imageUrl" :alt="item.promsName"></gui-image>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CTitle from '../common/title.vue'
    import guiImage from '../common/image.vue'
    export default {
        props: ['data', 'templetId'],
        components: {
            CTitle,
            guiImage
        },
        data (){
            return {
                placeholder: require('../images/default_bg.png'),
                defaultImg: 'data:image/gif;base64,R0lGODlhAwABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5ODc5MkU1OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5ODc5MkU2OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk4NzkyRTM5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTk4NzkyRTQ5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAAwABAAACAoQLADs=',
                content: null
            }
        },
        computed: {
            templetData () {
                //console.log(this.data);
                try {
                    return this.data.floorPhotoTemplet;
                } catch(e) { /* ignore */ }
                return undefined;
            } 
        }
    }
</script>
<style lang="less">
.flexbox() {
    display: -webkit-box;
    display: box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    &.h_center {
        -webkit-box-pack: center;
        -moz-box-pack: center;
        box-pack: center;
        justify-content: center;
        -webkit-justify-content: center;
    }
    &.v_center {
        &:not(.vertical){
            -webkit-box-align: center;
            -moz-box-align: center;
            box-align: center;
            align-items: center;
            -webkit-align-items: center;
        }

    }
    &.v_center.vertical {
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        box-orient: vertical;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        box-pack: center;
        justify-content: center;
        -webkit-justify-content: center;
        flex-direction: column;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
    }
    &.center {
        -webkit-box-align: center;
        -moz-box-align: center;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        box-align: center;
        box-pack: center;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
    }
    &.vertical {
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        box-orient: vertical;
        flex-direction: column;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
    }
    &.reverse{
        flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        -ms-direction: row-reverse;
        -webkit-box-direction: reverse;
        -moz-box-direction: reverse;
        box-direction: reverse;
    }
    &.stretch {
        align-content: stretch;
    }
}
.flexitem(@percent) {
    display: block;
    -webkit-box-flex: @percent;
    -moz-box-flex: @percent;
    -webkit-flex: @percent;
    flex: @percent;
    align-items: stretch;
    box-sizing: border-box;
}

    .floor-photo-container{
        &:not(.no-flex) {
            .flexbox();
        }
        .floor-photo-row {
            .flexbox();
        }
        .pic{
            .flexitem(1);
        }
    }

</style>