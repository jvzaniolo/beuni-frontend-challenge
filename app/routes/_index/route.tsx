import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Form, json, useLoaderData, useSearchParams } from '@remix-run/react'
import { Button } from '~/components/button'
import { Select } from '~/components/select'
import { Product } from './product'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const sortBy = url.searchParams.get('sortBy')
  const data = await fetch(
    `https://api.beuni.com.br/atlas/brands/v2/products?sortBy=${sortBy}`
  ).then((res) => res.json())

  return json(data)
}

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const data = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto px-4 pt-10">
      <h1 className="text-3xl font-semibold mb-8">Product list page</h1>

      <Form className="flex gap-3 items-end mb-8 justify-end">
        <div className="flex flex-col">
          <label htmlFor="sortBy" className="text-sm mb-1.5 pl-1">
            Sort by
          </label>
          <Select
            id="sortBy"
            name="sortBy"
            defaultValue={searchParams.get('sortBy') || 'featured'}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price Asc</option>
            <option value="price-desc">Price Desc</option>
          </Select>
        </div>

        <Button type="submit">Filter</Button>
      </Form>

      <ul className="grid grid-cols-4 gap-2">
        {data.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}
