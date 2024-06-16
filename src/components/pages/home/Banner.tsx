import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <Image
        src="https://th.bing.com/th/id/R.56135d32f9fd469050f41e89331644e2?rik=27MwYNICvJ%2fafw&pid=ImgRaw&r=0"
        alt="Agriculture Banner"
        width={1080}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to AgriLink</h1>
        <p className="mt-4 text-lg md:text-2xl">
          Empowering small-scale farmers by connecting them directly with
          consumers. Discover fresh produce and support local agriculture.
        </p>
      </div>
    </div>
  );
};

export default Banner;
