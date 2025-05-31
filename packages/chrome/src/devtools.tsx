import React from "react";
import apiTrackerHTML from "./devtool-panels/api-tracker/api-tracker.html";

chrome.devtools.panels.create("API Tracker", null, apiTrackerHTML);

function IndexDevtools() {
  return (
    <h2>
      Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
    </h2>
  );
}

export default IndexDevtools;
