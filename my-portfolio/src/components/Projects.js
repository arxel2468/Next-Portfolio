"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; 
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Voice from '../../public/images/voice.jpeg';
import Food from '../../public/images/food.png';
import Automate from '../../public/images/automate.jpg';
import Movie from '../../public/images/movie.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section id="projects" className="py-16 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My AI/ML Creations</h2>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="swiper-container"
        >
          <SwiperSlide>
          <a href="https://github.com/arxel2468/food" target="_blank" rel="noopener noreferrer" className="block">
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg card-hover">
              <Image
                src={Food}
                alt="Food Recipes Rating System"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Food Recipe Ratings</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Discover top recipes rated by real user feedback, powered by sentiment analysis.
              </p>
            </div>
            </a>
          </SwiperSlide>

          <SwiperSlide>
          <a href="https://github.com/arxel2468/movies-recommender" target="_blank" rel="noopener noreferrer" className="block">
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg card-hover">
              <Image
                src={Movie}
                alt="Movies Recommender"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Movie Recommender</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get personalized movie recommendations based on your favorite picks.
              </p>
            </div>
            </a>
          </SwiperSlide>

          <SwiperSlide>
          <a href="https://github.com/arxel2468/automation-with-python" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg card-hover">
              <Image
                src={Automate}
                alt="Automating Real-World Tasks with Python"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Python Automation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Automating tasks with Python—from image edits to email alerts.
              </p>
            </div>
            </a>
          </SwiperSlide>

          <SwiperSlide>
          <a href="https://github.com/arxel2468/voice-website-generator" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg card-hover">
              <Image
                src={Voice}
                alt="Voice Website Generator"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Voice Website Builder</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create websites with your voice—quick, easy, and tailored.
              </p>
            </div>
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
