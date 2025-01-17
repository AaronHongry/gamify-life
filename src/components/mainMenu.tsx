"use client";

import { Separator } from "@/components/ui/separator";
import Profile from "@/components/profile";
import Task from "@/components/task";
import AddTask from "./addTask";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const MainMenu = () => {

    const [tasks, setTasks] = useState<{name: string, tag: string, xp: number}[]>([
        {name: "Go to the gym.", tag: "Health", xp: 5},
        {name: "Do a LeetCode problem.", tag: "Work", xp: 10}
    ]);

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    const handleAddTask = (newTask: {name: string, tag: string, xp: number }) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    // Add when creating backend
    useEffect(() => {
        
    }, [tasks]);

    return (
        <>
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
                        {tasks.map((task, key) => (
                            <Task key={key} name={task.name} tag={task.tag} xp={task.xp}/>
                        ))}
                        <motion.button id="addTask" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="card-background h-10 w-10 self-center rounded-lg" onClick={() => setIsAddTaskOpen(true)}>+</motion.button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isAddTaskOpen ? <AddTask onAddTask={handleAddTask} onClose={() => setIsAddTaskOpen(false)} /> : null}
            </AnimatePresence>

        </>
    );
}

export default MainMenu;