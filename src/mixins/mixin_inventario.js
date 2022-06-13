import {Fechas} from "../directives/formatFecha";

const MixinInventario = {
  data() {
    return {
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.idProducto,
          format: val => `${val}`,
          sortable: true
          //  formatear_moneda
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
          //  formatear_moneda
        },
        {
          name: 'saldoFinal',
          label: 'Saldo Inicial',
          align: 'left',
          field: row => row.saldoFinal,
          format: val => `${this.formatear_moneda(val)}`,
          sortable: true
        },
        {
          name: 'entrada',
          align: 'left',
          label: 'Entradas',
          field: row => row.entrada,
          format: val => `${this.formatear_moneda(val)}`,
          sortable: true
        },
        {
          name: 'saldoInicial',
          label: 'Saldo Final',
          field: row => row.saldoInicial,
          format: val => `${this.formatear_moneda(val)}`,
          sortable: true
        },
        {
          name: 'costoDeVenta',
          label: 'Costo de venta',
          field: row => row.costoDeVenta,
          format: val => `${this.formatear_moneda(val)}`
        },
        {
          name: 'salidaDeInventario',
          label: 'Salidas de inventario',
          field: row => row.salidaDeInventario,
          format: val => `${this.formatear_moneda(val)}`
        },
        {
          name: 'units',
          label: 'Unidades',
          field: row => row.units,
          format: val => val,
          sortable: true,
        }
      ],
    };
  },
  created: function () {

  },
  methods: {}
};


export {
  MixinInventario
};
