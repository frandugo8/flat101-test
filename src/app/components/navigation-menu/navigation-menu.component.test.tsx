
import "@testing-library/react"
import ReactDOM from "react-dom"
import NavigationMenuComponent from "./navigation-menu.component";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';

let initialState = {dispatch: {}, data: {navOption: "planets"}}
let store: any

describe("NavigationMenuComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><NavigationMenuComponent/></Router></Provider>, div);
  })
})