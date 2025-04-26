import React from 'react'
import useOutsideClick from '../../hooks/detectClick'
import { IProduct } from '../../models/product'
import productService from '../../services/product.service'



const ProductSearch: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [show, setShow] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>()
  const searchRef = React.useRef<HTMLDivElement>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      productService.searchProducts(e.target.value)
        .then(response => {
          setShow(true)
          if (response.data.length === 0) {
            setError('No products found for ' + e.target.value.slice(0,20))
            setProducts([])
          } else {
            setError(undefined)
            setProducts(response.data)
          }
        })
        .catch(() => {
          setError('No products found')
        })
    }else {

      setShow(false)
    }
  }

  useOutsideClick([searchRef], () => setShow(false))

  return (
    <div className="xl:w-96 w-96">
      <div className="relative flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 block w-[1%] min-w-0 flex-auto rounded-t border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-400 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1" onChange={handleSearch} />
        {
          show &&

          <div className='absolute top-9 w-full' ref={searchRef}>

            <table className='w-full l bg-white rounded-b-lg overflow-hidden shadow-sm shadow-slate-500'>
              <thead>

                <tr>
                  <th>

                  </th>
                </tr>

              </thead>
              <tbody className='w-full divide-y-2 divide-slate-100'>
                {
                  error != undefined ? (
                    <tr className='bg-white w-full'>
                      <td className='px-6 py-4 w-full ' >
                        {error}
                      </td>
                    </tr>
                  ) : null
                }
                {
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className='bg-white cursor-pointer w-full'
                      data-bs-toggle={"modal"}
                      data-bs-target={"#modal" + product.id}
                    >
                      <td className='px-6 py-4 whitespace-nowrap  w-full'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            <img
                              className='h-10 w-10 rounded-full'
                              src={process.env.PUBLIC_URL + "/images/" + product.imageName}
                              alt=''
                              loading='lazy'
                            />
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{product.name}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{product.price} €</div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductSearch