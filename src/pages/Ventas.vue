<template>
  <div>
    <CrearMovimiento :venta="true" movimiento="1" :id="null"/>
  </div>
</template>

<script>
export default {
  name: "Ventas",
  components: {
    CrearMovimiento: () => import('../components/movimiento/CrearMovimiento')
  }
}
</script>

<style scoped>

</style>
