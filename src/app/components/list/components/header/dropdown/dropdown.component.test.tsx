import "@testing-library/react"
import ReactDOM from "react-dom"
import { fireEvent, render, screen } from "@testing-library/react";
import HeaderDropdownComponent from "./dropdown.component";

describe("DropdownComponent", () => {
  const handleSelection = jest.fn();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeaderDropdownComponent handleSelection={handleSelection}/>, div);
  })

  it('must show dropdown options after clicking dropdownButton, after it selects one option', () => {
    render(<HeaderDropdownComponent handleSelection={handleSelection}/>)
    const dropdownButton = screen.getByLabelText("dropdown-button")
    expect(screen.queryByTestId("dropdown-list")).not.toBeInTheDocument()
    fireEvent.click(dropdownButton)
    expect(screen.getByTestId("dropdown-list")).toBeInTheDocument()
    const dropdowntOption = screen.getByText("Precio: de más bajo a más alto")
    expect(dropdowntOption).toBeInTheDocument()
    fireEvent.click(dropdowntOption)
    expect(screen.queryByTestId("dropdown-list")).not.toBeInTheDocument()
  })
})