<template>
  <div>
      <b-form @submit.prevent="agregar()" >
        <Input 
            v-model="Personal.Nombre"
            id="Nombre"
            titulo="Nombre"
            placeholder="Ingrese el nombre"
            :maxlength="50"
            :error="erroresValidacion && !validacionNombre"
            mensajeError="Es necesario ingresar el nombre"
            class="mb-2"
        />
        <Input 
            v-model="Personal.Apellidos"
            id="Apellidos"
            titulo="Apellidos"
            placeholder="Ingrese los Apellidos"
            :maxlength="80"
            :error="erroresValidacion && !validacionApellidos"
            mensajeError="Es necesario ingresar los Apellidos"
            class="mb-2"
        />
        <Input 
            v-model="Personal.Telefono"
            id="Telefono"
            titulo="Telefono"
            placeholder="Ingrese el Telefono"
            :maxlength="10"
            :error="erroresValidacion && !validacionTelefono"
            mensajeError="El telefono debe ser de 10 digitos"
            class="mb-2"
        />
        <Input 
            v-model="Personal.Direccion"
            id="Direccion"
            titulo="Direccion"
            placeholder="Ingrese la Direccion"
            :maxlength="150"
            mensajeError=""
            class="mb-2"
        />
        <b-button variant="secondary" type="submit" >Agregar</b-button>
    </b-form>
  </div>
</template>

<script>
import Input from "../components/Input"
import {mapActions} from "vuex"
export default {
    components: {
        Input,
    },
    computed: {
        validacionNombre() {
            return this.Personal.Nombre!==undefined && this.Personal.Nombre.trim()!=="" 
        },
        validacionApellidos(){
            return this.Personal.Apellidos!==undefined && this.Personal.Apellidos.trim()!==""
        },
        validacionTelefono(){
            return this.Personal.Telefono!==undefined && (this.Personal.Telefono.trim()==="" || this.Personal.Telefono.length===10)
        }
    },
    data() {
        return {
            Personal:{
                Nombre:"",
                Apellidos:"",
                Telefono:"",
                Direccion:""
            },
            erroresValidacion:false
        }
    },
    methods: {
        ...mapActions(["addPersonal"]),
        agregar() {
            if(this.validacionNombre&&this.validacionApellidos&&this.validacionTelefono){
                this.erroresValidacion=false
                this.addPersonal({
                    params:this.Personal,
                    onComplete:response=>{
                        this.$notify({
                            type:"success",
                            text:response.data.mensaje
                        })
                    },
                    onError:response=>{
                        this.$notify({
                            type:"error",
                            text:response.response.data.mensaje
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