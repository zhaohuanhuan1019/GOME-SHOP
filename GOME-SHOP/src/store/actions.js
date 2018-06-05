import * as types from './mutation-types'
export const fun = ({commit}, msg) => {
  commit(types.GET_MSG, msg)
}
