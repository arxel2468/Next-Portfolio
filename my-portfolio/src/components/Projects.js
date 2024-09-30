"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // Coverflow effect for 3D look
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
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
        <h2 className="text-4xl font-bold mb-12">AI/ML Projects</h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          loop={true}
          centeredSlides={true}
          slidesPerView={3} // Show three slides with the center one being prominent
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="swiper-container"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Image
                src="/food.png"
                alt="Food Recipes Rating System"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }} // Fix image stretch
              />
              <h3 className="text-xl font-semibold mb-2">Food Recipes Rating System</h3>
              <p className="text-gray-700 dark:text-gray-300">
                A sentiment analysis-based system where users can post recipes and reviews. Recipes are rated based on user feedback to help others find the best ones.
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Image
                src="/movie.png"
                alt="Movies Recommender"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Movies Recommender</h3>
              <p className="text-gray-700 dark:text-gray-300">
                A content-based movie recommender system that provides five recommendations based on the movie selected from a dropdown menu.
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Image
                src="/automate.jpg"
                alt="Automating Real-World Tasks with Python"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Automating Real-World Tasks with Python</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This project showcases real-world automation using Python, including image modification, data serialization, and sending email messages.
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Image
                src="/voice.jpeg"
                alt="Voice Website Generator"
                width={600}
                height={400}
                className="mb-4 w-full h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">Voice Website Generator</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This project aims to revolutionize website creation by utilizing voice commands as input. Users can simply speak their desired website specifications, and the system will automatically generate a tailored website,
 eliminating the need for traditional coding or design expertise..
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
