<template>
    <b-form @submit.prevent="guardar()" >
        <Input 
            v-model="Categoria.Nombre"
            id="Nombre"
            titulo="Nombre"
            placeholder="Ingrese el nombre"
            :maxlength="50"
            :error="erroresValidacion && !validacionNombre"
            mensajeError="Es necesario ingresar el nombre"
            class="mb-2"
        />
        <b-button variant="secondary" type="submit" >Agregar</b-button>
    </b-form>
</template>

<script>
import Input from "../components/Input"
import {mapActions} from "vuex"
export default {
    data() {
        return {
            Categoria:{
                Nombre:''
            },
            erroresValidacion:false
        }
    },
    components: {
        Input,
    },
    computed: {
        validacionNombre() {
            return(
                this.Categoria.Nombre!==undefined &&
                this.Categoria.Nombre.trim() !== ''
            ) 
        },
    },
    methods: {
       ...mapActions(["addCategoria"]),
        guardar(){
            if(this.validacionNombre){
                this.erroresValidacion=false;
                //Guardar
                this.addCategoria({
                    params:this.Categoria,//si estan diferente los nombres al de la base de datos mandas un arreglo con los nombres correctos
                    onComplete:(response)=>{
                        this.$notify({
                            type:"success",
                            title:response.data.mensaje
                        });
                        this.$router.push({
                            name:'Categorias'
                        })
                    },
                    onError:(error)=>{
                        console.log(error),
                        this.$notify({
                            type:"error",
                            title: error.response.data.mensaje
                        })
                    }
                })
            }else{
                this.erroresValidacion=true
            }
        }
    },
}
</script>

<style>

</style>