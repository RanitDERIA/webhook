"use client"
import { ReactNode } from "react";

export const PrimaryButton = ({ children, onclick, size = "small"} : {
    children: ReactNode,
    onclick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={onclick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-7 py-3"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full text-center`}>
        {children}
    </div>
}