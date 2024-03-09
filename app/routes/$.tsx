import { Link } from '@remix-run/react'

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-8">
      <h1 className="mt-4 text-4xl">Página não encontrada.</h1>
      <Link
        to="/"
        className="my-8 inline-block text-orange-500 hover:underline"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
