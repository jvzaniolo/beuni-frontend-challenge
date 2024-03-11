import { Link } from '@remix-run/react'

type ButtonProps =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.ComponentProps<typeof Link>

export function Button({ children, ...props }: ButtonProps) {
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
      className="relative inline-flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-400 px-3 py-2 font-semibold tabular-nums text-white shadow focus:outline focus:outline-2 focus:outline-offset-2 aria-busy:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-zinc-500 aria-disabled:shadow-none md:text-sm"
      {...props}
    >
      {props['aria-busy'] === 'true' ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center">
            <LoaderIcon className="h-5 w-5 animate-spin" />
          </span>
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

function LoaderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  )
}
