
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeaderComponent from './components/header/header.component';
import styles from './list.module.scss';
import PaginationComponent from './components/pagination/pagination.component';
import { SortOptionsType } from '../../shared/models/sort-options.type';
import { ProductsRemoteService } from '../../shared/services/remote/products/products.remote.service';
import { Product } from '../../shared/models/product.interface';
import CardComponent from './components/card/card.component';
import { useAppDispatch } from '../../shared/redux/store/store';
import { setNavOption } from '../../shared/redux/slices/data.slice';

interface Response {
  total: number
  page: Number
  pageSize: Number
  hasPrev: boolean
  hasNext: boolean
  products: Array<Product>
  error?: string
}

export default function ListComponent() {
  const PER_PAGE = 10

  const [productsToShow, setProductsToShow] = useState<Array<any>>([])
  const [searchParams] = useSearchParams()
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [hasPrev, setHasPrev] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [sortBy, setSortBy] = useState<SortOptionsType>("name")
  const [sortOption, setSortOption] = useState<1 | -1>(1)
  const [search, setSearch] = useState<string>("")
  const [products, setProducts] = useState<Array<Product>>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setNavOption({navOption: "products"}))
  })

  useEffect(() => {
    ProductsRemoteService.getProducts(PER_PAGE, sortBy, sortOption, searchParams.get("page"), search).then(async (fetch: any) => {
      const response: Response = await fetch.json()

      if (!response.error) {
        setProducts(products)
        setProductsToShow(response.products)
        setHasNext(response.hasNext)
        setHasPrev(response.hasPrev)
        setTotal(response.total)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, searchParams, sortBy, sortOption])

  const handleSearch = (text: string): void => {
    setSearch(text)
  }

  const handleDropdownSelection = (sortBy: SortOptionsType, isDesc: boolean): void => {
    setSortBy(sortBy)
    setSortOption(isDesc? 1 : -1)
  }

  return (
    <div className={styles.wrapper}>
      <HeaderComponent handleSearch={handleSearch} handleSelection={handleDropdownSelection}/>

      <div className={styles.list}>
        <div className={styles.content}>
          {productsToShow.length !== 0? 
            <div className={styles.content__elements}>
              {productsToShow.map((product: Product, index: number) => 
                <CardComponent
                  key={index}
                  product={product}/>
              )}
            </div>
          : <span className={styles.content__default}>0 productos</span>}

          <PaginationComponent hasNext={hasNext} hasPrev={hasPrev} perPage={PER_PAGE} total={total}/>
        </div>

      </div>

    </div>
  )
}

