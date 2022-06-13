<template>
  <div>
    <q-table
      class="my-sticky-header-column-table-movimiento"
      title="Movimientos"
      :data="info"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
    >
      <template v-slot:body-cell-unitPrice="props">
        <q-td :props="props">
          {{ props.value | formatmoneda }}
        </q-td>
      </template>
      <template v-slot:body-cell-totalPrice="props">
        <q-td :props="props">
          {{ props.value | formatmoneda }}
        </q-td>
      </template>
      <template v-slot:body-cell-movement="props">
        <q-td :props="props">
          {{ props.value | formatmovement }}
        </q-td>
      </template>
      <template v-slot:body-cell-fecha="props">
        <q-td :style="props.row.movement | formatcolor" :props="props">
          {{ props.value | formatfecha }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import {MixinMovimiento} from "src/mixins/mixin_movimiento";

export default {
  props: {
    info: {
      type: Array
    }
  },
  mixins: [MixinMovimiento],
  data() {
    return {}
  }
}
</script>

<style lang="sass">

</style>
