export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/batyr_ashim/Рабочий стол/Diploma/client/tennis/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Домой"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"/home/batyr_ashim/Рабочий стол/Diploma/client/tennis/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Документация проекта \"Tennis\""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/batyr_ashim/Рабочий стол/Diploma/client/tennis/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
