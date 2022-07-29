import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'
// 教务相关状态
export default {
	namespaced: true,
	state: state,
	mutations: mutations,
	getters: getters,
	actions: actions
}
