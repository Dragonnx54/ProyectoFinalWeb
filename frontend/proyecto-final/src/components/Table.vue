<template>
  <div>
      <b-table striped hover :items="items" :fields="fields" :busy="busy" :tbody-tr-class="rowClass">
          <template #table-busy>
            <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
            </template>
            <template #cell(actions)="data">
                <slot name="actions" :item="data">
                </slot>
            </template>
      </b-table>
  </div>
</template>

<script>
export default {
    props: {
        items:Array,
        fields:Array,
        busy:Boolean,
        color:{
            type:Boolean,
            default:false
        }
    },
    methods: {  
        rowClass(item, type) {
          if (!item || type !== 'row' || !this.color) return
          if (item.Estatus === 'ABT') return 'table-danger'
          if (item.Estatus === 'ESP') return 'table-success'
          if (item.Estatus === 'FIN') return 'table-secondary'
        }
    },
}
</script>

<style>

</style>