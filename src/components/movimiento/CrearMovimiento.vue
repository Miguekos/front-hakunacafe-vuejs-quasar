<template>
  <div class="q-pa-xs">
    <section v-if="venta" class="q-pa-xs">
      <q-card>
        <q-form @submit="findProduct">
          <q-card-section>
            <div class="row">
              <div class="col-8 q-pa-xs">
                <q-input dense v-model="productoSet" label="Buscar Producto"></q-input>
              </div>
              <div class="col-4 q-pa-xs">
                <q-btn push class="full-width" color="green" label="Buscar" type="submit"></q-btn>
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-xs">
                <q-select dense v-model="movement" :readonly="venta" :options="optionsMovements"
                          option-disable="inactive"
                          option-label="name"
                          label="Movimiento" map-options emit-value></q-select>
              </div>
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </section>
    <section v-else class="q-pa-xs">
      <div class="row">
        <div class="col-12 q-pa-xs">
          <q-select dense v-model="movement" :readonly="venta" :options="optionsMovements"
                    option-disable="inactive"
                    option-label="name"
                    label="Movimiento" map-options emit-value></q-select>
        </div>
        <div class="col-12 q-pa-xs">
          <q-input v-model="nroInvoice" dense label="N° Factura"></q-input>
        </div>
        <div class="col-12 q-pa-xs">
          <q-input v-model="description" dense label="Descripción"></q-input>
        </div>
        <div class="col-6 q-pa-xs">
          <q-input v-model="units" dense label="Cantidad"></q-input>
        </div>
        <div class="col-6 q-pa-xs">
          <q-input v-model="unitPrice" :readonly="venta" dense label="Precio U."></q-input>
        </div>
        <div class="col-6 q-pa-xs">
          <q-btn label="Cerrar" push color="red" class="full-width" @click="cerrarMovimiento"></q-btn>
        </div>
        <div class="col-6 q-pa-xs">
          <q-btn label="Procesar" push color="green" class="full-width" @click="procesarMovimiento"></q-btn>
        </div>
      </div>
    </section>
    <section class="q-pa-xs">
      <q-dialog full-width v-model="IsProduct">
        <TablaInventario :info="getProductsByName" :movimiento="2" @click="cerrarTablaInventario"/>
      </q-dialog>
    </section>
    <section class="q-pa-xs">
      <TablaVentas @click="limpiarVentas" v-if="$store.state.inventory.productosToSell.length > 0"/>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  props: {
    venta: {
      type: Boolean
    },
    movimiento: {
      type: String,
      default: "1"
    },
    id: {
      type: Number,
      default: null
    }
  },
  name: "CrearMovimiento",
  computed: {
    ...mapGetters('products', ['getProductsByName']),
  },
  components: {
    TablaInventario: () => import('../inventario/TablaInventario'),
    TablaVentas: () => import('../venta/TablaVentas'),
  },
  data() {
    return {
      IsProduct: false,
      idProducto: 1,
      movement: this.movimiento,
      nroInvoice: "",
      description: "",
      units: null,
      unitPrice: 0,
      productoSet: "",
      optionsMovements: [
        {
          name: "Saldo Inicial",
          value: "0"
        },
        {
          name: "Venta",
          value: "1",
          inactive: true
        },
        {
          name: "Compra",
          value: "2"
        }
      ],
      movementSelect: ""
    }
  },
  methods: {
    ...mapActions('products', ['call_products_by_name', 'call_products_by_id']),
    ...mapActions('inventory', ['call_inventories_create', 'call_inventories_by_id']),
    cerrarMovimiento() {
      this.$emit('click')
    },
    async procesarMovimiento() {
      try {
        this.$q.loading.show()
        const bodyCreateMoviment = {
          "idProducto": this.id,
          "movement": this.movement,
          "nroInvoice": this.nroInvoice,
          "description": this.description,
          "units": this.units,
          "unitPrice": this.unitPrice
        }
        console.log('bodyCreateMoviment', bodyCreateMoviment)
        await this.call_inventories_create(bodyCreateMoviment)
        await this.call_products_by_id(this.id)
        await this.call_inventories_by_id(this.id)
        this.cerrarMovimiento()
      } catch (e) {
        this.$q.notify({
          message: `${e}`
        })
      } finally {
        this.$q.loading.hide()
      }

    },
    limpiarVentas() {
      this.productoSet = ""
    },
    cerrarTablaInventario() {
      this.IsProduct = false
    },
    async findProduct() {
      if (this.productoSet.length > 0) {
        await this.call_products_by_name(this.productoSet)
        if (this.getProductsByName.length > 0) {
          this.IsProduct = true
        } else {
          this.$q.notify({
            message: `No se encontraron productos con la palabra ${this.productoSet}`,
            color: "indigo"
          })
        }
      } else {
        this.$q.notify({
          message: `Debe escribir que producto buscar`,
          color: "indigo"
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
