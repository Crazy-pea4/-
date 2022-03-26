export default {
    namespaced: true,
    actions: {},
    mutations: {
        add_message(state, value) {
            state.messages.unshift(value)
        }
    },
    state: {
        messages: []
    },
    getters: {
        
    }
}