"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { Feature } from "./Feature";

export const Hero = () => {
  const router = useRouter(); // Use router correctly

  return (
    <>
      <div>
        <div className="flex justify-center pt-4">
          <div className="text-5xl font-bold text-center pt-8 max-w-xl">
            Automate as fast as you can type
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="text-xl font-semibold text-center pt-8 max-w-xl">
            AI gives you automation superpowers, and Kraven puts them to work.
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="flex">
            {/* ✅ Fixing onclick handler */}
            <PrimaryButton onclick={() => router.push("/signup")} size="big">
              Get Started Free
            </PrimaryButton>
            <div className="pl-4"></div>
            <SecondaryButton onclick={() => {}} size="big">
              Contact Sales
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex justify-center gap-6 pt-8">
        <Feature title="Free Forever" subtitle="for core features" />
        <Feature title="More Apps" subtitle="for core features" />
        <Feature title="Enterprise Scale" subtitle="for advanced needs" />
      </div>
    </>
  );
};
