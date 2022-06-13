const formatMovement = {}

function callback(val) {
  if (val === '0'){
    return "Saldo Inicial"
  } else if (val === '1') {
    return "Venta"
  } else if (val === '2') {
    return "Compra"
  } else {
    return ""
  }
}

formatMovement.install = function (Vue) {
  Vue.filter('formatmovement', (val) => {
    return callback(val)
  })
}

export default formatMovement
