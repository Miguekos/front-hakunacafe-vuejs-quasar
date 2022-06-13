const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue'),
      },
      {
        path: 'dashboard', component: () => import('pages/Dashboard.vue'),
      },
      {
        path: 'inventario', component: () => import('pages/Inventario.vue'),
      },
      {
        path: 'movimiento/:id', component: () => import('pages/Movimiento.vue'),
      },
      {
        path: 'create-movimiento', component: () => import('pages/Ventas'),
      }
    ]
  },
  {
    path: "/auth",
    component: () => import("pages/Auth/Login")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
