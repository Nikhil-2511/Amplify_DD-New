import React, { useEffect, useState } from "react";
import "./style.scss";

function MobileNavigationScroll({ tabs, handleTabClick }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    const tabsWrapper = document.querySelector(".main-tabs-wrapper");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    function handleScroll() {
      if (tabsWrapper.scrollLeft > 0) {
        leftArrow.style.display = "block";
      } else {
        leftArrow.style.display = "none";
      }
      if (
        Math.ceil(tabsWrapper.scrollLeft + tabsWrapper.clientWidth) <
        tabsWrapper.scrollWidth-1
      ) {
        rightArrow.style.display = "block";
      } else {
        rightArrow.style.display = "none";
      }
    }
    handleScroll();
    tabsWrapper.addEventListener("scroll", handleScroll);
    return () => {
      tabsWrapper.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollTabs(direction) {
    const tabsWrapper = document.querySelector(".main-tabs-wrapper");
    const scrollAmount = 100; // Adjust as needed

    if (direction === "left") {
      tabsWrapper.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      tabsWrapper.scrollLeft += scrollAmount;
    }
  }

  function handleClick(tab) {
    handleTabClick(tab);
    setSelectedTab(tab);
  }

  return (
    <div className="main-tabs-container w-full">
      <button className="arrow left" onClick={() => scrollTabs("left")}>
        {"<<"}
      </button>
      <div className="main-tabs-wrapper overflow-x-scroll w-full">
        {tabs?.map((tab, idx) => {
          return (
            <div
              onClick={() => handleClick(tab)}
              key={idx}
              className={`tab box-border ${
                tab?.label === selectedTab?.label ? "border-b-4" : ""
              }`}
            >
              {tab?.label}
            </div>
          );
        })}
      </div>
      <button className="arrow right" onClick={() => scrollTabs("right")}>
        {">>"}
      </button>
    </div>
  );
}

export default MobileNavigationScroll;
