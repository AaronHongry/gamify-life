"use client";

import { Separator } from "@/components/ui/separator";
import Profile from "@/components/profile";
import AddTask from "./addTask";
import DeleteTask from "./deleteTask";
import InProgressTab from "./inProgressTab";
import CompletedTab from "./completedTab";
import RewardsTab from "./rewardsTab";
import AddReward from "./addRewards";
import DeleteReward from "./deleteRewards";
import InventoryItem from "./inventoryItem";
import LevelUp from "./levelUp";
import { motion, AnimatePresence} from "motion/react";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const MainMenu = () => {
    const [tasks, setTasks] = useState<{id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[]>([
        {id: "task-1737364792", name: "Go to the gym.", tag: "Health", xp: 5, completed: false, date: ""},
        {id: "task-1737364847", name: "Do a LeetCode problem.", tag: "Work", xp: 10, completed: false, date: ""}
    ]);
    const [completedTasks, setCompletedTasks] = useState<{id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[]>([
        {id: "task-1737364864", name: "Ate Healthy", tag: "Health", xp: 20, completed: true, date: "January 19, 2025"}
    ]);
    const [rewards, setRewards] = useState<{id: string, name: string, tag: string, cost: number, active: boolean, date: string}[]>([
        {id: "reward-1737361234", name: "Play Guitar", tag: "Other", cost: 100, active: false, date: "January 19, 2025"},
        {id: "reward-1737364567", name: "Watch Netflix", tag: "Movies", cost: 20, active: false, date: "January 19, 2025"},
        {id: "reward-1737362345", name: "Go clubbing", tag: "Party", cost: 50, active: false, date: "January 19, 2025"}
    ]);
    const [inventory, setInventory] = useState<{id: string, name: string, tag: string, cost: number, active: boolean, date: string}[]>([
        {id: "reward-1737361111", name: "Watch Netflix", tag: "Movies", cost: 20, active: false, date: "January 19, 2025"}
    ]);

    const isSmallScreen = useMediaQuery({ query: "(max-width: 1023px)"});

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
    const [currentDelete, setCurrentDelete] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"inProgress" | "completed">("inProgress");

    const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
    const [isDeleteRewardOpen, setIsDeleteRewardOpen] = useState(false);
    const [currentRewardDelete, setCurrentRewardDelete] = useState<string | null>(null);

    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentXp, setCurrentXp] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [xpAnimating, setXpAnimating] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(0);

    const [showLevelUp, setShowLevelUp] = useState(false);
    const [passLevel, setPassLevel] = useState(1);

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
            setTotalXp((prev) => prev + doneTask.xp);
            setCurrentXp((prev) => prev + doneTask.xp);
            setTasks((prevTasks) => prevTasks.filter((task, _) => task.id != id));
        }

        if (currentStreak == 0) {
            setCurrentStreak(1);
        }
    }

    const handleTabChange = (current: string) => {
        setActiveTab(current == "inProgress" ? "inProgress" : "completed");
    }
    
    const handleAddReward = (newReward: {id: string, name: string, tag: string, cost: number, active: boolean, date: string}) => {
        setRewards((prevReward) => [...prevReward, newReward]);
    }

    const setDeleteReward = (id:string) => {
        setIsDeleteRewardOpen(true);
        setCurrentRewardDelete(id);
    }
    
    const handleDeleteReward = () => {
        if (currentRewardDelete != null) {
            setRewards((prevReward) => prevReward.filter((reward, _) => reward.id != currentRewardDelete));
            setCurrentRewardDelete(null);
        }
        setIsDeleteRewardOpen(false);
    }

    const handleRewardDone = (id: string) => {
        const rewardCost = rewards.find(reward => reward.id == id)?.cost;
        if (rewardCost && rewardCost <= totalXp) {
            setTotalXp(prev => prev - rewardCost);

            const [doneReward] = rewards.filter((reward, _) => reward.id == id);
            doneReward.id = `inventory-${Date.now()}`;
            if (doneReward) {
                setInventory(prevInventory => [doneReward, ...prevInventory]);
            }
        }
    }
    

    // Add when creating backend
    useEffect(() => {
        
    }, [tasks]);

    useEffect(() => {
        setRewards(prevRewards =>
            prevRewards.map(reward => 
                ({...reward, active: totalXp >= reward.cost})
            )
        );

        if (currentXp >= 30 && !xpAnimating) {
            setXpAnimating(true);

            setPassLevel(currentLevel);

            const leftover = currentXp % 30;
            
            setCurrentXp(30);
            setTimeout(() => {
                setCurrentLevel(prev => prev + 1);
                setCurrentXp(0);
                setShowLevelUp(true);
            }, 100);
            setTimeout(()=>{
                setShowLevelUp(false);
            }, 3600);
            setTimeout(() => {
                setCurrentXp(leftover);
                setXpAnimating(false);
            }, 3900);
        }
    }, [currentXp, totalXp]);

    return (
        <>
            <div className="flex lg:flex-row flex-col">
                <div className="flex flex-col lg:w-1/5 w-full h-full p-4">
                    <h1 className="text-2xl font-semibold">My Profile</h1>  
                    <p className="text-sm py-1 pt-2 border-b-2 border-transparent">Settings</p>
                    <Separator className="mt-0 mb-3 aa-bg"/>
                    <Profile level={currentLevel} totalXp={totalXp} currentXp={currentXp} streak={currentStreak}/>

                    {!isSmallScreen &&
                        <div className="flex flex-col gap-2 pt-2">
                            <h1 className="text-2xl font-semibold py-1">Inventory</h1>
                            <Separator className="mt-0 mb-3 aa-bg"/>
                            <div className="h-full overflow-hidden">
                                <motion.div drag="y" dragConstraints={{top: 0, bottom: 0}} dragElastic={0.1} whileDrag={{cursor: "grabbing"}} style={{cursor: "grab"}} className="flex flex-col w-full h-52 max-h-52 overflow-y-auto overflow-x-hidden">
                                    {inventory.map((inventoryItem, _) => (
                                        <InventoryItem key= {inventoryItem.id} name={inventoryItem.name} tag={inventoryItem.tag}/>
                                    ))}
                                </motion.div>
                            </div>
                            <Separator className="mt-0 mb-3 aa-bg"/>
                        </div>
                    }
                </div>
                <div className="p-4 lg:w-4/5 w-full h-full">
                    <AnimatePresence>
                        <motion.div key="todoPanels" layout className="w-full h-full">           
                            <h1 className="text-2xl font-semibold">Todos</h1>
                            <div className="grid lg:grid-cols-10 lg:pt-0 pt-2 grid-cols-2 gap-1">
                                <p className={`${activeTab == "completed" ? "brightness-50 hover:brightness-100 border-b-0 transition-all" : "border-b-2"} cursor-default text-sm py-1 pt-2 px-2 text-center hover:bg-gray-700 transition duration-300`} onClick={() => handleTabChange("inProgress")}>In Progress</p><p className={`${activeTab == "inProgress" ? "brightness-50 hover:brightness-100 border-b-0 transition-all" : "border-b-2"} text-sm py-1  card-background pt-2 px-2 text-center hover:bg-gray-700 transition duration-300 cursor-default`} onClick={() => handleTabChange("completed")}>Completed</p>
                            </div>
                            <Separator className="mt-0 mb-3 aa-bg"/>
                            <div className="w-full h-full min-h-52">
                                {activeTab == "inProgress" && <InProgressTab progressTasks={tasks} handleDeleteTask={setDeleteTask} handleDoneTask={handleDone} handleAddTask={() => setIsAddTaskOpen(true)}/>}
                                {activeTab == "completed" && <CompletedTab completedTasks={completedTasks}/>}
                            </div>
                        </motion.div> 
                                    
                        <motion.div key="rewardsPanels" layout className="w-full h-full">  
                            <h1 className="text-2xl font-semibold py-1 pb-2">Rewards</h1>
                            <Separator className="mt-0 mb-3 aa-bg"/>
                            <div className="relative w-full h-full overflow-hidden">
                                <RewardsTab rewards={rewards} handleDeleteReward={setDeleteReward} handleAddReward={() => setIsAddRewardOpen(true)} handleDoneReward={handleRewardDone}/>
                            </div>
                        </motion.div> 
                    </AnimatePresence>
                    {isSmallScreen &&
                        <div className="flex flex-col gap-2 pt-2">
                            <h1 className="text-2xl font-semibold py-1">Inventory</h1>
                            <Separator className="mt-0 mb-3 aa-bg"/>
                            <div className="h-full overflow-hidden">
                                <motion.div drag="y" dragConstraints={{top: 0, bottom: 0}} dragElastic={0.1} whileDrag={{cursor: "grabbing"}} style={{cursor: "grab"}} className="flex flex-col w-full h-52 max-h-52 overflow-y-auto overflow-x-hidden">
                                    {inventory.map((inventoryItem, _) => (
                                        <InventoryItem key= {inventoryItem.id} name={inventoryItem.name} tag={inventoryItem.tag}/>
                                    ))}
                                </motion.div>
                            </div>
                            <Separator className="mt-0 mb-3 aa-bg"/>
                        </div>
                    }
                </div>
            </div>
            <AnimatePresence>
                {isAddTaskOpen && <AddTask onAddTask={handleAddTask} onClose={() => setIsAddTaskOpen(false)} />}
                {isDeleteTaskOpen && <DeleteTask onCancel={() => setIsDeleteTaskOpen(false)} onDelete={handleDeleteTask} />}
                {isAddRewardOpen && <AddReward onAddReward={handleAddReward} onClose={() => setIsAddRewardOpen(false)} />}
                {isDeleteRewardOpen && <DeleteReward onCancel={() => setIsDeleteRewardOpen(false)} onDelete={handleDeleteReward} />}
                {showLevelUp && <LevelUp currentLevel={passLevel} />}
            </AnimatePresence>

        </>
    );
}

export default MainMenu;