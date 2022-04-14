import {
    reqCartList
} from '../../api'
export default {
    namespaced: true,
    actions: {
        async getCartList() {
            let {data} = await reqCartList();
            console.log(data);
        }
    },
    mutations: {

    },
    state: {

    },
    getters: {

    }
}