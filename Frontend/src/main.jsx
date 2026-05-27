import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <CartProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </CartProvider>
    </BrowserRouter>
  </Provider>
);