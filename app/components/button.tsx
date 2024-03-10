import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react'

export function Button({
  children,
  ...props
}:
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.ComponentProps<typeof Link>) {
  return 'to' in props ? (
    <Link
      className="inline-flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-400 px-3 py-2 font-semibold tabular-nums text-white shadow focus:outline focus:outline-2 focus:outline-offset-2 md:text-sm"
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      className="relative inline-flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-400 px-3 py-2 font-semibold tabular-nums text-white shadow focus:outline focus:outline-2 focus:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-zinc-500 aria-disabled:shadow-none md:text-sm"
      {...props}
    >
      {props['aria-busy'] === 'true' ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center">
            <ArrowPathIcon
              className="h-5 w-5 animate-spin"
              aria-hidden="true"
            />
          </span>
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
