// This component displays the main page of the app. it fetches images from the api below and keeps track of amount of liked pics, and the peviously liked pics so it can display the values
import React, { useState, useEffect } from "react";
import "../styles/PicSlider.css";
import "../styles/LikedPics.css";
const PicSlider = ({ onLike }) => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mostRecentlyLikedPhoto, setMostRecentlyLikedPhoto] = useState(null);
  const [likedPhotosCount, setLikedPhotosCount] = useState(0);

  useEffect(() => {
    fetch("https://api.pexels.com/v1/search?query=nature&per_page=10&page=1", {
      headers: {
        Authorization:
          "IptXyT19POQ6YnPetu4EYuXfVHgF8uG14CGL2T7xkpT7JXsj68Hy6CiN",
      },
    })
      .then((response) => response.json())
      .then((data) => setImages(data.photos));
  }, []);

  const handleLike = () => {
    const currentImage = images[currentImageIndex];
    onLike(currentImage);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setMostRecentlyLikedPhoto(currentImage);
    setLikedPhotosCount((prevCount) => prevCount + 1);
  };

  const handleDislike = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="pic-slider-container">
      {currentImage && (
        <div id="picNbuttonsBorder">
          <div id="picNbuttons">
            <button
              className="pic-slider-button pic-slider-like"
              onClick={handleLike}
            >
              Like
            </button>
            <img
              id="MainPic"
              pic-slider-image=""
              src={currentImage.src.medium}
              alt={currentImage.photographer}
              style={{ maxWidth: "100%" }}
            />
            <div>
              <button
                className="pic-slider-button pic-slider-dislike"
                onClick={handleDislike}
              >
                Dislike
              </button>
            </div>
          </div>
          <div id="comparasion">
            {mostRecentlyLikedPhoto && (
              <div id="RecentlyLikedBox">
                <h3 id="RecentlyLikedPicText">Liked Photos</h3>
                <div id="RecentlyLikedCounter" className="counter">
                  {likedPhotosCount}
                </div>
                <img
                  id="RecentlyLikedPic"
                  src={mostRecentlyLikedPhoto.src.medium}
                  alt={mostRecentlyLikedPhoto.photographer}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PicSlider;
