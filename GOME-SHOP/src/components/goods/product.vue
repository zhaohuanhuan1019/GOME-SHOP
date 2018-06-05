<template>
    <div class='product'>
        <a class='react' :data-code="dataCode" :href="href || 'javascript:;'">
            <div class='container img'>
                <slot name='tag'></slot>
                <slot name='mask'></slot>
                <slot name='mask-bottom-bar'></slot>
                <CImage :src="img" :isProduct="true"></CImage>
                <!-- <img v-lazyload:adapter.product='img' onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='"> -->
                <!--:src="data.imageUrl" >-->
            </div>
            <div class='container content'>
                <slot name='content'></slot>
            </div>
        </a>
    </div>
</template>
<script>
    import CImage from '../common/image.vue'
    export default {
        props:['href', 'img', 'dataCode'],
        components: {
            CImage,
        },
    }
</script>
<style lang="scss">
    .product{
        width: 100%;
        overflow: hidden;
        background-color: white;
        height: 130px;
        padding: 15px;
        box-sizing: border-box;
        a {
            display: flex;
        }
        a:active, a:visited, a:link, a:hover {
            color: #000
        }
        .container{
            &.img {
                position: relative;
                box-sizing: border-box;
                width: 1rem;
                height: 1rem;
                margin-right: 0.15rem;
                flex-shrink: 0;
            }
        }
        .container{
            &.img {
                background-color: #f4f4f4;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAh1BMVEUAAADh4eHm5ubh4eHs7Ozh4eHi4uLh4eHh4eHh4eHi4uLh4eH////h4eHl5eXh4eHh4eHi4uLj4+Pk5OTh4eHh4eHi4uLl5eXh4eHh4eHh4eHi4uLi4uLi4uLk5OTh4eHi4uLj4+Pr6+v////h4eHh4eHh4eHi4uLh4eHh4eHh4eHh4eHg4OAszPWnAAAALHRSTlMA7hC7CN1GQv33K78D6R7WY3sxKcWekhjjioRTTD03zXAkDAG0pZpdrqpsdgGj8RwAAANuSURBVHja7drZmqIwEAXgYhNowQ1bcF/avev9n28cK2hYHL+Zm0n6O/8VhqsjJqFSEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYK5x5/dSp6C/oKdvs14WMB+PDKSd7LPrcwkke0c5cFU9cskMyYfEq3CLmhiAjK+jZoqdiTqITtUbvkQXmLOLPReZTU56qZ7UZuYmfL6eOfO5+kfESNd/SEbWbqSw7UrYqbYeMt2SxfBVeokRbehjw3Z6MN+U7j15Yyf01Pe1kEsYJma7Ld1d64Sr3P0kTyNiITKemXEh/nnIz0oxlbEGmS988haPcH5LGk7ETmU4t7B8kButAGcvD/HwdbkCmq4bbRvyQfv2wcCPWuD8sHE2inxSuvqD4rpuX4axfUFq2Al8PN7V5K+iqn9ircBu5PrZ8ISsynSp4Lq/CLeV6rN+X+i72yXQdVchl7eHKJFHeKJK6ZDy/UOVa3gynP9pzQoobyMiczDdg4QzLWjVnIRVcL1Y/zLl7/zhQ2frmFwVEyZkf0uA3Rz1LEicuOUURsxJ/kA38PbeaknKNuMFZkh2+Ng439X0qhWuuOW/JGv7gEMSsC6a+Hr8z6TssonQ8M79Mrdu5TztqSuSWDesIAPwf+dHzvMuKdNvDbezQo6feYHrYe7r9lcwnO3i8pSe3kI2OSstxxDpr3i3V9rX29bzCJTHlVkMynsNiQqUNV8PNuFVqQQ/LYWVBYhRXw2URi+73ab7olEIbeqtOrZu4C7ga7qKqAAumWGs40U3o5sCiVonzjCzk8MOsLF2rZyjCpj8wtIWLQsrierhrWbnaSIWLZQFcy7UWblg2J22kwn3LoqKuhVs5+rNR2Ss4csnzW3oFqVdxMf9AVg/32AKcvBmuyTH/RFYLR8uobG+8CScseD/RwtEwkqbAm3A2zcFnOOqtVqst1cKpueh1KkYW/H1IC/emhXUmG70L9112eWz0LtyJbfm70D+E67EIyULvwlGgSnUrNra/Dbdh0V3ZsUL+VTg/YMXpr7sP3obM9zYcZent2s7Tr6L5NpWoNrhPIhvbevq1admjp7XzsK/FoeC6woa3y20YhvW3qew29kEV7mgV6pY7AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb/QJQPAaMUeiJDAAAAABJRU5ErkJggg==);
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: center;
            }
        }
        font-size: .14rem;
    }

</style>