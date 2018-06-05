import fetch from '@/config/fetch'
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'


export let fetchProductUserInfo = (options) => {
	let res = adaptFetch('productDetailUserInfo', options)
	return res
}
export let fetchProductInfo = (options) => {
	let res = adaptFetch('productDetail', options)
	return res
}
export let modifyProductPutOn = (options) => {
	let res = adaptFetch('productPutOn', options)
	return res
}
export let fetchProductImagesInfo = (options) => {
	let res = adaptFetch('productDetailImagesInfo', options)
	return res
}
export let fetchProductGradePrice = (options) => {
	let res = adaptFetch('productDetailGradePrice', options)
	return res
}
