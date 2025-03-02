"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";
export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            kraven
        </div>
        <div className="flex">
            <div className="pr-4">
                <LinkButton onclick={() => { }}>
                    Contact Sales
                </LinkButton>
            </div>
            <div className="pr-4">
            <LinkButton onclick={() => {
                router.push("/login")
            }}>
                Login
            </LinkButton>
            </div>
            <PrimaryButton onclick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>
        </div>
    </div>
}