import React, { useState } from "react"; 
import { Input } from "@/components/ui/input"
import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue } from "@/components/ui/select";
import { Briefcase, Dumbbell, Ellipsis } from "lucide-react";
import { motion } from "motion/react";

interface AddTaskProps {
    onAddTask: (task: {name: string, tag: string, xp: number, completed: boolean, date: string}) => void;
    onClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask, onClose }) => {

    const [taskName, setTaskName] = useState("");
    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [tag, setTag] = useState("");
    const [isTagInvalid, setIsTagInvalid] = useState(false);
    const [xp, setXP] = useState(0);
    const [isXpInvalid, setIsXpInvalid] = useState(false);

    const handleAddTask = () => {
        let nameInvalid = taskName.trim() === "";
        let tagInvalid = tag === "";
        let xpInvalid = xp === 0;

        setIsNameInvalid(nameInvalid);
        setIsTagInvalid(tagInvalid);
        setIsXpInvalid(xpInvalid);

        if (!nameInvalid && !tagInvalid && !xpInvalid) {
            onAddTask({name: taskName, tag: tag, xp: xp, completed: false, date: ""});
            onClose();
        }
    }

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-40 z-40"></motion.div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 0 }} transition={{ ease: "backInOut", }} className="card-background flex flex-col gap-2 px-12 py-8 items-center justify-center rounded-lg shadow-lg w-1/5">
                    <h1 className="text-3xl font-semibold pb-8">Add a New Task</h1>
                    <Input type="text" placeholder="Task Name" className={`font-bold py-7 w-full max-w-xs break-words ${isNameInvalid ? 'border-red-400' : ""}`} onBlur={(e) => setTaskName(e.target.value)}></Input>
                    <Select onValueChange={(e) => setTag(e)}>
                        <SelectTrigger className={`py-7 ${isTagInvalid ? "border-red-400" : ""}`}>
                            <SelectValue placeholder="Select a Tag" />
                        </SelectTrigger>
                        <SelectContent className="card-background text-color">
                            <SelectItem value="Health" className="focus:bg-p focus:text-white py-4"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Health</p><Dumbbell /></div></SelectItem>
                            <SelectItem value="Work" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between py-2"><p className="">Work</p><Briefcase/></div></SelectItem>
                            <SelectItem value="Other" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between py-2"><p className="">Other</p><Ellipsis/></div></SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(e) => setXP(parseInt(e))}>
                        <SelectTrigger className={`py-7 ${isXpInvalid ? "border-red-400" : ""}`}>
                            <SelectValue placeholder="Select Task Difficulty" />
                        </SelectTrigger>
                        <SelectContent className="card-background text-color">
                            <SelectItem value="5" className="focus:bg-p focus:text-white w-full"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Easy</p><p className="">+5 XP</p></div></SelectItem>
                            <SelectItem value="10" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Medium</p><p className="">+10 XP</p></div></SelectItem>
                            <SelectItem value="20" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Hard</p><p className="">+20 XP</p></div></SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-row w-full gap-4">
                        <button id="cancel-button" className="my-3 py-2 rounded-md w-1/3" onClick={onClose}>Cancel</button>
                        <button id="add-button" className="my-3 py-2 t-bg rounded-md p-bg w-2/3 font-semibold" onClick={handleAddTask}>Add Item</button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default AddTask;