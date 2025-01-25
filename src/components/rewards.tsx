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

    const [exitAnimation, setExitAnimation] = useState<"delete" | null>(null);
    const [scope, animate] = useAnimate();

    const handleDone = () => {
        if (active) {
            animate(scope.current, {translateY: [0, 10, -5, 0]}, {duration: 0.5, ease: "anticipate"});
            animate(scope.current, {backgroundColor: ["#11201b", "#09110e"]}, {duration: 0.5, ease: "anticipate"});
        } else {
            animate(scope.current, {translateX: [0, 5, -5, 5, -5, 0]}, {duration: 0.5, ease: "anticipate"});
            animate(scope.current, {backgroundColor: ["#321919", "#09110e"]}, {duration: 0.5, ease: "anticipate"});
        }
        onDone();
    }

    const handleDelete = () => {
        setExitAnimation("delete");
        onDelete();
    }

    return (
        <motion.div ref={scope}
            layout
            transition={{duration: 0.3}} 
            whileTap={{ scale: 0.95, transition: {duration: 0.1} }} 
            whileHover={{ scale: 1.05, transition: {duration: 0.3} }} 
            exit={ exitAnimation == "delete" ? { opacity: 0, scale: 0, transition: { duration: 0.2, ease: "anticipate" }} : 
                { opacity: 0, transition: { duration: 0.2 }}}
            className="lg:w-1/5 w-48 h-full card-background shadow-md flex-shrink-0">
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

                <p className="text-xs text-color font-bold s-bg self-start px-2 py-1">{cost} XP</p>

                <button id="done-button" className={`my-3 rounded-lg`} onClick={handleDone}>Buy</button>
            </div>
        </motion.div>
    );
}

export default Rewards;