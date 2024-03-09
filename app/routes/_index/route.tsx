import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import {
  Form,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSearchParams,
} from '@remix-run/react'
import { Input } from '~/components/input'
import { Label } from '~/components/label'
import { Button } from '~/components/button'
import { Select } from '~/components/select'
import { getProducts } from '~/products'
import { Product } from './product'

export const meta: MetaFunction = () => {
  return [
    { title: 'BeUni - Produtos' },
    {
      name: 'description',
      content: 'Encontre os melhores brindes personalizados para sua empresa.',
    },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const data = await getProducts(url.searchParams)
  return json(data)
}

export default function HomePage() {
  const navigation = useNavigation()
  const [searchParams] = useSearchParams()
  const data = useLoaderData<typeof loader>()

  const isFiltering =
    navigation.state === 'loading' && navigation.formData?.has('filter')

  return (
    <div className="container mx-auto px-4 pb-8 pt-2">
      <div className="px-4">
        <h1 className="mb-2 text-2xl font-semibold md:text-3xl">Produtos</h1>
        <p className="mb-8 text-base tracking-wide text-zinc-950/55 md:text-lg">
          Encontre os melhores brindes personalizados para sua empresa.
        </p>

        <Form className="mb-8 flex flex-wrap items-end gap-3">
          <div className="flex w-full flex-col sm:max-w-xs">
            <Label htmlFor="search">Pesquisar</Label>
            <Input
              id="search"
              name="q"
              type="search"
              placeholder='Pesquise por "tênis" ou "camiseta"'
            />
          </div>

          <div className="flex grow flex-col sm:grow-0">
            <Label htmlFor="sortBy">Ordenar por</Label>
            <Select
              id="sortBy"
              name="sortBy"
              defaultValue={searchParams.get('sortBy') || 'featured'}
            >
              <option value="featured">Recomendados</option>
              <option value="price-asc">Preço ascendente</option>
              <option value="price-desc">Preço descendente</option>
            </Select>
          </div>

          <Button type="submit" name="filter" disabled={isFiltering}>
            {isFiltering ? 'Pesquisando...' : 'Pesquisar'}
          </Button>
        </Form>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.products.length > 0 ? (
          data.products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </ul>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container mx-auto px-8 pb-8 pt-2">
        <h1 className="mb-2 text-2xl font-semibold md:text-3xl">Produtos</h1>
        <p className="mb-8 text-base tracking-wide text-zinc-950/55 md:text-lg">
          Encontre os melhores brindes personalizados para sua empresa.
        </p>
        <p>{error.data}</p>
        <div className="mt-8">
          <Button to="/" replace>
            Tente novamente
          </Button>
        </div>
      </div>
    )
  }
}
