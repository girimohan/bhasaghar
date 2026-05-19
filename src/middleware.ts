import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // 1. Refresh Supabase session (must run on every request to keep session alive)
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — do NOT use getUser() here for performance;
  // auth validation happens in protected layouts/pages
  await supabase.auth.getSession()

  // 2. Handle i18n routing (locale prefix detection + redirect)
  const i18nResponse = handleI18nRouting(request)

  // If next-intl issued a redirect (e.g. /about → /en/about), forward it
  if (i18nResponse.status !== 200) {
    // Carry session cookies into the redirect response
    response.cookies.getAll().forEach((cookie) => {
      i18nResponse.cookies.set(cookie.name, cookie.value)
    })
    return i18nResponse
  }

  // Return the Supabase-refreshed response (with updated session cookies)
  return response
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
