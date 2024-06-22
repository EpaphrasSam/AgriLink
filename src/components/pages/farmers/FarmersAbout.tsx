"use client";

interface AboutProp {
  about: string;
}

const FarmersAbout = ({ about }: AboutProp) => {
  return (
    <div className="mt-4 p-4 shadow-lg">
      <h1 className="text-xl font-bold">Bio</h1>
      <p>{about}</p>
    </div>
  );
};

export default FarmersAbout;
