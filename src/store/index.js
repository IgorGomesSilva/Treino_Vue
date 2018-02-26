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
        createPC ({commit}, dados) {
            const computador = {
                nome: dados.nome,
                imageUrl: dados.imageUrl,
                descricao: dados.descricao,
                date: dados.date,
                valor: dados.valor,
                id: 'kdjkjds'
            }
            console.log('passei aqui')
            
            //Aqui vai store ou Firebase
            commit('createPC', computador)
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
        clearError ({commit}) {
            commit('clearError')
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