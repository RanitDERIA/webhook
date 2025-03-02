import Image from "next/image";

export const HeroVideo = () => {
  return (
    <div className="flex justify-center pt-8">
      <Image
        src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
        alt="Hero Video Placeholder"
        width={1280}
        height={720}
        className="rounded-lg shadow-lg"
        priority
      />
    </div>
  );
};
