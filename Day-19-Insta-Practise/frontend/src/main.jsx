import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "../src/style.scss";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./features/auth/auth.context.jsx";


createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
);
