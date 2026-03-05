import React from "react";
import "./features/shared/global.scss";
import { router } from "./app.routes";

import { RouterProvider } from "react-router-dom";
import AuthProvider from "./features/auth/auth.context";
import PostAuthContext from "./features/posts/post.context";

function App() {
  return (
    <AuthProvider>
      <PostAuthContext>
        <RouterProvider router={router} />
      </PostAuthContext>
    </AuthProvider>
  );
}

export default App;
