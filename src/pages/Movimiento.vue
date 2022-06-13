<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 q-pa-xs">
      <q-card style="height: 100%">
        <div class="row q-pt-sm">
          <div class="col text-center text-h5" style="border-bottom: solid black 0.5px">
            Datos del Producto
          </div>
        </div>
        <div class="row">
          <div
            class="col q-ma-sm text-center"
          >
            {{ getProductsById.idProducto }}
            <br>
            <div style="border-top: solid black 0.5px" class="text-blue-10 text-bold">
              Codigo
            </div>
          </div>
          <div
            color=""
            class="col q-ma-sm text-center"
          >
            {{ getProductsById.description }}
            <br>
            <div style="border-top: solid black 0.5px" class="text-orange-10 text-bold">
              Producto
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div
              class="col q-ma-sm text-center"
            >
              {{ getProductsById.description }}
              <br>
              <div style="border-top: solid black 0.5px" class="text-red-10 text-bold">
                Descripción
              </div>
            </div>
          </div>
        </div>
        <div class="row q-py-md text-bold text-h6 text-red-10">
          <div class="col text-center">Cantidad: {{ getProductsById.units }}</div>
        </div>
        <div class="col q-pa-xs">
          <q-btn color="green" push class="full-width" @click="crearMovement" label="Registrar Movimiento"></q-btn>
        </div>
      </q-card>
    </div>
    <div class="col-xs-12 col-md-4 q-pa-xs">
      <q-card style="height: 100%">
        <div class="col-xs-12 col-md-6 self-center">
          <div class="row q-pt-sm">
            <div class="col text-center text-h5 linea">
              Balance
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-sm text-left text-blue-10 linea">
              <div class="row">
                <div class="col-6">
                  <b>Saldo Inicial:</b>
                </div>
                <div class="col-6">
                  <span class="text-black"> {{ getProductsById.saldoInicial | formatmoneda }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 q-pa-sm text-left text-orange-10 linea">
              <div class="row">
                <div class="col-6">
                  <b>Entradas:</b>
                </div>
                <div class="col-6">
                  <span class="text-black"> {{ getProductsById.entrada | formatmoneda }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 q-pa-sm text-left text-red-10 linea">
              <div class="row">
                <div class="col-6">
                  <b>Saldo Final:</b>
                </div>
                <div class="col-6">
                  <span class="text-black"> {{ getProductsById.saldoFinal | formatmoneda }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 q-pa-sm text-left text-red-10 linea">
              <div class="row">
                <div class="col-6">
                  <b>Costo de Ventas:</b>
                </div>
                <div class="col-6">
                  <span class="text-black"> {{ getProductsById.costoDeVenta | formatmoneda }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 q-pa-sm text-left text-red-10 linea">
              <div class="row">
                <div class="col-6">
                  <b>Salidas de Inventario:</b>
                </div>
                <div class="col-6">
                  <span class="text-black"> {{ getProductsById.salidaDeInventario | formatmoneda }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 q-pa-sm text-left text-red-10 linea">
              <div class="row">
                <div class="col-6">
                  <b>Diferencia:</b>
                </div>
                <div class="col-6">
                  <span class="text-black"> {{ getProductsById.diferencia | formatmoneda }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="col-12 q-pa-xs">
      <TablaMovimiento :info="getInvetaryById"/>
    </div>
    <section>
      <q-dialog full-width v-model="IsCreateMovimiento">
        <q-card>
          <CrearMovimiento @click="cerrarMovement" :venta="false" movimiento="0" :id="getProductsById.idProducto"/>
        </q-card>
      </q-dialog>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import CrearMovimiento from "components/movimiento/CrearMovimiento";

export default {
  name: "Movimiento",
  data() {
    return {
      IsCreateMovimiento: false
    }
  },
  components: {
    CrearMovimiento,
    TablaMovimiento: () => import('../components/movimiento/TablaMovimiento')
  },
  computed: {
    ...mapGetters("inventory", ['getInvetaryById']),
    ...mapGetters("products", ['getProductsById'])
  },
  methods: {
    ...mapActions('products', ['call_products_by_id']),
    ...mapActions('inventory', ['call_inventories_by_id']),
    crearMovement() {
      this.IsCreateMovimiento = true
    },
    cerrarMovement() {
      this.IsCreateMovimiento = false
    }
  },
  async created() {
    try {
      this.$q.loading.show()
      // console.log(this.$route.params.id)
      await this.call_products_by_id(this.$route.params.id)
      await this.call_inventories_by_id(this.$route.params.id)
    } catch (e) {
      console.log("create_movimiento", e)
    } finally {
      this.$q.loading.hide()
    }

  }
}
</script>

<style>
.linea {
  border-bottom: solid black 0.5px;
}
</style>
