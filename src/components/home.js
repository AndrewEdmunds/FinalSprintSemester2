//This component takes the is almost unnecessary due to me still learning react as i was doing this project but it just displays the PicSlider component

import React, { useState } from "react";
import PicSlider from "./PicSlider";
import "../styles/Home.css";

const Home = () => {
  const [mostRecentlyLikedPhoto, setMostRecentlyLikedPhoto] = useState(null);
  const [likedPhotosCount, setLikedPhotosCount] = useState(0);

  const handleLike = (image) => {
    setMostRecentlyLikedPhoto(image);
    setLikedPhotosCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <PicSlider onLike={handleLike} />
    </div>
  );
};

export default Home;
