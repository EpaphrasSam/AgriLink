import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleImages = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextIndex = (currentImageIndex + 1) % images.length;
    return [prevIndex, currentImageIndex, nextIndex];
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-96 flex justify-center items-center overflow-hidden">
        <AnimatePresence initial={false} custom={currentImageIndex}>
          {getVisibleImages().map((index, i) => (
            <motion.div
              key={index}
              custom={i}
              initial={{ opacity: 0, x: i === 1 ? 100 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: i === 1 ? -100 : 0 }}
              transition={{ duration: 1 }}
              className={`absolute w-1/3 h-full ${i === 1 ? "z-10" : "z-0"} `}
              style={{
                left: `${(i - 1) * 33.33 + 33.33}%`,
                transform: `translateX(-50%)`,
              }}
            >
              <motion.img
                src={images[index]}
                alt={`Product Image ${index + 1}`}
                className={`w-full h-full object-cover object-center ${
                  i === 1 ? "scale-110" : "scale-90"
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-between w-full mt-4">
        <button className="bg-opacity-50 p-2" onClick={handlePrevImage}>
          <TfiArrowCircleLeft size={24} />
        </button>
        <div className="flex justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full mx-1 ${
                index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            ></button>
          ))}
        </div>
        <button className="bg-opacity-50 p-2" onClick={handleNextImage}>
          <TfiArrowCircleRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
