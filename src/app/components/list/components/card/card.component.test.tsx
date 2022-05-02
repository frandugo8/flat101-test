import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import CardComponent from "./card.component";

const product = {
  "id": "5a934e000102030405000000",
  "name": "test",
  "description": "test",
  "imageURL": "https://images.app.goo.gl/XLVk3hosjmTHeLkHA",
  "price": 249
}

describe("CardComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CardComponent product={product}/>, div)
  })

  it('must change fav icon to fav-filled icon when fav button is clicked', () => {
    render(<CardComponent product={product}/>)
    const button = screen.getByLabelText("fav-button")
    const favIcon = screen.getByAltText("fav")
    const favFilledIcon = screen.getByAltText("fav-filled")
    expect(favIcon).toHaveStyle("visibility: visible");
    expect(favFilledIcon).toHaveStyle("visibility: hidden");
    fireEvent.click(button)
    expect(favIcon).toHaveStyle("visibility: hidden");
    expect(favFilledIcon).toHaveStyle("visibility: visible")
  })

  it('must show default product image if image loading has errors', () => {
    render(<CardComponent product={product}/>)
    const productImage = screen.getByAltText("product_image")
    const defaultPoductImage = screen.getByAltText("default_image")
    fireEvent.error(productImage)
    expect(defaultPoductImage).toHaveStyle("display: block");
    expect(productImage).toHaveStyle("display: none");
  })

  it('must show product image if image loading has not errors', () => {
    render(<CardComponent product={product}/>)
    const productImage = screen.getByAltText("product_image")
    const defaultPoductImage = screen.getByAltText("default_image")
    fireEvent.load(productImage)
    expect(defaultPoductImage).toHaveStyle("display: none");
    expect(productImage).toHaveStyle("display: block");
  })
})