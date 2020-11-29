import axios from 'axios';

const notes = {
    state : () => ({
        notes: null,
        isShared: null
    }),
    mutations: {
        setNotes (state, payload) {
            state.notes = payload;
          },
        setSharedLink(state, payload){
            state.isShared = payload;
        }
        },
    actions: {
        getSharedNote({commit}, payload){
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:3000/notes/shared/${payload.owner}/${payload.note}`).then((res) => {
                    
                    resolve(res.data)
                }).catch((E) => {
                    reject(E)
                })
            })
        },
        getAllNotes({commit, state, rootState}){
            
            let id = rootState.user.user.id
            let token = localStorage.getItem("token");
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:3000/notes/`, {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }).then((res) => {
                    commit("setNotes", res.data);
                    console.log(res.data);
                    console.log(res);
                    resolve(res.data);
                }).catch((e) => {
                    reject(e)
                })
            })
        },
         createNote({commit, state, rootState}, payload) {
            let id = rootState.user.user.id
             return new Promise((resolve, reject) => {
                axios.post(`http://localhost:3000/notes/${id}/create`, payload).then((res) => {
                    resolve("New Note has been created")
                }).catch((e) => {
                    reject(e);
                })
             });
         },
         deleteNote({commit}, id) {
             return new Promise((resolve, reject) => {
                 axios.delete(`http://localhost:3000/notes/delete/${id}`).then((res) => {
                     resolve(res);
                 }).catch((e) => {
                     reject(e)
                 })
             })
         },
         updateNote({commit, state}, payload){
             return new Promise((resolve, reject) =>{
                axios.put(`http://localhost:3000/notes/${payload.id}/update`, payload).then((res) => {
                    resolve(res.data);
                }).catch((e) =>{
                    reject(e);
                })
             })
         }
    },
    getters: {
        /*
      
        Map through notes, modify default time @var (XX-XX-XXXXTX:XX::XX)
        with more just date : split(T) => []

      */
      getNotes: state => {
          return state.notes.filter(note => {
              note.created = note.created.split("T")[0];
                (note.modified !== null) ? note.modified = note.modified.split("T")[0] : null;
               return note
            })
      },
      /*
 
        If average number of notes is less, no need to make API call,
        best practice to use state to find, map , sort your data

      */
      getNote:(state) => (id) => {
          return state.notes.find(note => note.id == id);
      }
    }
};

export default notes;
