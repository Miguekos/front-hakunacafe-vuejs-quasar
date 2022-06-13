<template>
  <div class="row">
    <div class="col-xs-2 col-md-1 q-pa-xs">
      <q-input filled dense v-model="id" label="Codigo"></q-input>
    </div>
    <div class="col-xs-4 col-md-3 q-pa-xs">
      <q-input filled dense v-model="name" label="Nombre"></q-input>
    </div>
    <div class="col-xs-6 col-md-6 q-pa-xs">
      <q-input filled dense v-model="description" label="Descripcion"></q-input>
    </div>
    <div class="col-xs-12 col-md-2 q-pa-xs">
      <q-btn color="green" push @click="createProducts" label="Registrar" class="full-width self-center"></q-btn>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: "AddInventario",
  data() {
    return {
      id: "",
      name: "",
      description: "",
    }
  },
  methods: {
    ...mapActions('products', ['call_products_create', 'call_products']),
    async createProducts() {
      try {
        this.$q.loading.show()
        const dataCreate = {
          idProducto: this.id,
          name: this.name,
          description: this.description
        }
        const respCreateProducts = await this.call_products_create(dataCreate)
        console.log('respCreateProducts', respCreateProducts)
        await this.call_products()
      } catch (e) {
        console.log("error_createProducts", e)
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style scoped>

</style>
