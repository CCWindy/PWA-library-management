import React from 'react';

import image from '../../assets/images/image.png';

import './detail.scss';

function Detail() {
  return (
    <div className="detail">
      <div className="image-container">
        <img src={image} />
        <div>
          <h1>Book1</h1>
        </div>
      </div>
    </div>
  );
}

export default Detail;
