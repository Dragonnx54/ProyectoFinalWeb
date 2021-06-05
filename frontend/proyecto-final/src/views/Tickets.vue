<template>
  <div>
      <b-button variant="outline-primary" to="/add/ticket/">Agregar</b-button>
      <Table :busy="busy" :fields="fields" :items="Tickets">
          <template slot="actions" slot-scope="{item}">
            <b-button class="me-1" variant="danger" @click="onEliminar(item)">Eliminar</b-button>
            <b-button class="btn-block me-1" @click="onEditar(item)">Editar</b-button>
            <b-button class="btn-block" variant="info" @click="onEditarStatus(item)">Cambiar Estatus</b-button>
        </template>
      </Table>
  </div>
</template>

<script>
import Table from "../components/Table"
import {mapActions, mapState} from "vuex"
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
                "Estatus",
                "actions"
            ]
        }
    },
    components: {
        Table,
    },
    computed: {
        ...mapState(["busy","Tickets"]),
    },
    methods: {
        ...mapActions(["getTickets","deleteTicket"]),
        onEliminar(item){
                        this.$bvModal
            .msgBoxConfirm("Esta opción no se puede deshacer.", {
                title: "Eliminar Ticket",
                size: "sm",
                buttonSize: "sm",
                okVariant: "danger",
                okTitle: "Aceptar",
                cancelTitle: "Cancelar",
                footerClass: "p-2",
                centered: true,
            })
            .then((value) => {
                if (value) {
                    this.deleteTicket({
                        id:item.item.ID,
                        onComplete:response=>{
                            this.$notify({
                                type:"success",
                                text:response.data.mensaje
                            })
                            setTimeout(()=>this.getTickets(),1000)
                        },
                        onError:response=>{
                            this.$notify({
                                type:"error",
                                text:response.data.mensaje
                            })
                        }
                    })
                }
            })
            .catch((err) => {
            // An error occurred
            });
            
        },
        onEditar(item){
            this.$router.push({
                name:"EditaTicket",
                params:{
                    id:item.item.ID
                }
            })
        },
        onEditarStatus(item){
            this.$router.push({
                name:"EditaTicketStatus",
                params:{
                    id:item.item.ID
                }
            })
        }
    },
    created () {
        this.getTickets();
    },
}
</script>

<style>

</style>