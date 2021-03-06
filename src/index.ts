import { Controller } from 'stimulus'

export default class extends Controller {
  // @ts-ignore
  element: HTMLAnchorElement

  initialize (): void {
    this.prefetch = this.prefetch.bind(this)
    this.load = this.load.bind(this)
  }

  connect (): void {
    if (!this.hasPrefetch) return

    this.load()
  }

  load (): void {
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            this.prefetch()

            observer.unobserve(entry.target)
          }
        })
      }
    )

    observer.observe(this.element)
  }

  prefetch (): void {
    // @ts-ignore
    const connection = navigator.connection

    if (connection) {
      // Don't prefetch if using 2G or if Save-Data is enabled.
      if (connection.saveData) {
        console.warn('[stimulus-prefetch] Cannot prefetch, Save-Data is enabled.')
        return
      }

      if (/2g/.test(connection.effectiveType)) {
        console.warn('[stimulus-prefetch] Cannot prefetch, network conditions are poor.')
        return
      }
    }

    const link: HTMLLinkElement = document.createElement('link')
    link.rel = 'prefetch'
    link.href = this.element.href
    link.as = 'document'

    document.head.appendChild(link)
  }

  get hasPrefetch (): boolean {
    const link: HTMLLinkElement = document.createElement('link')

    return link.relList && link.relList.supports && link.relList.supports('prefetch')
  }
}
