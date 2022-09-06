import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useId, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slide from '../Slide';
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  console.log(currentSlide);

  const ID1 = useId();

  const ID2 = useId();

  const ID3 = useId();
  useEffect(() => {
    const slideTimer = setTimeout(() => {
      if (currentSlide === 2) {
        setCurrentSlide(0);
        return;
      }
      setCurrentSlide(prev => prev + 1);
    }, 5000);

    return () => {
      clearTimeout(slideTimer);
    };
  });
  const slides = [
    <Slide
      key={ID1}
      brand={'Samsung'}
      model={'GalaxyWatch5'}
      text={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      href={''}
      imageSrc={'./assets/black-galaxy-watch-5-removebg-preview.png'}
    />,
    <Slide
      key={ID2}
      brand={'Apple'}
      model={'Watch S7'}
      text={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      href={''}
      imageSrc={'./assets/apple-s7-red-removebg-preview.png'}
    />,
    <Slide
      key={ID3}
      brand={'Samsung'}
      model={'GalaxyWatch5'}
      text={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      href={''}
      imageSrc={'./assets/white-galaxy-watch-5-removebg-preview.png'}
    />,
  ];
  return (
    <section
      style={{ minHeight: '85vh' }}
      className=" w-full bg-red-100 grid place-items-center lg:p-24 p-5 "
    >
      <div>
        <div className=" ">{slides[currentSlide]}</div>
        <div className="flex justify-center mb-5">
          <button
            data-testid="button-0"
            onClick={() => setCurrentSlide(0)}
            className="px-3 text-red-700"
          >
            {currentSlide !== 0 ? (
              // eslint-disable-next-line react/jsx-no-undef
              <FontAwesomeIcon height={17} icon={faCircle} />
            ) : (
              <FontAwesomeIcon height={17} icon={faDotCircle} />
            )}
          </button>

          <button
            data-testid="button-1"
            onClick={() => setCurrentSlide(1)}
            className="px-3 text-red-700"
          >
            {currentSlide !== 1 ? (
              // eslint-disable-next-line react/jsx-no-undef
              <FontAwesomeIcon height={17} icon={faCircle} />
            ) : (
              <FontAwesomeIcon height={17} icon={faDotCircle} />
            )}
          </button>

          <button
            data-testid="button-2"
            onClick={() => setCurrentSlide(2)}
            className="px-3 text-red-700"
          >
            {currentSlide !== 2 ? (
              <FontAwesomeIcon height={17} icon={faCircle} />
            ) : (
              <FontAwesomeIcon height={17} icon={faDotCircle} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
