import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "admin-only" | "guest-only" | "user-only"
declare module 'nuxt/app' {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}