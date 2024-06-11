import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = getResponse(request)

  response.headers.append('Deno' in globalThis ? 'x-deno' : 'x-node', Date.now().toString())
  response.headers.set('x-hello-from-middleware-res', 'hello')

  return response
}

const getResponse = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-hello-from-middleware-req', 'hello')

  if (request.nextUrl.pathname === '/static/revalidate-manual') {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.json({ error: 'Error' }, { status: 500 })
}

export const config = {
  matcher: '/static/:path*',
}
