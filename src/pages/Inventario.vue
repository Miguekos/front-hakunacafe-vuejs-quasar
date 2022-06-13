<template>
  <q-page padding>
    <AddInventario/>
    <q-separator></q-separator>
    <TablaInventario :info="getProducts" :movimiento="1" class="q-pt-sm"/>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  computed: {
    ...mapGetters('products', ['getProducts'])
  },
  components: {
    AddInventario: () => import('../components/inventario/AddInventario'),
    TablaInventario: () => import('../components/inventario/TablaInventario'),
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('products', ['call_products'])
  },
  async created() {
    try {
      this.$q.loading.show()
      await this.call_products()
    } catch (e) {
      console.log("error", e)
    } finally {
      this.$q.loading.hide()
    }
  }
}
</script>
