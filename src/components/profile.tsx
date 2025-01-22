"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface ProfileProp {
    level: number,
    xp: number,
    streak: number
}

const Profile: React.FC<ProfileProp> = ({level, xp, streak}) => {

    return (
        <motion.div whileHover={{ scale: 1.02 }} className="w-full h-full card-background shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
                <Image src="/pics/dp.jpg" alt="AH" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
            <div className="flex flex-col gap-2 py-3 px-3">
                <h1 className="text-lg font-semibold">Aaron Hong</h1>
                <p className="text-color">Level: {level}</p>
                <p className="text-color">XP: {xp} / {30}</p>
                <Progress value={xp * (10 / 3)} className="t-bg"/>
                <p className={`${streak > 0 ? "text-color" : "aa-color"}`}>Streak: {streak} 🔥</p>
            </div>
        </motion.div>
    );
}

export default Profile;