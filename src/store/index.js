import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store ({
    state: {
        carregaPCs: [
            { imageUrl: 'https://images3.alphacoders.com/587/thumb-1920-587453.jpg', 
            id: 'afajfjadfaadfa323', 
            nome: 'Computador HP',
            date: new Date(),
            valor: 2000,
            descricao: 'Melhor computador para seu filho que so joga LOL' 
            },
            { imageUrl: 'https://images6.alphacoders.com/728/thumb-1920-728101.png', 
            id: 'aadsfhbkhlk1241', 
            nome: 'Computador Dell',
            date: new Date(),
            valor: 5000,
            descricao: 'Esse computador faz até seu cafe da manha' 
        }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedComputadores(state, dados){
            state.loadPC = dados
        },
        createPC (state, dados) {
            state.carregaPCs.push(dados)
        },
        setUser (state, dados) {
            state.user = dados
        },
        setLoading (state, dados) {
            state.loading = dados
        },
        setError (state, dados) {
            state.error = dados
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadPC ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('computadores').once('value')
             .then((data) => {
                 const computadores = []
                 const obj = data.val()
                 for ( let key in obj) {
                     computadores.push({
                         id: key,
                         nome: obj[key].nome,
                         descricao: obj[key].descricao,
                         imageUrl: obj[key].imageUrl,
                         date: obj[key],
                         creatorId: obj[key].creatorId
                     })
                 }
                 commit('setLoadedComputadores', computadores)
                 commit('setLoading', false)
             })
             .catch(
                 (error) => {
                     console.log(error)
                     commit('setLoading', false)
                     
                 }
             )
        },
        createPC ({commit, getters}, dados) {
            const computador = {
                nome: dados.nome,
                descricao: dados.descricao,
                date: dados.date.toISOString(),
                valor: dados.valor,
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('computadores').push(computador)
              .then((data) => {
                  key = data.key
                  return key
              })
              .then(key => {
                  const filename = dados.image.name
                  const ext = filename.slice(filename.lastIndexOf('.'))
                  return firebase.storage().ref('computadores/' + key + '.' + ext).put(dados.image)

              })
              .then(fileData => {
                imageUrl = fileData.metadata.downloadURLs[0]
                return firebase.database().ref('computadores').child(key).update({imageUrl: imageUrl})
              })
              .then(() => {
                commit('createPC', {
                    ...computador,
                    imageUrl: imageUrl,
                    id: key
                })
              })
              .catch((error) => {
                  console.log(error)
              })
            //Aqui vai store ou Firebase           
        },
        CadastrarUser({commit}, dados) {
            commit ('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(dados.email, dados.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            cadastrarPC: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                        
                    }
                )
        },
        LogarUser ({commit}, dados) {
            commit ('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(dados.email, dados.password)
             .then(
                 user => {
                    commit('setLoading', false)
                    const newUser = {
                         id: user.uid,
                         cadastrarPC: []
                     }
                     commit ('setUser', newUser)
                 }
             )
             .catch (
                 error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                     
                 }
             )
        },
        autoLogin ({commit}, dados) {
            commit('setUser', {id: dados.uid, cadastrarPC: []})
        },
        clearError ({commit}) {
            commit('clearErro')
        },
        sair ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        carregaPCs (state) {
            return state.carregaPCs.sort((pcA, pcB) => {
                return pcA.date > pcB.date
            })
        },
        exibirPCs (state, getters) {
            return getters.carregaPCs
        },
        carregaPC (state) {
            return (pcId) => {
                return state.carregaPCs.find((pc) => {
                    return pc.id === pcId
                })
            }
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }

})