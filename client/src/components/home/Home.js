import React, { useState } from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  return (
    <div>
      <img className="hr_bg_img" src="hm_bg.webp" alt="hr_bg_image"></img>
      <img className="logo_img" src="logo.jpg" alt="hrinfo logo"></img>
      <h1>
        Human Resorces management <br /> in one click
      </h1>

      <div className="caro">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="cr_img1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="cr_img2.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="cr_img3.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      </div>
)}

export default Home;
