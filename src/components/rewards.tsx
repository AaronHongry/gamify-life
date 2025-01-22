"use client";

import { motion, useAnimate } from "motion/react";
import { Ellipsis, X, Store, Gamepad2, Martini, Clapperboard} from "lucide-react";
import { useState, useEffect } from "react";  

interface RewardsProps {
    id: string,
    name: string,
    tag: string,
    cost: number,
    onDelete: () => void,
    active: boolean,
    onDone: () => void,
    date: string
}

const Rewards: React.FC<RewardsProps>= ({id, name, tag, cost, onDelete, active, onDone, date}) => {

    const [exitAnimation, setExitAnimation] = useState<"delete" | "done" | null>(null);

    const handleDone = () => {
        setExitAnimation("done");
        onDone();
    }

    const handleDelete = () => {
        setExitAnimation("delete");
        onDelete();
    }

    return (
        <motion.div 
            layout 
            transition={{duration: 0.3}} 
            whileTap={{ scale: 0.95, transition: {duration: 0.1} }} 
            whileHover={{ scale: 1.05, transition: {duration: 0.3} }} 
            exit={exitAnimation == "done" ? { opacity: 0, translateY: -100, transition: {duration: 0.2, ease: "backIn"} } : 
                exitAnimation == "delete" ? { opacity: 0, scale: 0, transition: { duration: 0.2, ease: "anticipate" }} : 
                { opacity: 0, transition: { duration: 0.2 }}}
            className="w-1/5 h-full card-background shadow-md">
            <div className="flex flex-col gap-3 py-3 px-3">
                <div className="flex flex-col gap-2 items-start">
                    <div className="flex flex-row w-full justify-between">
                        <Store className="w-4 h-4 p-color"/>
                        <motion.div initial={{ opacity: 0.5, scale: 1 }} whileHover={{ opacity: 1, scale: 1.5 }}><X className="w-4 h-4 hover:text-p aa-color" onClick={handleDelete}/></motion.div>
                    </div>
                    
                    <h1 className="text-sm font-semibold">{name}</h1>
                </div>
                { tag == "Games" ? (
                    <div className="flex flex-row gap-2 items-center"><Gamepad2 className="w-4 h-4 p-color"/><p className="text-xs text-color">{tag}</p></div>
                ) : tag == "Party" ? (
                    <div className="flex flex-row gap-2 items-center"><Martini className="w-4 h-4 p-color"/><p className="text-xs text-color">{tag}</p></div>
                ) : tag == "Movies" ? (
                    <div className="flex flex-row gap-2 items-center"><Clapperboard className="w-4 h-4 p-color"/><p className="text-xs text-color">{tag}</p></div>)
                : (<div className="flex flex-row gap-2 items-center"><Ellipsis className="w-4 h-4 p-color"/><p className="text-xs text-color">{tag}</p></div>)}

                { active ? (
                    <p className="text-xs aa-color self-start py-1">{date}</p>
                ) : (
                    <p className="text-xs text-color font-bold s-bg self-start px-2 py-1">{cost} XP</p>
                )}
                <button id="done-button" className={`${active && "invisible"} my-3 rounded-lg`} onClick={handleDone}>Done</button>
            </div>
        </motion.div>
    );
}

export default Rewards;