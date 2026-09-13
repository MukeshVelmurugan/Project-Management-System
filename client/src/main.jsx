import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: "12px",
              background: "#ffffff",
              color: "#111827",
              fontWeight: "500",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: {
                primary: "#2563EB",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#DC2626",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <App />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);