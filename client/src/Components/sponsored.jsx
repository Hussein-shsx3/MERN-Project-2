import React from "react";

const Sponsored = () => {
  return (
    <section className="sticky hidden xl:flex flex-col top-[80px] bg-foreground p-[15px] rounded-[12px] w-[95%] md:w-[340px]">
      <div className="w-full flex justify-between items-center mb-[15px]">
        <p className="text-title text-[14px]">Sponsored</p>
        <p className="text-text text-[13px]">Create Ad</p>
      </div>
      <img
        src={"https://res.cloudinary.com/de7s0tsv2/image/upload/v1723378895/info4_viokxc.jpg"}
        alt=""
        className="mb-[15px] rounded-[10px] object-cover"
      />
      <div className="w-full flex justify-between items-center mb-[15px]">
        <p className="text-title text-[14px]">AikaCosmetics</p>
        <p className="text-text text-[13px]">mikaccsmetics.com</p>
      </div>
      <p className="text-text text-[13px]">
        Your pathway to stunning and immacutate beauty and made sure your skin
        is exfollation skin and shining like light.
      </p>
    </section>
  );
};

export default Sponsored;
