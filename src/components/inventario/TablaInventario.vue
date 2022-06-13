<template>
  <div>
    <q-table
      class="my-sticky-header-column-table"
      :data="info"
      :columns="columns"
      :pagination="pagination"
      row-key="name"
    >
      <template v-if="movimiento === 2" v-slot:body-cell-id="props">
        <q-td class="cursor-pointer" @click="selectProduct(props.row)" :props="props" style="font-size: 16px">
          <div>
            {{ props.value }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props" style="font-size: 16px">
          {{ props.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <div v-if="movimiento === 1">
            <q-btn @click="movementsProducts(props.row)" color="blue" label="registar movimiento"></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import {MixinDefault} from "src/mixins/mixin";
import {MixinInventario} from "src/mixins/mixin_inventario";

export default {
  props: {
    info: {
      type: Array
    },
    movimiento: {
      type: Number
    }
  },
  mixins: [MixinDefault, MixinInventario],
  data() {
    return {}
  },
  methods: {
    movementsProducts(val) {
      this.$router.push(`movimiento/${val.idProducto}`)
    },
    selectProduct(val) {
      console.log(val)
      const bodyProductSell = {
        "name": val.name,
        "idProducto": val.idProducto,
        "movement": "1",
        "nroInvoice": "",
        "description": "",
        "disponible": val.units,
        "units": 1,
        "unitPrice": val.precioUnitario
      }
      this.$store.dispatch('inventory/call_productosToSell', bodyProductSell)
      this.$emit('click')
    }
  },
  created() {
    if (this.movimiento === 1) {
      this.columns.push({
        name: 'accion',
        label: 'Acciones',
        field: 'accion',
        sortable: true,
      })
    }

  }
}
</script>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
