import Task from "./task"
import { useState, useEffect } from "react";
import { motion, AnimatePresence, anticipate } from "motion/react"

interface InProgressTabProps {
    progressTasks: {id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[];
    handleDeleteTask: (id: string) => void;
    handleDoneTask: (id: string) => void;
    handleAddTask: () => void;
}


const InProgressTab: React.FC<InProgressTabProps> = ({progressTasks, handleDeleteTask, handleDoneTask, handleAddTask }) => {

    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        if (progressTasks.length > 0) {
            setShowButton(true);
        } else {
            setTimeout(()=>{
                setShowButton(false);
            }, 200);
            
        }
    });
    return (
        <motion.div initial={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0}} className="flex flex-row gap-3 w-full h-full overflow-hidden">
            <AnimatePresence>
                {progressTasks.map((task, _) => (
                    <Task key={task.id} id={task.id} name={task.name} tag={task.tag} xp={task.xp} completed={task.completed} onDelete={() => handleDeleteTask(task.id)} onDone={() => handleDoneTask(task.id)} date={task.date}/>
                ))}
                {showButton && 
                    <motion.button layout transition={{duration: 0.2, ease: "easeInOut"}} id="addTask" initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="card-background h-10 w-10 self-center rounded-lg" onClick={handleAddTask}>+</motion.button>}
                {!showButton && 
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{delay: 0.3}} className="flex flex-col w-full h-full justify-center items-center py-2 gap-3">
                        <p className="text-2xl">You have no tasks!</p>
                        <button id="add-button" className="my-3 py-2 t-bg rounded-md p-bg w-1/5 font-semibold" onClick={handleAddTask}>Add Item</button>
                    </motion.div>}
            </AnimatePresence>   
        </motion.div>
    );

}

export default InProgressTab;