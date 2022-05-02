
import "@testing-library/react"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {BrowserRouter as Router} from 'react-router-dom';
import { act, render, screen, fireEvent } from "@testing-library/react"
import ReactDOM from "react-dom"
import NavigationComponent from "./navigation.component";

let store: any

const initialState = {data: {navOption: "planets", isMobileNavOpen: false}}

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

describe("UserInfoComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', async () => {
    const div = document.createElement('div');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      store = mockStore(initialState)
      ReactDOM.render(<Provider store={store}><Router><NavigationComponent/></Router></Provider>, div);
    });
  })

  it("Should navigate to route page when navigation option is clicked", async () => {
    render(<Provider store={store}><Router><NavigationComponent/></Router></Provider>)
    const navOption = screen.getByTestId(`products_navigation`)
    fireEvent.click(navOption);
    expect(mockedNavigate).toHaveBeenCalledWith(`/products?page=1`);
  })
})

