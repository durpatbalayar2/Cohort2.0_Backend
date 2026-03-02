import React from "react";
import "./features/shared/global.scss";
import { router } from "./app.routes";

import { RouterProvider } from "react-router-dom";
import AuthProvider from "./features/auth/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
