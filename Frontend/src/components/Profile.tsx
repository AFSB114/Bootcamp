"use client"

import Image from "next/image";

export default function Profile({className, variant = 0}: {className?: string, variant?: number}) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const imageProfile = require(`@/../public/img/Profile-User-${variant}.png`);
    return (
      <div
        className={`flex items-center justify-center ${className} aspect-square`}
      >
        <Image src={imageProfile} alt="Profile Image" />
      </div>
    );
}