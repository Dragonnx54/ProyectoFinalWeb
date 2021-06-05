<template>
  <div>
      <b-button variant="outline-primary" to="/add/personal/">Agregar</b-button>
      <Table :busy="busy" :items="Personal" :fields="fields" >
          <template slot="actions" slot-scope="{item}">
            <b-button class="me-1" variant="danger" @click="onEliminar(item)">Eliminar</b-button>
            <b-button class="btn-block mr-2" @click="onEditar(item)">Editar</b-button>
        </template>
      </Table>
  </div>
</template>

<script>
import {mapActions,mapState} from "vuex"
import Table from "../components/Table"
export default {
    data() {
        return {
            fields:[
                "ID",
                "Nombre",
                "Apellidos",
                "Telefono",
                "Direccion",
                "actions"
            ]
        }
    },
    components: {
        Table
    },
    computed: {
        ...mapState(["busy","Personal"])
    },
    methods: {
        ...mapActions(["getPersonal","deletePersonal"]),
        onEliminar(item){
                        this.$bvModal
            .msgBoxConfirm("Esta opción no se puede deshacer.", {
                title: "Eliminar Persona",
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
                    this.deletePersonal({
                        id:item.item.ID,
                        onComplete:response=>{
                            this.$notify({
                                type:"success",
                                text:response.data.mensaje
                            })
                            setTimeout(()=>this.getPersonal(),1000)
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
                name:"EditaPersonal",
                params:{
                    id:item.item.ID
                }
            })
        }
    },
    created (){
        this.getPersonal();
    }
}
</script>

<style>

</style>