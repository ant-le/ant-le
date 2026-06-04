// Client-only reactive locale store for Svelte 5.
// Paraglide's `getLocale()` is overwritten to read from this store, so
// any component that calls a message function reruns when the locale
// changes, with no full-page reload or URL navigation.

import {
    baseLocale,
    locales,
    overwriteGetLocale,
} from '$lib/paraglide/runtime.js'

export type Locale = (typeof locales)[number]

const storageKey = 'PARAGLIDE_LOCALE'

function readInitialLocale(): Locale {
    if (typeof document === 'undefined') return baseLocale
    const stored = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${storageKey}=`))
        ?.split('=')[1]
    if (stored && (locales as readonly string[]).includes(stored)) {
        return stored as Locale
    }
    return baseLocale
}

export const localeStore = $state<{ current: Locale }>({
    current: readInitialLocale(),
})

overwriteGetLocale(() => localeStore.current)

function persist(locale: Locale) {
    if (typeof document === 'undefined') return
    document.cookie = `${storageKey}=${locale}; path=/; max-age=34560000; samesite=lax`
}

export function setClientLocale(locale: Locale) {
    localeStore.current = locale
    persist(locale)
}
