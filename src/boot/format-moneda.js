import Vue from 'vue'
import formatMoneda from '../filter/format-moneda'
import formatFecha from '../filter/format-fecha'
import formatMovement from '../filter/format-movement'
import formatColor from "../filter/format-color";


Vue.use(formatMoneda)
Vue.use(formatFecha)
Vue.use(formatMovement)
Vue.use(formatColor)
