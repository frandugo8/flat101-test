
import "@testing-library/react"
import ReactDOM from "react-dom"
import ListComponent from "./list.component"
import {  BrowserRouter as Router} from "react-router-dom";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { act, render, screen, fireEvent} from "@testing-library/react";
import { ProductsRemoteService } from "../../shared/services/remote/products/products.remote.service";


let spies: any
const initialState = {dispatch: {}, data: {navOption: "starships", isMobileNavOpen: false}}
let store: any

describe("ListComponent", () => {
  beforeEach(() => {
    loadSpies()
  })

  const mockStore = configureStore()
  const setup = async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      store = mockStore(initialState)
      render(<Provider store={store}><Router><ListComponent/></Router></Provider>)
    });
  }

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><ListComponent/></Router></Provider>, div);
  })

  it('must show 0 products when there is no product registered yet', async () => {
    await setup()
    expect(spies.productsRemoteService.getEmptyProductList).toHaveBeenCalled()
    expect(screen.getByText("0 productos")).toBeInTheDocument()
  })

  it('must load initial products data', async () => {
    await setup()
    expect(spies.productsRemoteService.getProducts).toHaveBeenCalled()
  })

  it('must load sorted data after searching', async () => {
    await setup()
  
    const input = screen.getByPlaceholderText("Buscar productos")
    fireEvent.input(input, {target: {value: "A"}})

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.keyDown(input, {key: "Enter"})
    });
  
    expect(spies.productsRemoteService.getProducts).toHaveBeenCalled()
  })

  it('must load sorted data after clicking a sort option', async () => {
    await setup()
 
    const dropdownButton = screen.getByLabelText("dropdown-button")
    fireEvent.click(dropdownButton)
    const dropdowntOption = screen.getByText("Precio: de más bajo a más alto")
    expect(dropdowntOption).toBeInTheDocument()

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(dropdowntOption)
    });
  
    expect(spies.productsRemoteService.getProducts).toHaveBeenCalled()
  })
})

function loadSpies() {
  spies = {
    productsRemoteService: {
      getProducts: jest.spyOn(ProductsRemoteService, "getProducts")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(
          {
            total: 2,
            page: 1,
            pageSize: 10,
            hasPrev: false,
            hasNext: false,
            products: [{
              "id": "5a934e000102030405000000",
              "name": "testB",
              "price": 249
            },{
              "id": "5a934e000102030405000001",
              "name": "testA",
              "price": 50
            }
          ]})
      })),

      getEmptyProductList: jest.spyOn(ProductsRemoteService, "getProducts")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(
          {
            total: 2,
            page: 1,
            pageSize: 10,
            hasPrev: false,
            hasNext: false,
            products: []})
      }))
    }
  }
}