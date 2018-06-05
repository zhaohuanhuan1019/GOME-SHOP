/*
 * @Author: zhaoye 
 * @Date: 2018-01-17 13:35:35 
 * @Last Modified by: lixiaohu
 * @Last Modified time: 2018-03-07 11:32:15
 */
<script>
import Vue from 'vue'
import CTitle from '../common/title.vue'
import axios from 'axios'
export default {
    props: ['data', 'isAveragePlacement'],
    components: {
        CTitle,
    },
    data () {
        return {
            curIdx: 0,
        }
    },
    computed: {
        tagNameList () {
            return this.data[this.data.templetCode].tagGoodsList.map((item, index) => {
                return {
                    title: item.tagName,
                    isActive: this.curIdx == index ? true : false,
                }
            })
        },
        templetData() {
            return this.data[this.data.templetCode];
        }
    },
    methods: {
        onActive (index) {
            this.curIdx = index
            this.getTagGoodsList()
        },
        async getTagGoodsList () {
            if (!this.templetData.tagGoodsList[this.curIdx].goodsList) {
                var templetIdx = this.curIdx
                var params = {
                    keyProms: 'channeloaSju39TFLM',
                    templetId: this.data.templetId,
                    moduleId: this.templetData.tagGoodsList[this.curIdx].moduleId,
                    templetIdx: this.data.templetIdx,
                    listIdx: this.curIdx,
                    "provinceId":"",
                    "cityId":"",
                    "isHybrid":1
                }
                var data = await axios({
                    url: '/mobile/promotion/promscms/pagePromscms.jsp',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: 'body=' + JSON.stringify(params)
                })
                Vue.set(this.data.tagGoodsListTemplet.tagGoodsList[templetIdx], 'goodsList', data.data.goodsList)
            }
        }
    },
    created() {
        this.getTagGoodsList();
    }
}
</script>
