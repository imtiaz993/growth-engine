import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleProvider } from "@ant-design/cssinjs";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StyleProvider hashPriority="high">
      <BrowserRouter>
        <App />
        </BrowserRouter>
      </StyleProvider>
    </Provider>
  </StrictMode>
);
