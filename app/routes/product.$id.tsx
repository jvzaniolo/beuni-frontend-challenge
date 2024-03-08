import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'

type Product = {
  id: number
  name: string
  slug: string
  description: string
  categories: string[]
  brand: string | null
  supplier: string
  image: { id: number; url: string }[]
  hasFreeShipping: boolean
  price: number
  rating: number
  recordId: string
  colorOptions: string[]
  priceLists: { id: number; price: number; minimumQuantity: number }[]
  total_stock: number
}

// product: {
//   id: 192,
//   name: 'Cartela de Adesivo A5',
//   slug: 192,
//   description: 'Cartela de Adesivo / Sticker tamanho a5 (210 x 148 mm) com até 9 adesivos coloridos e destacáveis.\n' +
//     '\n',
//   categories: [ 'rec6cM5duZjFkh0Gh' ],
//   brand: null,
//   supplier: 'reckLbWWkng2dCFXt',
//   image: [ [Object] ],
//   hasFreeShipping: true,
//   price: 9.898,
//   rating: 5,
//   recordId: 'recM4QWHwI4asGjBc',
//   colorOptions: [ 'primary', 'success', 'warning', 'danger', 'info' ],
//   priceLists: [ [Object] ],
//   minimumQuantity: 50,
//   total_stock: 0
// }

export async function loader({ params }: LoaderFunctionArgs) {
  const data: { product: Product } = await fetch(
    `https://api.beuni.com.br/atlas/brands/v2/products/${params.id}`,
  ).then((res) => res.json())

  return json(data)
}

export default function ProductPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Product {data.product.name}</h1>
    </div>
  )
}
