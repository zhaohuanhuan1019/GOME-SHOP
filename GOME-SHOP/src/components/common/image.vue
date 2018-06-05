<template>
    <div class="gome-ui-img-container" :class="logoSize" :init-width="w" :init-height="h">
        <img v-if="isProduct" :src='src' onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='">
        <img v-else :src="placeholder || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='" v-lazy="src">
    </div>
</template>
<script>
    import Vue from 'vue';
    import vui from 'vui';
    Vue.use(vui.Lazyload, {
        // loading: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAF3CAYAAAB5dDWiAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QcNECQx7ZYkpgAAA39JREFUeNrtwQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIcGvdoAAYNnJzgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDctMTNUMTY6MzY6NDkrMDg6MDCGgN5eAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA3LTEzVDE2OjM2OjQ5KzA4OjAw991m4gAAAE50RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi44LjktMTAgUTE2IHg4Nl82NCAyMDE2LTExLTI1IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jnb6jfkgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAOTAwcYL6iAAAABh0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxNDQwpFHP5wAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAPdEVYdFRodW1iOjpTaXplADBCQpSiPuwAAAASdEVYdFRodW1iOjpVUkkAZmlsZTovL8F3i88AAAAASUVORK5CYII='
        loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RENFM0UzNjkxRUM0MTFFODgzM0JDNEFCRTNFNTYwMTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RENFM0UzNkExRUM0MTFFODgzM0JDNEFCRTNFNTYwMTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0UzRTM2NzFFQzQxMUU4ODMzQkM0QUJFM0U1NjAxNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0UzRTM2ODFFQzQxMUU4ODMzQkM0QUJFM0U1NjAxNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvN0Sv8AAAARSURBVHjaYvr//z8DDAMEGAA+6Aj6yAOERAAAAABJRU5ErkJggg=='
    })
    export default Vue.extend({
        props: ['src', 'placeholder', 'width', 'height', 'isProduct'],
        data () {
            return {
                w: '',
                h: '',
                logoSize: 'no-logo',
            }
        },
        mounted () {
            this.$el.querySelector('img').addEventListener('load', this.imgLoaded)
            this.$el.querySelector('img').addEventListener('error', () => {
                setTimeout(() => {
                    this.imgLoaded()
                })
            })
        },
        methods: {
            imgLoaded () {
                const wh = window.getComputedStyle(this.$el)
                this.computeLogoSize(wh)
                // this.$el.querySelector('img').removeEventListener('load', this.imgFirstLoaded)
            },
            computeLogoSize (wh) {
                const width = wh.width.match(/(\d+(\.\d+)?)+px/)
                const height = wh.height.match(/(\d+(\.\d+)?)+px/)
                this.w = width ? width[1] : '' 
                this.h = height ? height[1] : '' 
                if (this.width) {
                    this.w = this.width.split('rem')[0] * 100
                }
                if (this.height) {
                    this.h = this.height.split('rem')[0] * 100
                }
                // 计算
                const dpr = document.documentElement.getAttribute('data-dpr') ? Number(document.documentElement.getAttribute('data-dpr')) : 1
                // 取短的一条边
                const shortEdge = this.w > this.h ? this.h : this.w
                // 最短的边小于100px（*dpr）时，不显示logo
                if (shortEdge < dpr * 100 / 2) {
                    this.logoSize = 'no-logo'
                } else if (shortEdge <= dpr * 260 / 2 && shortEdge >= dpr * 100 / 2) {
                    this.logoSize = 'small'
                } else if (shortEdge < dpr * 360 / 2 && shortEdge > dpr * 200 / 2) {
                    this.logoSize = 'middle'
                } else {
                    this.logoSize = 'big'
                }
            }
        }
    })
</script>
<style lang='scss'>
    // @import "../less/var.less";
    .gome-ui-img-container {
        background-color: #f4f4f4;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAh1BMVEUAAADh4eHm5ubh4eHs7Ozh4eHi4uLh4eHh4eHh4eHi4uLh4eH////h4eHl5eXh4eHh4eHi4uLj4+Pk5OTh4eHh4eHi4uLl5eXh4eHh4eHh4eHi4uLi4uLi4uLk5OTh4eHi4uLj4+Pr6+v////h4eHh4eHh4eHi4uLh4eHh4eHh4eHh4eHg4OAszPWnAAAALHRSTlMA7hC7CN1GQv33K78D6R7WY3sxKcWekhjjioRTTD03zXAkDAG0pZpdrqpsdgGj8RwAAANuSURBVHja7drZmqIwEAXgYhNowQ1bcF/avev9n28cK2hYHL+Zm0n6O/8VhqsjJqFSEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYK5x5/dSp6C/oKdvs14WMB+PDKSd7LPrcwkke0c5cFU9cskMyYfEq3CLmhiAjK+jZoqdiTqITtUbvkQXmLOLPReZTU56qZ7UZuYmfL6eOfO5+kfESNd/SEbWbqSw7UrYqbYeMt2SxfBVeokRbehjw3Z6MN+U7j15Yyf01Pe1kEsYJma7Ld1d64Sr3P0kTyNiITKemXEh/nnIz0oxlbEGmS988haPcH5LGk7ETmU4t7B8kButAGcvD/HwdbkCmq4bbRvyQfv2wcCPWuD8sHE2inxSuvqD4rpuX4axfUFq2Al8PN7V5K+iqn9ircBu5PrZ8ISsynSp4Lq/CLeV6rN+X+i72yXQdVchl7eHKJFHeKJK6ZDy/UOVa3gynP9pzQoobyMiczDdg4QzLWjVnIRVcL1Y/zLl7/zhQ2frmFwVEyZkf0uA3Rz1LEicuOUURsxJ/kA38PbeaknKNuMFZkh2+Ng439X0qhWuuOW/JGv7gEMSsC6a+Hr8z6TssonQ8M79Mrdu5TztqSuSWDesIAPwf+dHzvMuKdNvDbezQo6feYHrYe7r9lcwnO3i8pSe3kI2OSstxxDpr3i3V9rX29bzCJTHlVkMynsNiQqUNV8PNuFVqQQ/LYWVBYhRXw2URi+73ab7olEIbeqtOrZu4C7ga7qKqAAumWGs40U3o5sCiVonzjCzk8MOsLF2rZyjCpj8wtIWLQsrierhrWbnaSIWLZQFcy7UWblg2J22kwn3LoqKuhVs5+rNR2Ss4csnzW3oFqVdxMf9AVg/32AKcvBmuyTH/RFYLR8uobG+8CScseD/RwtEwkqbAm3A2zcFnOOqtVqst1cKpueh1KkYW/H1IC/emhXUmG70L9112eWz0LtyJbfm70D+E67EIyULvwlGgSnUrNra/Dbdh0V3ZsUL+VTg/YMXpr7sP3obM9zYcZent2s7Tr6L5NpWoNrhPIhvbevq1admjp7XzsK/FoeC6woa3y20YhvW3qew29kEV7mgV6pY7AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb/QJQPAaMUeiJDAAAAABJRU5ErkJggg==);
        background-repeat:  no-repeat;
        background-position: center center;
        background-size: auto;
        &.big {
            background-size: 2.1rem;
        }
        &.middle {
            background-size: 1.5rem;
        }
        &.small {
            background-size: 1rem;
        }
        &.no-logo {
            background-image: none;
        }
    }
        img {
            width: 100%;
            display: block;
        }
</style>