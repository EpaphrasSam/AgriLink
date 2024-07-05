import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const getVisibleImages = () => {
    if (images.length === 1) return [currentImageIndex];
    if (images.length === 2) return [0, 1];

    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextIndex = (currentImageIndex + 1) % images.length;
    return [prevIndex, currentImageIndex, nextIndex];
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-96 flex justify-center items-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          {visibleImages.map((index) => (
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className={`absolute w-full h-full ${
                index === currentImageIndex ? "z-10" : "z-0"
              }`}
              style={{
                transform:
                  index === currentImageIndex
                    ? "scale(1.1)"
                    : index === visibleImages[0]
                    ? "translateX(-50%) scale(0.9)"
                    : "translateX(50%) scale(0.9)",
                display:
                  index === currentImageIndex || isLargeScreen
                    ? "block"
                    : "none",
              }}
            >
              <motion.img
                src={images[index]}
                alt={`Product Image ${index + 1}`}
                className="w-full h-full object-fit object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="flex justify-between w-full mt-4">
          <button
            className="bg-opacity-50 p-2"
            onClick={handlePrevImage}
            aria-label="Previous Image"
            disabled={currentImageIndex === 0}
          >
            <TfiArrowCircleLeft size={24} />
          </button>
          <div className="flex justify-center">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full mx-1 ${
                  index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => {
                  setDirection(index > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(index);
                }}
                aria-label={`Image ${index + 1}`}
              ></button>
            ))}
          </div>
          <button
            className="bg-opacity-50 p-2"
            onClick={handleNextImage}
            aria-label="Next Image"
            disabled={currentImageIndex === images.length - 1}
          >
            <TfiArrowCircleRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
