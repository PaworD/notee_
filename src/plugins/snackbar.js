const snackbarPlugin = {
    install : (Vue, {store}) => {
        if (!store) {
            throw new Error("Please Provide Vuex Store")
        }

        Vue.prototype.$snackbar = {
            showMessage: function({
                content = '',
            }) {
                store.commit(
                    'showMessage',
                    {content},
                    {root: true}
                )
            }
        }
    }
}

export default snackbarPlugin;