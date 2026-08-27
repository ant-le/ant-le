import type { RequestHandler } from './$types'

export const prerender = false

export const GET: RequestHandler = () => new Response('ok\n')
