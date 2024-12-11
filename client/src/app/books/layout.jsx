"use client";

import React, { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import store from "@/redux/store";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
