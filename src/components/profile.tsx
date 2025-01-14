"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { motion } from "motion/react";

const Profile = () => {
    return (
        <motion.div whileHover={{ scale: 1.02 }} className="w-full h-full card-background shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
                <Image src="/pics/dp.jpg" alt="AH" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
            <div className="flex flex-col gap-2 py-3 px-3">
                <h1 className="text-lg font-semibold">Aaron Hong</h1>
                <p className="text-color">Level: {1}</p>
                <p className="text-color">XP: {0} / {30}</p>
                <Progress className="s-bg"/>
                <p className="aa-color">Streak: {0} 🔥</p>
            </div>
        </motion.div>
    );
}

export default Profile;