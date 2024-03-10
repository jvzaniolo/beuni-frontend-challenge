import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'
import { Toaster } from 'sonner'

export const links: LinksFunction = () => [
  {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    rel: 'stylesheet',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col">
        <header className="container mx-auto px-8 py-6">
          <Link to="/" className="text-3xl">
            <span className="font-semibold">be</span>
            <span className="font-bold text-orange-500">uni</span>
          </Link>
        </header>
        {children}
        <footer className="container relative mx-auto mt-auto px-8 before:absolute before:inset-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-200 before:to-transparent">
          <div className="flex flex-col justify-between gap-8 py-6 md:flex-row md:items-center">
            <div className="text-3xl">
              <span className="font-semibold">be</span>
              <span className="font-bold text-orange-500">uni</span>
            </div>

            <p className="text-sm text-black/40">
              © 2024 BeUni - Todos os direitos reservados.
            </p>
          </div>
        </footer>
        <Toaster position="top-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
