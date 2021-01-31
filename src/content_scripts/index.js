import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import App from "src/content_scripts/App";

const waysDiv = document.createElement("osm-id-parser");
document.body.append(waysDiv);
render(<App />, waysDiv);
