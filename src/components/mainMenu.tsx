"use client";

import { Separator } from "@/components/ui/separator";
import Profile from "@/components/profile";
import AddTask from "./addTask";
import DeleteTask from "./deleteTask";
import InProgressTab from "./inProgressTab";
import CompletedTab from "./completedTab";
import { motion, AnimatePresence} from "motion/react";
import { useState, useEffect } from "react";

const MainMenu = () => {
    const [tasks, setTasks] = useState<{id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[]>([
        {id: "task-1737364792", name: "Go to the gym.", tag: "Health", xp: 5, completed: false, date: ""},
        {id: "task-1737364847", name: "Do a LeetCode problem.", tag: "Work", xp: 10, completed: false, date: ""}
    ]);
    const [completedTasks, setCompletedTasks] = useState<{id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[]>([
        {id: "task-1737364864", name: "Goon", tag: "Other", xp: 20, completed: true, date: "January 19, 2025"}
    ]);

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
    const [currentDelete, setCurrentDelete] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"inProgress" | "completed">("inProgress");

    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentXp, setCurrentXp] = useState(0);

    const handleAddTask = (newTask: {id: string, name: string, tag: string, xp: number, completed: boolean, date: string}) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    
    const setDeleteTask = (id:string) => {
        setIsDeleteTaskOpen(true);
        setCurrentDelete(id);
    }

    const handleDeleteTask = () => {
        if (currentDelete != null) {
            setTasks((prevTasks) => prevTasks.filter((task, _) => task.id != currentDelete));
            setCurrentDelete(null);
        }
        setIsDeleteTaskOpen(false);
    }

    const handleDone = (id: string) => {
        const [doneTask] = tasks.filter((task, _) => task.id == id);
        doneTask.completed = true;
        const currentDate = new Date();
        doneTask.date = currentDate.toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"});

        if (doneTask) {
            setCompletedTasks((prevTasks) => [...prevTasks, doneTask]);
            setCurrentXp((prev) => prev + doneTask.xp);
            setTasks((prevTasks) => prevTasks.filter((task, _) => task.id != id));
        }
    }

    const handleTabChange = (current: string) => {
        setActiveTab(current == "inProgress" ? "inProgress" : "completed");
    }

    // Add when creating backend
    useEffect(() => {
        
    }, [tasks]);

    useEffect(() => {
        if (currentXp > 30) {
            setCurrentLevel(prev => prev + 1);
            setCurrentXp(prev => prev % 30);
        }
    }, [currentXp]);

    return (
        <>
            <div className="flex xl:flex-row flex-col">
                <div className="flex flex-col xl:w-1/5 w-full h-full p-4">
                    <h1 className="text-2xl font-semibold">My Profile</h1>
                    <p className="text-sm py-1 pt-2">Settings</p>
                    <Separator className="mt-0 mb-3 aa-bg"/>
                    <Profile level={currentLevel} xp={currentXp}/>
                </div>
                <div className="p-4 w-4/5 h-full">
                    <h1 className="text-2xl font-semibold">Todos</h1>
                    <div className="grid grid-cols-10 gap-1">
                        <p className={`${activeTab == "completed" ? "brightness-50 hover:brightness-100 border-b-0 transition-all" : "border-b-2"} cursor-default text-sm py-1 pt-2 px-2 text-center hover:bg-gray-700 transition duration-300`} onClick={() => handleTabChange("inProgress")}>In Progress</p><p className={`${activeTab == "inProgress" ? "brightness-50 hover:brightness-100 border-b-0 transition-all" : "border-b-2"} text-sm py-1  card-background pt-2 px-2 text-center hover:bg-gray-700 transition duration-300 cursor-default`} onClick={() => handleTabChange("completed")}>Completed</p>
                    </div>
                    <Separator className="mt-0 mb-3 aa-bg"/>
                    <div className="w-full h-full overflow-hidden">
                        {activeTab == "inProgress" && <InProgressTab progressTasks={tasks} handleDeleteTask={setDeleteTask} handleDoneTask={handleDone} handleAddTask={() => setIsAddTaskOpen(true)}/>}
                        {activeTab == "completed" && <CompletedTab completedTasks={completedTasks}/>}
                    </div>
                    
                </div>
            </div>
            <AnimatePresence>
                {isAddTaskOpen && <AddTask onAddTask={handleAddTask} onClose={() => setIsAddTaskOpen(false)} />}
                {isDeleteTaskOpen && <DeleteTask onCancel={() => setIsDeleteTaskOpen(false)} onDelete={handleDeleteTask} />}
            </AnimatePresence>

        </>
    );
}

export default MainMenu;