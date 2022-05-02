
import "@testing-library/react"
import ReactDOM from "react-dom"
import { render, screen, fireEvent} from "@testing-library/react"
import PaginationComponent from "./pagination.component"
import {BrowserRouter as Router} from 'react-router-dom';

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

describe("PaginationComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><PaginationComponent hasNext={true} hasPrev={true} perPage={10} total={60}/></Router>, div);
  })

  it('navigates to next page and then returns to initial page', () => {
    render(<Router><PaginationComponent hasNext={true} hasPrev={true} perPage={10} total={200}/></Router>)
    expect(screen.getByLabelText("prev-button")).toBeInTheDocument()
    expect(screen.getByLabelText("next-button")).toBeInTheDocument()

    const nextButton = screen.getByLabelText("next-button")
    fireEvent.click(nextButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/products?page=2")

    const prevButton = screen.getByLabelText("prev-button")
    fireEvent.click(prevButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/products?page=0")
  })

  it('navigates to page 2', () => {
    render(<Router><PaginationComponent hasNext={true} hasPrev={true} perPage={10} total={60}/></Router>)
    const page2 = screen.getByText("2")
    fireEvent.click(page2);
    expect(mockedNavigate).toHaveBeenCalledWith("/products?page=2")
  })
})

