import { RouterProvider } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { router } from "./router";
import './custom.css'

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
