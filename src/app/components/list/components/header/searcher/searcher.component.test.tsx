import "@testing-library/react"
import ReactDOM from "react-dom"
import SearcherComponent from "./searcher.component";
import { fireEvent, render, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

describe("SearcherComponent", () => {
  const handleSearch = jest.fn();

  const initialProps = {
    handleSearch
  }

  const initialState = {data: {}}

  let store: any
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><SearcherComponent {...initialProps}/></Provider>, div);
  });

  it('after input text must send it to parent component', () => {
    render(<Provider store={store}><SearcherComponent {...initialProps}/></Provider>)
    const input = screen.getByPlaceholderText("Buscar productos")
    fireEvent.input(input, {target: {value: "A"}})
    fireEvent.keyDown(input, {key: "Enter"})
    expect(handleSearch).toHaveBeenCalled()
  });

  it('after clicking searchButton the text must send it to parent component', () => {
    render(<Provider store={store}><SearcherComponent {...initialProps}/></Provider>)
    const button = screen.getByTestId("search-button")
    fireEvent.click(button)
    expect(handleSearch).toHaveBeenCalled()
  });
})