// Define un objeto _mixin_
import {Fechas} from "../directives/formatFecha";

const MixinDefault = {
  data() {
    return {};
  },
  created: function () {
    // this.hello();
  },
  methods: {
    noti(val) {
      if (val === 1) {
        this.$q.notify({
          message: "Se actualizo correctamente",
          color: "white",
          textColor: "blue-5",
          position: "top"
        });
      }
      if (val === 2) {
        this.$q.notify({
          message: "Ya esta asignado a este usuario",
          color: "white",
          textColor: "blue-5",
          position: "top"
        });
      }
      if (val === 3) {
        this.$q.notify({
          message: "Oh oh, algo salio mal",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
      if (val === 4) {
        this.$q.notify({
          message: "No puedes dejar campos vacios",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
      if (val === 5) {
        this.$q.notify({
          message: "No se encontro el registro",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
    },
    formatear_moneda(suma) {
      const formatter = new Intl.NumberFormat("CLP", {
        style: "currency",
        currency: "CLP"
        // These options are needed to round to whole numbers if that's what you want.
        // https://www.iban.com/currency-codes
        // https://usefulangle.com/post/283/javascript-format-number-as-currency
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      // formatter.format(2500); /* $2,500.00 */
      // console.log(resultado);
      return formatter.format(suma);
    },
    formatFecha(val) {
      return Fechas.larga(val);
    },
    formatFechaCorta(val) {
      return Fechas.Corta(val);
    },
    formatFechaCustom(val) {
      return Fechas.Contable(val);
    }
  }
};

const storagelocal = {
  data() {
    return {
      dataLocal: null,
      idLocal: null,
      rolLocal: null,
      prove: null
    };
  },
  created: function () {
    const todo = this.$q.localStorage.getAll();
    // console.log('log', todo)
    this.idLocal = todo.idUser;
    this.dataLocal = todo.UserDetalle;
    this.rolLocal = todo.role;
    this.prove = todo.prove;
  },
  methods: {}
};

export {
  MixinDefault,
  storagelocal
};
