import React, { useEffect } from "react";

const App = () => {
  console.log("I'm osm-id-parser");

  useEffect(() => {
    console.log("osm-id-parser init");
    const addMapClickListener = () => {
      console.log("addMapClickListener");
      const onMapClick = async (e) => {
        const className = e.target.className.baseVal;
        console.log("click map: ", className);
        if (className.indexOf("way") !== -1) {
          console.log("click way: ", className);
          const wayId = className
            .split(" ")
            .pop()
            .split("-")[0]
            .replace("w", "");
          await navigator.clipboard.writeText(wayId);
        }
        if (className.indexOf("node") !== -1) {
          console.log("click node: ", className);
          const nodeId = /n(\d+)/.exec(className)[1].replace("n", "");
          await navigator.clipboard.writeText(nodeId);
        }
      };
      const map = document
        .querySelector("#map iframe")
        .contentDocument.querySelector("#id-container");
      if (map) {
        map.addEventListener("click", onMapClick);
      } else {
        setTimeout(addMapClickListener, 500);
      }
      return () => {
        map.removeEventListener("click", onMapClick);
      };
    };
    addMapClickListener();
  }, []);

  return <div />;
};

export default App;
