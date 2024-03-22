import { Link } from '@remix-run/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Search } from '~/routes/search'

export function Header({ animate = false }: { animate?: boolean }) {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const fontSize = useTransform(
    scrollYProgress,
    [0, 0.02],
    ['2.25rem', '1.5rem'],
  )
  const shouldAnimate = animate && !shouldReduceMotion

  return (
    <header className="container mx-auto flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="focus:outline-offset-2">
        <motion.span style={{ fontSize: shouldAnimate ? fontSize : '2.25rem' }}>
          <span className="font-semibold">be</span>
          <span className="font-bold text-orange-500">uni</span>
        </motion.span>
      </Link>

      <div className="w-full sm:max-w-sm">
        <Search />
      </div>
    </header>
  )
}
