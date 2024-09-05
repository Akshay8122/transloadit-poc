import React from "react";
import theme from "@/theme/themeAntd";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme as any}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
