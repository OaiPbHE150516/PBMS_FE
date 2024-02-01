import React from "react";

const Main = ({ children }) => {
  return (
    <>
      <main id="main" class="main">
        {children}
      </main>
    </>
  );
};

export default Main;
