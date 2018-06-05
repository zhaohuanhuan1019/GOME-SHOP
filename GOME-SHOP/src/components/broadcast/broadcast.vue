<template>
    <div class="gs-broadcast-box">
        <transition-group name="slide" tag="div">
            <div class="gs-broadcast" v-for="(item, index) in data" :key="index" v-show="index === curIdx">{{item}}</div>
        </transition-group>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array
        },
        time: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            curIdx: 0
        }
    },
    methods: {
        autoPlay () {
            setInterval(this.changeIndex, this.time);
        },
        changeIndex () {
            if (this.curIdx === this.data.length - 1) {
                this.curIdx = 0;
            } else {
                this.curIdx++;
            }
        }
    },
    mounted () {
        this.autoPlay();
    }
}
</script>
<style>
.gs-broadcast-box {
    font-size: .12rem;
    color: #5A6066;
    position: relative;
    overflow: hidden;
    height: 24px;
    text-align: center;
    background-color: #f3f5f7;
}
.gs-broadcast {
    width: 100%;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    position: absolute;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 1s;
}
.slide-enter {
    transform: translateY(.24rem)
}
.slide-enter-to, .slide-leave {
    transform: translateY(0)
}
.slide-leave-to {
    transform: translateY(-0.24rem)
}
/* .slide-enter-active, .slide-leave-active {
  transition: top 1s;
}
.slide-enter {
    top: .24rem;
}
.slide-enter-to, .slide-leave {
    top: 0;
}
.slide-leave-to {
    top: -0.24rem;
} */

</style>


