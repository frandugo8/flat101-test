import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import SuccessfullScreenComponent from "./successfull-screen-form.component";
import {BrowserRouter as Router} from 'react-router-dom';

const handleNewProduct = jest.fn();
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

describe("SuccessfullScreenForm", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Router><SuccessfullScreenComponent handleNewProduct={handleNewProduct}/></Router>, div)
  })

  it('must show new product window after clicking "register another product" button', () => {
    render(<Router><SuccessfullScreenComponent handleNewProduct={handleNewProduct}/></Router>)
    const button = screen.getByText("Registrar otro producto")
    fireEvent.click(button)
    expect(handleNewProduct).toHaveBeenCalled()
  })

  it('must navigate to /products after clicking "show product list" button', () => {
    render(<Router><SuccessfullScreenComponent handleNewProduct={handleNewProduct}/></Router>)
    const button = screen.getByText("Ver lista")
    fireEvent.click(button)
    expect(mockedNavigate).toHaveBeenCalledWith("/products/page=1")
  })
})