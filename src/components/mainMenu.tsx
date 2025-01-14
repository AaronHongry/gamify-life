"use client";

import { Separator } from "@/components/ui/separator";
import Profile from "@/components/profile";
import Task from "@/components/task";
import { motion } from "motion/react";

const MainMenu = () => {
    return (
        <div className="flex xl:flex-row flex-col">
            <div className="flex flex-col xl:w-1/5 w-full h-full p-4">
                <h1 className="text-2xl font-semibold">My Profile</h1>
                <Separator className="my-3 aa-bg"/>
                <Profile />
            </div>
            <div className="p-4 w-4/5 h-full">
                <h1 className="text-2xl font-semibold">Todos</h1>
                <Separator className="my-3 aa-bg"/>
                <div className="flex flex-row gap-3 w-full h-full">
                    <Task name={"Go to the gym."} tag={"Health"} xp={5}/>
                    <Task name={"Do a LeetCode problem."} tag={"Work"} xp={10}/>
                    <motion.button id="addTask" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="card-background h-10 w-10 self-center rounded-lg">+</motion.button>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;