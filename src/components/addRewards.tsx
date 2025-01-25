import React, { useState } from "react"; 
import { Input } from "@/components/ui/input"
import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue } from "@/components/ui/select";
import { Ellipsis, Gamepad2, Martini, Clapperboard } from "lucide-react";
import { motion } from "motion/react";

interface AddRewardProps {
    onAddReward: (task: {id: string, name: string, tag: string, cost: number, active: boolean, date: string}) => void;
    onClose: () => void;
}

const AddReward: React.FC<AddRewardProps> = ({ onAddReward, onClose }) => {

    const [taskName, setTaskName] = useState("");
    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [tag, setTag] = useState("");
    const [isTagInvalid, setIsTagInvalid] = useState(false);
    const [xp, setXP] = useState(0);
    const [isXpInvalid, setIsXpInvalid] = useState(false);

    const handleAddReward = () => {
        let nameInvalid = taskName.trim() === "";
        let tagInvalid = tag === "";
        let xpInvalid = xp === 0;

        setIsNameInvalid(nameInvalid);
        setIsTagInvalid(tagInvalid);
        setIsXpInvalid(xpInvalid);

        if (!nameInvalid && !tagInvalid && !xpInvalid) {
            onAddReward({id: `reward-${Date.now()}`, name: taskName, tag: tag, cost: xp, active: false, date: ""});
            onClose();
        }
    }

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-40 z-40"></motion.div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 0 }} transition={{ ease: "backInOut", }} className="card-background flex flex-col gap-2 px-12 py-8 items-center justify-center rounded-lg shadow-lg lg:w-1/5 w-4/5">
                    <h1 className="lg:text-3xl text-2xl font-semibold pb-2 text-center">Add a New Reward</h1>
                    <Input type="text" placeholder="Reward Name" className={`font-bold py-7 w-full max-w-xs break-words ${isNameInvalid ? 'border-red-400' : ""}`} onBlur={(e) => setTaskName(e.target.value)}></Input>
                    <Select onValueChange={(e) => setTag(e)}>
                        <SelectTrigger className={`py-7 ${isTagInvalid ? "border-red-400" : ""}`}>
                            <SelectValue placeholder="Select a Tag" />
                        </SelectTrigger>
                        <SelectContent className="card-background text-color">
                            <SelectItem value="Games" className="focus:bg-p focus:text-white py-4"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Games</p><Gamepad2 /></div></SelectItem>
                            <SelectItem value="Party" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between py-2"><p className="">Party</p><Martini/></div></SelectItem>
                            <SelectItem value="Movies" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between py-2"><p className="">Movies</p><Clapperboard/></div></SelectItem>
                            <SelectItem value="Other" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between py-2"><p className="">Other</p><Ellipsis/></div></SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(e) => setXP(parseInt(e))}>
                        <SelectTrigger className={`py-7 ${isXpInvalid ? "border-red-400" : ""}`}>
                            <SelectValue placeholder="Select Reward Value" />
                        </SelectTrigger>
                        <SelectContent className="card-background text-color">
                            <SelectItem value="20" className="focus:bg-p focus:text-white w-full"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Low</p><p className="">20 XP</p></div></SelectItem>
                            <SelectItem value="50" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">Medium</p><p className="">50 XP</p></div></SelectItem>
                            <SelectItem value="100" className="focus:bg-p focus:text-white"><div className="flex flex-row gap-1 w-60 justify-between"><p className="">High</p><p className="">100 XP</p></div></SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-row w-full lg:gap-4 gap-3">
                        <button id="cancel-button" className="my-3 py-2 rounded-md w-1/3" onClick={onClose}>Cancel</button>
                        <button id="add-button" className="my-3 py-2 t-bg rounded-md p-bg w-2/3 font-semibold" onClick={handleAddReward}>Add Reward</button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default AddReward;