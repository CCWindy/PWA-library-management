import React from 'react';

import './home.scss';

import image from '../../assets/images/image.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="title">
        <h1>CV Library</h1>
      </div>
      <div className="content-container">
        <Link to="/detail">
          <div className="book-container">
            <div className="img-container">
              <img src={image} />
            </div>
            <div className="info-container">
              <div>
                <h2>解忧杂货店</h2>
              </div>
              <div>作者: （日）东野圭吾</div>
            </div>
          </div>
        </Link>
        <Link to="/detail">
          <div className="book-container">
            <div className="img-container">
              <img src={image} />
            </div>
            <div className="info-container">
              <div>
                <h2>追风筝的人</h2>
              </div>
              <div>作者: （美）卡乐德 胡赛尼</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
