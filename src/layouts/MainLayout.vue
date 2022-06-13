<template>
  <div class="my-font principal">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <img
            src="~assets/logo_2.jpg"
            width="40"
            class="shadow-24"
          />

          <q-toolbar-title>
            Cafe Hakuna Admin
          </q-toolbar-title>

          <div>v{{ $q.version }}</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        content-class="bg-grey-1"
      >
        <q-list>
          <q-item-label
            header
            class="text-grey-8"
          >
            Menu
          </q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Dashboard',
    caption: 'Estadisticas',
    icon: 'school',
    link: '#/dashboard'
  },
  {
    title: 'Inventario',
    caption: 'Control de inventario',
    icon: 'code',
    link: '#/inventario'
  },
  {
    title: 'Venta',
    caption: 'Control de inventario',
    icon: 'code',
    link: '#/create-movimiento'
  },
];

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
<style>
.principal {
  /*background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);*/
  /*background-image: linear-gradient(*/
  /*  -225deg,*/
  /*  #7085b6 0%,*/
  /*  #87a7d9 50%,*/
  /*  #def3f8 100%*/
  /*);*/
  background-image: linear-gradient(
    -225deg,
    #bcaaa4 100%,
    #bcaaa4 100%,
    #bcaaa4 100%
  );
  /*background-image: linear-gradient(*/
  /*  -200deg,*/
  /*  #ffffff 40%,*/
  /*  #9abbee 60%,*/
  /*  #def3f8 100%*/
  /*);*/
}
</style>

