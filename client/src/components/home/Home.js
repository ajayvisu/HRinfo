import React from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import Login from "../login/Login";
import { Image } from "antd";

function Home() {
  return (
    <>
      <img className="hr_bg_img" src="hm_bg.webp" alt="hr_bg_image"></img>
      <img className="logo_img" src="logo.jpg" alt="hrinfo logo"></img>

      <div className="text_h1">
        <h1>
          Human Resorces management <br /> in one click
        </h1>
      </div>

      <div className="caro">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="cr_img1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="cr_img2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="cr_img3.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="login_component">
        <Login />
      </div>

      <div className="hm_imges">
        <Image.PreviewGroup>
          <Image width={200} src="cr_img1.jpg" />
          <Image width={200} src="cr_img2.jpg" />
          <Image width={200} src="cr_img1.jpg" />
          <Image width={200} src="cr_img2.jpg" />
        </Image.PreviewGroup>
      </div>
    </>
  );
}

export default Home;
