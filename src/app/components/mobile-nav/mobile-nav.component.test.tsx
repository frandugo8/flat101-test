
import "@testing-library/react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import MobileNavComponent from "./mobile-nav.component"
import { render, screen } from "@testing-library/react"
import {BrowserRouter as Router} from 'react-router-dom';


let store: any
let initialState = {data: {isMobileNavOpen: false}}

describe("MobileNavComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><MobileNavComponent/></Router></Provider>, div);
  })

  it('must show mobile navigation when isMobileNavOpen is falsy', () => {
    const initialState = {data: {isMobileNavOpen: false}}
    store = mockStore(initialState)
    render(<Provider store={store}><Router><MobileNavComponent/></Router></Provider>)
    expect(screen.queryByTestId("mobile-nav")).not.toBeInTheDocument();
  })

  it('must show mobile navigation when isMobileNavOpen is truly', () => {
    const initialState = {data: {isMobileNavOpen: true}}
    store = mockStore(initialState)
    render(<Provider store={store}><Router><MobileNavComponent/></Router></Provider>)
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  })
})

