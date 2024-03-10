import { Link } from '@remix-run/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export function Header({ animate = false }: { animate?: boolean }) {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const height = useTransform(scrollYProgress, [0, 0.02], [102, 60])
  const fontSize = useTransform(
    scrollYProgress,
    [0, 0.02],
    ['2.25rem', '1.5rem'],
  )
  const shouldAnimate = animate && !shouldReduceMotion

  return (
    <motion.header
      className="container mx-auto flex shrink-0 items-center px-8"
      style={{ height: shouldAnimate ? height : 102 }}
    >
      <Link to="/" className="focus:outline-offset-2">
        <motion.span style={{ fontSize: shouldAnimate ? fontSize : '2.25rem' }}>
          <span className="font-semibold">be</span>
          <span className="font-bold text-orange-500">uni</span>
        </motion.span>
      </Link>
    </motion.header>
  )
}
