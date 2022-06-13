<template>
  <div class="q-pa-xs">
    <section>
      <div class="row">
        <div class="col q-pa-xs">
          <q-btn label="limpiar" @click="limiarVenta" color="orange" dense class="full-width"></q-btn>
        </div>
        <div class="col q-pa-xs">
          <q-btn label="procesar" color="green" @click="procesarVenta" dense class="full-width"></q-btn>
        </div>
      </div>
    </section>
    <section>
      <!--    {{$store.state.inventory.productosToSell}}-->
      <q-table
        class="my-sticky-header-column-table"
        :columns="columns"
        :data="$store.state.inventory.productosToSell"
        :rows-per-page-options="[]"
        row-key="name"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div>
              <q-badge color="indigo" :label="props.value"/>
            </div>
            <div class="my-table-details">
              <div>
                Precio: {{ props.row.unitPrice | formatmoneda }}
              </div>
              <div>
                Cantidad Disp.: {{ props.row.disponible }}
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-units="props">
          <q-td :props="props" style="text-align: -webkit-center !important;">
            <div class="my-table-details">
              <!--            {{ $store.state.inventory.productosToSell }}-->
              <div>
                <!--                            {{props.row.units}}-->
                <!--              <q-input style="width: 100%" v-model="props.row.units"></q-input>-->
              </div>
              <div>
                {{ props.row.units }}
                <q-popup-edit v-model.number="props.row.units" auto-save v-slot="scope">
                  <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"/>
                </q-popup-edit>
              </div>
            </div>
          </q-td>
        </template>
      </q-table>
    </section>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      data: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Producto',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'units',
          align: 'center',
          label: 'Cantidad',
          field: 'units',
          sortable: true
        },
      ],
    }
  },
  methods: {
    ...mapActions('inventory', ['call_inventories_create']),
    limiarVenta() {
      this.$store.dispatch('inventory/call_productosToSell_clean')
    },
    async procesarVenta() {
      try {
        this.$q.loading.show()
        const array = this.$store.state.inventory.productosToSell
        for (let i = 0; i < array.length; i++) {
          const element = array[i]
          console.log(element)
          if ((element.disponible - element.units) > 0) {
            const productoProcess = {
              "idProducto": element.idProducto,
              "movement": "1",
              "nroInvoice": "",
              "description": "",
              "units": element.units,
              "unitPrice": element.unitPrice
            }
            const respprocesarVenta = await this.call_inventories_create(productoProcess)
            console.log('respprocesarVenta', respprocesarVenta)
            this.limiarVenta()
            this.$emit('click')
            this.$q.notify({
              message: `Ventas procesadas correctamente`
            })
          } else {
            this.$q.notify({
              message: `La cantidad a vencer de ${element.name} superior a la cantidad disponilbe`
            })
          }
        }
      } catch (e) {
        this.$q.notify({
          message: `Error controlado procesarVenta -> ${e}`
        })
      } finally {
        this.$q.loading.hide()
      }
    }
  },
  created() {
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  max-height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */




























  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3

  thead tr:first-child th
    top: 0
    z-index: 1

  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
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
