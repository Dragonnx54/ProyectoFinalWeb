<template>
  <div>
      <b-form @submit.prevent="editar()" >
        <Input 
            v-model="Ticket.Nombre"
            id="Nombre"
            titulo="Nombre"
            placeholder="Ingrese el nombre"
            :maxlength="50"
            :error="erroresValidacion && !validacionNombre"
            mensajeError="Es necesario ingresar el nombre"
            disabled
            class="mb-2"
        />
        <label for="">Estatus</label>
        <b-form-select v-model="Ticket.Estatus" :options="opciones"></b-form-select>
        <span v-if="erroresValidacion&&!validaPersonal" class="text-danger"><br>Es necesario seleccionar una persona</span>
        <br>
        
        <b-button variant="secondary" type="submit" >Editar</b-button>
    </b-form>
  </div>
</template>

<script>
import Input from "../components/Input"
import {mapActions} from "vuex"
import Vue from "vue"
export default {
    components: {
        Input,
    },
    data() {
        return {
            Ticket:{
                Nombre:"",
                Descripcion:"",
                Prioridad:"",
                Personal:"",
                Categoria:"",
                Estatus:""
            },
            erroresValidacion:false,
            opciones: [
                { text: 'ABT-Abierto', value: 'ABT' },
                { text: 'ESP-En espera', value: 'ESP' },
                { text: 'FIN-Finalizado', value: 'FIN' }
            ]
        }
    },
    computed: {
        validacionNombre() {
            return this.Ticket.Nombre!==undefined && this.Ticket.Nombre.trim()!=="" 
        }
    },
    methods: {
        ...mapActions(["getTicket","editTicket"]),
        editar(){
            if(this.validacionNombre){
                this.erroresValidacion=false
                this.editTicket({
                    id:this.$route.params.id,
                    params:this.Ticket,
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
                console.log("error");
            }
        }
    },
    created () {
        this.getTicket({
            id:this.$route.params.id,
            onComplete:(response)=>{
                Vue.set(this,"Ticket",response.data)
            }
        });
    }
}
</script>

<style>

</style>