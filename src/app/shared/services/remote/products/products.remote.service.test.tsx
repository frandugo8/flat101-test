
import "@testing-library/react"
import { ProductsRemoteService } from "./products.remote.service";

describe("ProductsRemoteService", () => {
  let fetch: typeof global.fetch;

  beforeAll(() => {
    fetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = fetch;
  });

  it('should get products data when getProducts method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}])
    
    const results = 10
    const sortBy = "name"
    const sortOption = 1
    const page = "1"
    const search = "L"
    const products = await ProductsRemoteService.getProducts(results, sortBy, sortOption, page, search)
  
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_PRODUCTS}?results=${results}&sortBy=${sortBy}&sortOption=${sortOption}${page !== null? `&page=${page}` : ""}${search? `&search=${search}` : ""}`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    )

    expect(products).toStrictEqual([{}])
  })

  it('should post product when saveProduct method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}])
    const url = `${process.env.REACT_APP_PRODUCTS}.product`
    const product = {
      "id": "5a934e000102030405000000",
      "name": "test",
      "description": "test",
      "imageURL": "https://images.app.goo.gl/XLVk3hosjmTHeLkHA",
      "price": 249
    }

    const result = await ProductsRemoteService.saveProduct(product)
  
    expect(global.fetch).toHaveBeenCalledWith(url,
      expect.objectContaining({
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
    )

    expect(result).toStrictEqual([{}])
  })
})