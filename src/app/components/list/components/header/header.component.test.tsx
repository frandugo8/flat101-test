
import "@testing-library/react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import HeaderComponent from "./header.component"

let store: any
const initialState = {dispatch: {}, data: {isMobileNavOpen: false}}
const handleSelection = jest.fn();
const handleSearch = jest.fn();

describe("HeaderComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <HeaderComponent
          handleSelection={handleSelection}
          handleSearch={handleSearch}/>
      </Provider>,
    div)
  })
})