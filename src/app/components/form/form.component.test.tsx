
import "@testing-library/react"
import ReactDOM from "react-dom"
import { screen, fireEvent, render, act } from "@testing-library/react"
import FormComponent from "./form.component"
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux"
import { ProductsRemoteService } from "../../shared/services/remote/products/products.remote.service"
import {BrowserRouter as Router} from 'react-router-dom';

let store: any
let spies: any

const initialState = {dispatch: {}, data: { isMobileNavOpen: false }}

describe("FormComponent", () => {
  const mockStore = configureStore()

  beforeEach(() => {
    loadSpies()
  })

  it('renders without crashing', async () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><FormComponent/></Router></Provider>, div);
  })

  it("should render the basic form fields", () => {
    store = mockStore(initialState)
    render(<Provider store={store}><Router><FormComponent/></Router></Provider>)
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("description")).toBeInTheDocument();
    expect(screen.getByLabelText("price")).toBeInTheDocument();
    expect(screen.getByLabelText("imageURL")).toBeInTheDocument();
  })

  it("Should send form data when submit button is clicked", async () => {
    store = mockStore(initialState)
    render(<Provider store={store}><Router><FormComponent/></Router></Provider>)
    const nameInput = screen.getByLabelText("name")
    fireEvent.input(nameInput, {target: { value: "edited_name" }})

    const priceInput = screen.getByLabelText("price")
    fireEvent.input(priceInput, {target: { value: 10 }})

    const submitButton = screen.getByLabelText("submit")

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => {
      fireEvent.submit(submitButton)
    })

    expect(spies.productsRemoteService.saveProduct).toHaveBeenCalled()
  })
})

function loadSpies() {
  spies = {
    productsRemoteService: {
      saveProduct: jest.spyOn(ProductsRemoteService, "saveProduct").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({})}))
    }
  }
}
