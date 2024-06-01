import { useIntersectionObserver } from "@vueuse/core";
export const lazyPlugin = {
  install(app:any) {
    app.directive('img-lazy', {
      mounted(el:any, binding:any) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}
