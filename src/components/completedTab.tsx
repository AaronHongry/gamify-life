import Task from "./task"
import { motion, AnimatePresence } from "motion/react"

interface CompletedTabProps {
    completedTasks: {id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[];
    handleDeleteTask: (id: string) => void;
    handleDoneTask: (id: string) => void;
    handleAddTask: (open: boolean) => void;
}


const CompletedTab: React.FC<CompletedTabProps> = ({completedTasks, handleDeleteTask, handleDoneTask, handleAddTask }) => {

    return (
        <div className="flex flex-row gap-3 w-full h-full overflow-hidden">
            <AnimatePresence>
                {completedTasks.map((task, _) => (
                    <Task key={task.id} id={task.id} name={task.name} tag={task.tag} xp={task.xp} completed={task.completed} onDelete={() => handleDeleteTask(task.id)} onDone={() => {}} date={task.date}/>
                ))}
            </AnimatePresence>   
        </div>
    );

}

export default CompletedTab;