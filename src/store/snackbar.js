const snackbar = {
    state : () => ({
        content: '',
    }),
    mutations : {
      showMessage (state, payload) {
        console.log("sta");
        state.content = payload.content
      }
    }
  };

  export default snackbar;