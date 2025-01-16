import React, { useState } from "react"; 
import { Input } from "@/components/ui/input"
import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue } from "@/components/ui/select";
import { Briefcase, Dumbbell, Circle, Ellipsis } from "lucide-react";

interface AddTaskProps {
    onAddTask: (task: {name: string, tag: string, xp: number }) => void;
    onClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask, onClose }) => {

    const handleAddTask = () => {
        onAddTask({name: "", tag: "", xp: 0});
        onClose();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="card-background flex flex-col gap-2 px-12 py-8 items-center justify-center rounded-lg shadow-lg w-1/5">
                    <h1 className="text-3xl font-semibold pb-8">Add a New Task</h1>
                    <Input type="text" placeholder="Task Name" className="font-bold"></Input>
                    <Select>
                        <SelectTrigger className="py-7">
                            <SelectValue placeholder="Select a Tag" />
                        </SelectTrigger>
                        <SelectContent className="card-background text-color">
                            <SelectItem value="Health" className="focus:bg-p focus:text-white py-4"><div className="grid grid-cols-3 gap-1 items-center"><p className="col-span-2">Health</p><Dumbbell /></div></SelectItem>
                            <SelectItem value="Work" className="focus:bg-p focus:text-white"><div className="grid grid-cols-3 gap-1 items-center py-2"><p className="col-span-2">Work</p><Briefcase/></div></SelectItem>
                            <SelectItem value="Other" className="focus:bg-p focus:text-white"><div className="grid grid-cols-3 gap-1 items-center py-2"><p className="col-span-2">Other</p><Ellipsis/></div></SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="py-7">
                            <SelectValue placeholder="Select Task Difficulty" />
                        </SelectTrigger>
                        <SelectContent className="card-background text-color">
                            <SelectItem value="Health" className="focus:bg-p focus:text-white"><div className="grid grid-cols-6 gap-1"><p className="col-span-3">Easy</p><p className="col-span-3 text-right">+10 XP</p></div>
                            </SelectItem>
                            <SelectItem value="Health" className="focus:bg-p focus:text-white"><div className="grid grid-cols-6 gap-1"><p className="col-span-3">Medium</p><p className="col-span-3 text-right">+10 XP</p></div></SelectItem>
                            <SelectItem value="Health" className="focus:bg-p focus:text-white"><div className="grid grid-cols-6 gap-1"><p className="col-span-3">Hard</p><p className="col-span-3 text-right">+20 XP</p></div></SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-row w-full gap-4">
                        <button id="cancel-button" className="my-3 py-2 rounded-md w-1/3">Cancel</button>
                        <button id="add-button" className="my-3 py-2 t-bg rounded-md p-bg w-2/3 font-semibold">Add Item</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddTask;