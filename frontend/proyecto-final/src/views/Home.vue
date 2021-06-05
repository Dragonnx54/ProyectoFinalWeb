<template>
  <div class="home">
    <!-- ESTA VISTA CONTENDRA UNA VISTA con los tickets filtrados por categoria -->
      <b-form-select v-model="Estatus" :options="opciones" @change="filtra"></b-form-select>
      <Table :busy="busy" :fields="fields" :items="filtro" :color="true"></Table>
  </div>
</template>

<script>
import Table from "../components/Table"
import {mapActions, mapGetters, mapState} from "vuex"

export default {
  data() {
        return {
            fields:[
                "ID",
                "Nombre",
                "Descripcion",
                "Prioridad",
                "Personal",
                "Categoria",
                "Estatus"
            ],
            filtro:[],
            opciones: [
                { text: 'Todos', value: 'Todos' },
                { text: 'ABT-Abierto', value: 'ABT' },
                { text: 'ESP-En espera', value: 'ESP' },
                { text: 'FIN-Finalizado', value: 'FIN' }
            ],
            Estatus:"Todos"
        }
    },
    components: {
        Table,
    },
    computed: {
        ...mapState(["busy","Tickets"]),
        ...mapGetters(["TicketsAbiertos","TicketsEspera","TicketsFinalizados"]),
        filtra(){
          if(this.Estatus==="Todos"){
              this.filtro=this.Tickets;
          }else if(this.Estatus==="ABT"){
            this.filtro=this.TicketsAbiertos;
          }else if(this.Estatus==="ESP"){
            this.filtro=this.TicketsEspera;
          }else if(this.Estatus==="FIN"){
            this.filtro=this.TicketsFinalizados;
          }
        }
    },
    methods: {
        ...mapActions(["getTickets"]),
    },
    created () {
        this.getTickets();
        this.filtra();
    }
}
</script>
