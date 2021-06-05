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
        <Input 
            v-model="Ticket.Descripcion"
            id="Descripcion"
            titulo="Descripcion"
            placeholder="Ingrese la descripcion"
            :maxlength="100"
            mensajeError="Es necesario ingresar los Apellidos"
            class="mb-2"
        />
        <b-form-group label="Prioridad" v-slot="{ ariaDescribedby }" class="mb-2">
            <b-form-radio-group
                v-model="Ticket.Prioridad"
                :options="opciones"
                :aria-describedby="ariaDescribedby"
                name="Prioridad"
            ></b-form-radio-group>
        </b-form-group>
        <label for="">Persona que genera el ticket</label>
        <b-form-select v-model="Ticket.Personal" :options="Personal2"></b-form-select>
        <span v-if="erroresValidacion&&!validaPersonal" class="text-danger"><br>Es necesario seleccionar una persona</span>
        <br>
        <label for="">Categoria</label>
        <b-form-select v-model="Ticket.Categoria" :options="Categorias2"></b-form-select>
        <span v-if="erroresValidacion&&!validaCategoria" class="text-danger"><br>Es necesario seleccionar una categoria</span>
        <br>
        <b-button variant="secondary" type="submit" >Editar</b-button>
    </b-form>
  </div>
</template>

<script>
import Input from "../components/Input"
import {mapActions,mapGetters} from "vuex"
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
                { text: 'Baja', value: '1' },
                { text: 'Media', value: '2' },
                { text: 'Alta', value: '3' }
            ]
        }
    },
    computed: {
        validacionNombre() {
            return this.Ticket.Nombre!==undefined && this.Ticket.Nombre.trim()!=="" 
        },
        validaPersonal(){
            return this.Ticket.Personal!==undefined && this.Ticket.Personal.toString().trim()!=="";
        },
        validaCategoria(){
            return this.Ticket.Categoria!==undefined &&this.Ticket.Categoria.toString().trim()!=="";
        },
        ...mapGetters(["Personal2","Categorias2"])
    },
    methods: {
        ...mapActions(["getPersonal","getCategorias","getTicket","editTicket"]),
        editar(){
            if(this.validacionNombre&&this.validaPersonal&&this.validaCategoria){
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
                this.$router.push({
                    name:"Tickets"
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
        this.getPersonal();
        this.getCategorias();
    }
}
</script>

<style>

</style>