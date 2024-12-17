import React from "react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center w-screen h-96 bg-red-200 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="bg-black h-full flex flex-col items-center justify-center w-full bg-opacity-50 p-6  text-white">
        <div className="flex flex-col items-center justify-center w-1/2">
        <h1 className="text-2xl  md:text-5xl font-bold mb-4">
          Explore the World with Us
        </h1>
        <p className="text-xl text-gray-200 text-center  mb-6">
          Discover breathtaking destinations, unforgettable adventures, and
          tailor-made travel experiences. Start your journey today!
        </p>
        <a
          href="#"
          className="inline-block bg-black hover:bg-gray-950 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          View Packages
        </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
