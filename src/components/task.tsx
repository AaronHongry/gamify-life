"use client";

import { motion } from "motion/react";
import { Briefcase, Dumbbell, Circle, Ellipsis } from "lucide-react";

interface TaskProps {
    name: string,
    tag: string,
    xp: number
}

const Task: React.FC<TaskProps>= ({name, tag, xp}) => {

    return (
        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="w-1/5 h-full card-background shadow-md">
            <div className="flex flex-col gap-3 py-3 px-3">
                <div className="flex flex-col gap-2 items-start">
                    <Circle className="w-4 h-4 p-color"/><h1 className="text-sm font-semibold">{name}</h1>
                </div>
                { tag == "Health" ? (
                    <div className="flex flex-row gap-2 items-center"><Dumbbell className="w-4 h-4 p-color"/><p className="text-xs text-color">{tag}</p></div>
                ) : tag == "Work" ? (
                    <div className="flex flex-row gap-2 items-center"><Briefcase className="w-4 h-4 p-color"/><p className="text-xs text-color">{tag}</p></div>
                ) : (<div></div>)}
                <p className="text-xs text-color font-bold s-bg self-start px-2 py-1">{xp} XP</p>
                <button id="done-button" className="my-3 rounded-lg">Done</button>
            </div>
        </motion.div>
    );
}

export default Task;