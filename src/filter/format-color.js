//
//
const formatColor = {}

function callback(val) {
  if (val === '0') {
    return ""
  } else if (val === '1') {
    return "background-color: #c1f4cd !important"
  } else if (val === '2') {
    return "background-color: #f4c1c1 !important"
  } else {
    return ""
  }

}

formatColor.install = function (Vue) {
  Vue.filter('formatcolor', (val) => {
    return callback(val)
  })
}

export default formatColor
