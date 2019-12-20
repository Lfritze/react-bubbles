import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then(res => {
        let getColors = res.data;
        setColorList(getColors);
      })
      .catch(err => {
        console.log("error getting colors", err.res);
      });
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

// fetch your colors data from the server when the component mounts
// set that data to the colorList state property
