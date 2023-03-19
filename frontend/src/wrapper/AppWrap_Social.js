import React from "react";
import SocialMedia from "../container/SocialMedia/SocialMedia";

const AppWrap_Social = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">@2023 ANISH</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
      </div>
    );
  };

export default AppWrap_Social;
