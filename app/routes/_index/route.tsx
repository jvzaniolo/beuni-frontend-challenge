import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import {
  Await,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useSearchParams,
} from '@remix-run/react'
import { Suspense } from 'react'
import { Button } from '~/components/button'
import { Label } from '~/components/label'
import { Select } from '~/components/select'
import { getProducts } from '~/products'
import { getErrorMessage } from '~/utils'
import { Pagination } from './pagination'
import { Product } from './product'
import { Skeleton } from './skeleton'

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
  url.searchParams.set('perPage', '12')
  return defer({ data: getProducts(url.searchParams) })
}

export default function HomePage() {
  const promise = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="container mx-auto px-4 pb-8 pt-4">
      <div className="mb-10 flex flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-semibold md:text-3xl">Produtos</h1>
          <p className="max-w-md text-base tracking-wide text-zinc-950/55 md:text-lg lg:max-w-none">
            Encontre os melhores brindes personalizados para sua empresa.
          </p>
        </div>

        <div className="flex flex-col sm:ml-auto">
          <Label htmlFor="sortBy">Ordenar por</Label>
          <Select
            id="sortBy"
            name="sortBy"
            defaultValue={searchParams.get('sortBy') || 'featured'}
            onChange={(e) =>
              setSearchParams((prev) => {
                prev.set('sortBy', e.target.value)
                return prev
              })
            }
          >
            <option value="featured">Recomendados</option>
            <option value="price-asc">Preço ascendente</option>
            <option value="price-desc">Preço descendente</option>
          </Select>
        </div>
      </div>

      <Suspense fallback={<Skeleton />}>
        <Await resolve={promise.data}>
          {(data) => (
            <>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.products.length > 0 ? (
                  data.products.map((product) => (
                    <Product key={product.id} product={product} />
                  ))
                ) : (
                  <p className="px-4">Nenhum produto encontrado.</p>
                )}
              </ul>

              <div className="my-8 flex justify-center">
                <Pagination
                  currentPage={Number(searchParams.get('page')) || 1}
                  total={data.total}
                  searchParams={searchParams}
                />
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  const errorMessage = isRouteErrorResponse(error)
    ? error.data
    : getErrorMessage(error)

  return (
    <div className="container mx-auto px-8 pb-8 pt-2">
      <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
        Algo deu errado :/
      </h1>
      <p>{errorMessage}</p>
      <div className="mt-8">
        <Button to="/" replace>
          Tente novamente
        </Button>
      </div>
    </div>
  )
}
