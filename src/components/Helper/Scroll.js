import React, { useEffect, useState } from "react";
import "../../CSS/Scroll.css";
import { BsChevronDoubleUp } from "react-icons/bs";
function Scroll() {
  const [scrollButton, setScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.screenY > 100) {
        setScrollButton(true);
      } else {
        setScrollButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="Scroll" onClick={scrollUp}>
      <BsChevronDoubleUp />
    </div>
  );
}

export default Scroll;
