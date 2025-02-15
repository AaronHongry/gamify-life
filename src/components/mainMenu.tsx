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
import { db } from "@/app/firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion, arrayRemove, increment} from "firebase/firestore";

interface MainMenuProps {
    username: string
}

interface Task {
    id: string,
    name: string,
    tag: string,
    xp: number,
    completed: boolean,
    date: string
}

interface Reward {
    id: string,
    name: string,
    tag: string,
    cost: number,
    active: boolean,
    date: string
}

const MainMenu: React.FC<MainMenuProps> = ({username}) => {

    const getUserByUsername = async () => {
        try {
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data();
            } else {
                console.log("User not found.");
                return null;
            }
        } catch (error) {
            console.log("Error getting users.", error);
            return null;
        }
    }

    const [tasks, setTasks] = useState<Task[]>([

    ]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([

    ]);
    const [rewards, setRewards] = useState<Reward[]>([

    ]);
    const [inventory, setInventory] = useState<Reward[]>([
    ]);

    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentXp, setCurrentXp] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [xpAnimating, setXpAnimating] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserByUsername();
            if (userData) {
                setTasks(userData.tasks);
                setCompletedTasks(userData.completedTasks);
                setRewards(userData.rewards);
                setInventory(userData.inventory);
                setCurrentLevel(userData.level);
                setCurrentXp(userData.xp);
                setTotalXp(userData.totalXp);
                setCurrentStreak(userData.streak);
            }
        };
        fetchUserData();
    }, [])

    const isSmallScreen = useMediaQuery({ query: "(max-width: 1023px)"});

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
    const [currentDelete, setCurrentDelete] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"inProgress" | "completed">("inProgress");

    const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
    const [isDeleteRewardOpen, setIsDeleteRewardOpen] = useState(false);
    const [currentRewardDelete, setCurrentRewardDelete] = useState<string | null>(null);

    const [showLevelUp, setShowLevelUp] = useState(false);
    const [passLevel, setPassLevel] = useState(1);

    const handleAddTask = async (newTask: {id: string, name: string, tag: string, xp: number, completed: boolean, date: string}) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);

        try {
            const userRef = doc(db, "users", username);
            await updateDoc(userRef, {tasks: arrayUnion(newTask)});
        } catch (error) {
            console.log("Failed to add task.", error);
        }
    }
    
    const setDeleteTask = (id:string) => {
        setIsDeleteTaskOpen(true);
        setCurrentDelete(id);
    }

    const handleDeleteTask = async () => {
        if (currentDelete != null) {
            setTasks((prevTasks) => prevTasks.filter((task, _) => task.id != currentDelete));

            try {
                const userRef = doc(db, "users", username);
                const toRemove = tasks.find((task) => task.id == currentDelete);
                await updateDoc(userRef, {tasks: arrayRemove(toRemove)});
            } catch (error) {
                console.log("Failed to delete task.", error);
            }

            setCurrentDelete(null);
        }
        setIsDeleteTaskOpen(false);
    }

    const handleDone = async (id: string) => {
        const [doneTask] = tasks.filter((task, _) => task.id == id);
        doneTask.completed = true;
        const currentDate = new Date();
        doneTask.date = currentDate.toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"});

        if (doneTask) {
            setCompletedTasks((prevTasks) => [...prevTasks, doneTask]);
            try {
                const userRef = doc(db, "users", username);
                await updateDoc(userRef, {completedTasks: arrayUnion(doneTask)});
            } catch (error) {
                console.log("Failed to add completed task.", error);
            }

            setTotalXp((prev) => prev + doneTask.xp);
            try {
                const userRef = doc(db, "users", username);
                await updateDoc(userRef, {totalXp: increment(doneTask.xp)});
            } catch (error) {
                console.log("Failed to add totalXp.", error);
            }

            setCurrentXp((prev) => prev + doneTask.xp);
            setTasks((prevTasks) => prevTasks.filter((task, _) => task.id != id));
            try {
                const userRef = doc(db, "users", username);
                const toRemove = tasks.find((task) => task.id == id);
                await updateDoc(userRef, {tasks: arrayRemove(toRemove)});
            } catch (error) {
                console.log("Failed to remove from tasks when completed.", error);
            }
        }

        if (currentStreak == 0) {
            setCurrentStreak(1);
        }
    }

    const handleTabChange = (current: string) => {
        setActiveTab(current == "inProgress" ? "inProgress" : "completed");
    }
    
    const handleAddReward = async (newReward: {id: string, name: string, tag: string, cost: number, active: boolean, date: string}) => {
        setRewards((prevReward) => [...prevReward, newReward]);

        try {
            const userRef = doc(db, "users", username);
            await updateDoc(userRef, {rewards: arrayUnion(newReward)});
        } catch (error) {
            console.log("Failed to add reward.", error);
        }
    }

    const setDeleteReward = (id:string) => {
        setIsDeleteRewardOpen(true);
        setCurrentRewardDelete(id);
    }
    
    const handleDeleteReward = async () => {
        if (currentRewardDelete != null) {
            setRewards((prevReward) => prevReward.filter((reward, _) => reward.id != currentRewardDelete));
            try {
                const userRef = doc(db, "users", username);
                const toRemove = rewards.find((reward) => reward.id == currentRewardDelete);
                if (toRemove) {
                    toRemove.active = false;
                }
                await updateDoc(userRef, {rewards: arrayRemove(toRemove)});
            } catch (error) {
                console.log("Failed to delete reward.", error);
            }
            setCurrentRewardDelete(null);
        }
        setIsDeleteRewardOpen(false);
    }

    const handleRewardDone = async (id: string) => {
        const rewardCost = rewards.find(reward => reward.id == id)?.cost;
        if (rewardCost && rewardCost <= totalXp) {
            setTotalXp(prev => prev - rewardCost);
            try {
                const userRef = doc(db, "users", username);
                await updateDoc(userRef, {totalXp: increment(-rewardCost)});
            } catch (error) {
                console.log("Failed to remove total xp after completed.", error);
            }


            const [doneReward] = rewards.filter((reward, _) => reward.id == id);
            doneReward.id = `inventory-${Date.now()}`;
            if (doneReward) {
                setInventory(prevInventory => [doneReward, ...prevInventory]);
                try {
                    const userRef = doc(db, "users", username);
                    const toRemove = rewards.find((reward) => reward.id == id);
                    if (toRemove) {
                        toRemove.active = false;
                    }
                    console.log(doneReward);
                    await updateDoc(userRef, {inventory: arrayUnion(doneReward)});
                } catch (error) {
                    console.log("Failed to delete reward after completed.", error);
                }
            }
        }
    }

    useEffect(() => {
        const updateLeftoverXp = async (leftover: number) => {
            try {
                const userRef = doc(db, "users", username);
                await updateDoc(userRef, {level: increment(1), xp: leftover});
            } catch (error) {
                console.log("Failed to update leftover exp.", error);
            }
            
        }

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
            updateLeftoverXp(leftover);
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