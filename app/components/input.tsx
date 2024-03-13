import { forwardRef } from 'react'

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    className="w-full rounded-lg border border-zinc-200 shadow-sm md:text-sm"
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
