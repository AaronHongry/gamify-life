import Task from "./task"
import { motion, AnimatePresence } from "motion/react"

interface InProgressTabProps {
    progressTasks: {id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[];
    handleDeleteTask: (id: string) => void;
    handleDoneTask: (id: string) => void;
    handleAddTask: () => void;
}


const InProgressTab: React.FC<InProgressTabProps> = ({progressTasks, handleDeleteTask, handleDoneTask, handleAddTask }) => {

    return (
        <div className="flex flex-row gap-3 w-full h-full overflow-hidden">
            <AnimatePresence>
                {progressTasks.map((task, _) => (
                    <Task key={task.id} id={task.id} name={task.name} tag={task.tag} xp={task.xp} completed={task.completed} onDelete={() => handleDeleteTask(task.id)} onDone={() => handleDoneTask(task.id)} date={task.date}/>
                ))}
                <motion.button id="addTask" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="card-background h-10 w-10 self-center rounded-lg" onClick={handleAddTask}>+</motion.button>
            </AnimatePresence>   
        </div>
    );

}

export default InProgressTab;