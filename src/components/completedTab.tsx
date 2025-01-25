import Task from "./task"
import { motion, AnimatePresence } from "motion/react"

interface CompletedTabProps {
    completedTasks: {id: string, name: string, tag: string, xp: number, completed: boolean, date: string}[];
}


const CompletedTab: React.FC<CompletedTabProps> = ({completedTasks}) => {

    return (
        <motion.div initial={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0}} className="flex flex-row gap-3 w-full h-full overflow-y-hidden overflow-x-auto lg:flex-wrap">
            <AnimatePresence>
                {completedTasks.map((task, _) => (
                    <Task key={task.id} id={task.id} name={task.name} tag={task.tag} xp={task.xp} completed={task.completed} onDelete={() => {}} onDone={() => {}} date={task.date}/>
                ))}
            </AnimatePresence>   
        </motion.div>
    );

}

export default CompletedTab;