<template>
  <div>
      <b-button variant="outline-primary" to="/add/categoria/">Agregar</b-button>
      <Table :busy="busy" :items="Categorias" :fields="fields" >
          <template slot="actions" slot-scope="{item}">
            <b-button @click="onEliminar(item)">Eliminar</b-button>
        </template>
      </Table>
  </div>
</template>

<script>
import Table from "../components/Table"
import {mapState,mapActions} from "vuex"
export default {
    data() {
        return {
            fields:[
                'ID',
                "Nombre",
                "actions"
            ]
        }
    },
    components: {
        Table,
    },
    computed: {
        ...mapState(["Categorias","busy"])
    },
    methods: {
        ...mapActions(["getCategorias","deleteCategoria"]),
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
                    this.deleteCategoria({
                        id:item.item.ID,
                        onComplete:response=>{
                            this.$notify({
                                type:"success",
                                text:response.data.mensaje
                            })
                            setTimeout(()=>this.getCategorias(),1000)
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
            
        }
    },
    mounted (){
        this.getCategorias();
    }
}
</script>

<style>

</style>