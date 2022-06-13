import {Fechas} from "../directives/formatFecha";

const formatFecha = {}

function callback(val) {
  return Fechas.larga(val)
  // return Fechas.Custom(val)
  // return Fechas.Corta(val)
}

formatFecha.install = function (Vue) {
  Vue.filter('formatfecha', (val) => {
    return callback(val)
  })
}

export default formatFecha
