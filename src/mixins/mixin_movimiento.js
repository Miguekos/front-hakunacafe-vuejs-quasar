import {Fechas} from "../directives/formatFecha";

const MixinMovimiento = {
  data() {
    return {
      pagination: {
        sortBy: 'fecha',
        descending: true,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'fecha',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.date,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'movement',
          align: 'left',
          label: 'Movimiento',
          field: 'movement',
          sortable: true
        },
        {name: 'description', label: 'Descripción', field: 'description', align: 'left', sortable: true},
        {name: 'nroInvoice', label: 'N° Factura', field: 'nroInvoice', align: 'left', sortable: true},
        {
          name: 'units',
          align: 'left',
          label: 'Cantidad',
          field: 'units',
          sortable: true
        },
        {
          name: 'unitPrice',
          label: 'Precio U.',
          align: 'right',
          field: row => row.unitPrice,
          format: val => val,
          sortable: true
        },
        {
          name: 'totalPrice',
          label: 'Precio Total',
          align: 'right',
          field: 'totalPrice',
          sortable: true,
        },
      ],
    };
  },
  created: function () {

  },
  methods: {}
};


export {
  MixinMovimiento
};
