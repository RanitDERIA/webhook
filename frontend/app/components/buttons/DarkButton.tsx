"use client";
import { ReactNode } from "react";

export const DarkButton = ({ children, onClick, size = "big" }: { 
  children: ReactNode;
  onClick?: () => void; // Made optional to prevent errors
  size?: "big" | "small";
}) => {
  return (
    <div 
      onClick={onClick} 
      className={`flex flex-col justify-center py-2 px-8 cursor-pointer hover:shadow-md bg-purple-500 text-white rounded-xl text-center
      ${size === "big" ? "text-lg py-3 px-10" : "text-sm py-2 px-6"}`}
    >
      {children}
    </div>
  );
};
