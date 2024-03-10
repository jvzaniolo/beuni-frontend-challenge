import { Link } from '@remix-run/react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Header() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 0.008], [102, 40])
  const fontSize = useTransform(
    scrollYProgress,
    [0, 0.008],
    ['2.25rem', '1.5rem'],
  )

  return (
    <motion.header
      className="container mx-auto flex shrink-0 items-center px-8"
      style={{ height }}
    >
      <Link to="/" className="focus:outline-offset-2">
        <motion.span style={{ fontSize }}>
          <span className="font-semibold">be</span>
          <span className="font-bold text-orange-500">uni</span>
        </motion.span>
      </Link>
    </motion.header>
  )
}
