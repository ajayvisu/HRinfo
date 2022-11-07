import React, { useEffect, useState } from 'react'
import "./Home.css";
import axios from 'axios';
const Home = () => {
  
    
  useEffect(() => {
  

  }, [])
  return (
    <div>
     <header>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHzyMlSh8Bo_RDS5UYpw-YreCFb0ajENS2w&usqp=CAU" class="profile-img"/>
            <nav>
                <ul>
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="">Login</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <div>
            <section id="hero">
                <div class="section-inner">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHzyMlSh8Bo_RDS5UYpw-YreCFb0ajENS2w&usqp=CAU" class="profile-img"/>
                    <h1>Hi, I'm Boberick the llama.</h1>
                </div>
            </section>
            </div>
            <div>
            <section id="about">
                <div class="section-inner">
                    <h2>About me</h2>
                    <p>I'm a really awesome llama. Every day I wake up, munch on some grass, do some coding and then go back to sleep.</p>
                    <h3>Achievements</h3>
                    <ul>
                        <li>Bachelor of photogenic posing, 2010</li>
                        <li>Llamaness certification from the Llama Institute, 2014</li>
                        <li>I coded a website, 2017</li>
                    </ul>
                </div>
            </section>
            </div>
            <div>
            <section id="contact">
                <div class="section-inner">
                    <h2>Contact me</h2>
                    <p>You can find me on:</p>
                    <ul>
                        <li><a href="https://twitter.com/llama">Twitter</a></li>
                        <li><a href="https://www.reddit.com/user/llama">Reddit</a></li>
                        <li><a href="https://www.instagram.com/llamasporfavor/">Instagram</a></li>
                    </ul>
                    <p>Or, you can <a href="mailto:llama@codetheweb.blog">send me an email</a>.</p>
                </div>
            </section>
            </div>
        </main>
        <footer>
            © Copyright Boberick The Llama, 2017
        </footer>
    </div>
  );
};

export default Home;
