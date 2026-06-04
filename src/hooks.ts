import type { Reroute } from '@sveltejs/kit'
import { base } from '$app/paths'
import { deLocalizeUrl } from '$lib/paraglide/runtime'

export const reroute: Reroute = ({ url }) => {
    const pathname =
        url.pathname === base
            ? '/'
            : url.pathname.startsWith(`${base}/`)
              ? url.pathname.slice(base.length)
              : url.pathname

    const routedUrl = new URL(url)
    routedUrl.pathname = pathname || '/'

    return deLocalizeUrl(routedUrl).pathname
}
