import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Categorias:[],
    Personal:[],
    Persona:{},
    Tickets:[],
    busy:false,
    Estatus:"Todos"
  },
  mutations: {
    SET_CATEGORIAS(state,Categorias){
      state.Categorias=Categorias;
    },
    SET_Personal(state,payload){
      state.Personal=payload;
    },
    SET_BUSY(state,busy){
      state.busy=busy;
    },
    SET_PERSONA(state,payload){
      state.Persona=payload
    },
    SET_TICKETS(state,payload){
      state.Tickets=payload;
    },
    SET_ESTATUS(state,payload){
      state.Estatus=payload;
    },
  },
  actions: {
    getCategorias({commit}){
      commit("SET_BUSY",true);
      axios.get("http://localhost:4040/categories/")
      .then(response=>{
        commit("SET_CATEGORIAS",response.data);
      })
      .catch()
      .finally(()=>
        commit("SET_BUSY",false)
      )
    },
    addCategoria({commit},{params,onComplete,onError}){
      axios.post("http://localhost:4040/categories/",params)
      .then(response=>{
        onComplete(response)
      })
      .catch(onError)
    },
    deleteCategoria({commit},{id,onComplete,onError}){
      axios.delete(`http://localhost:4040/categories/${id}`)
      .then(response=>{
        onComplete(response)
      })
      .catch(onError)
    },
    getPersonal({commit}){
      commit("SET_BUSY",true)
      axios.get("http://localhost:4040/personal/")
      .then(response=>commit("SET_Personal",response.data))
      .catch()
      .finally(commit("SET_BUSY",false))
    },
    addPersonal({commit},{params,onComplete,onError}){
      axios.post("http://localhost:4040/personal/",params)
      .then(onComplete)
      .catch(onError)
    },
    deletePersonal({commit},{id,onComplete,onError}){
      axios.delete(`http://localhost:4040/personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    getPersona({commit},{id,onComplete}){
      axios.get(`http://localhost:4040/personal/${id}`)
      .then(response=>{
        onComplete(response)
      })
      .catch()
    },
    editPersonal({commit},{id,params,onComplete,onError}){
      axios.put(`http://localhost:4040/personal/${id}`,params)
      .then(onComplete)
      .catch(onError)
    },
    getTickets({commit}){
      commit("SET_BUSY",true)
      axios.get("http://localhost:4040/tickets/")
      .then(response=>commit("SET_TICKETS",response.data))
      .catch()
      .finally(commit("SET_BUSY",false))
    },
    addTicket({commit},{params,onComplete,onError}){
      axios.post("http://localhost:4040/tickets/",params)
      .then(onComplete)
      .catch(onError)
    },
    deleteTicket({commit},{id,onComplete,onError}){
      axios.delete(`http://localhost:4040/tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    getTicket({commit},{id,onComplete}){
      axios.get(`http://localhost:4040/tickets/${id}`)
      .then(response=>{
        onComplete(response)
      })
      .catch()
    },
    editTicket({commit},{id,params,onComplete,onError}){
      axios.put(`http://localhost:4040/tickets/${id}`,params)
      .then(onComplete)
      .catch(onError)
    },
    setEstatus({commit},Estatus){
      commit("SET_ESTATUS",Estatus);
    }

  },
  modules: {
  },
  getters:{
    Personal2:state=>{
      return state.Personal.map(e=>{
        return{
          value:e.ID.toString(),
          text:e.Nombre+" "+e.Apellidos
        }
      });
    },
    Categorias2:state=>{
      return state.Categorias.map(e=>{
        return{
          value:e.ID.toString(),
          text:e.Nombre
        }
      });
    },
    TicketsAbiertos:state=>{
      return state.Tickets.filter(item=>item.Estatus==="ABT")
      
    },
    TicketsEspera:state=>{
        return state.Tickets.filter(item=>item.Estatus==="ESP")
    },
    TicketsFinalizados:state=>{
        return state.Tickets.filter(item=>item.Estatus==="FIN") 
    },
    
  }
})
