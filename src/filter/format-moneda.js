const formatMoneda = {}

function formatmoneda(suma) {
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
}

formatMoneda.install = function (Vue) {
  Vue.filter('formatmoneda', (val) => {
    return formatmoneda(val)
  })
}

export default formatMoneda
