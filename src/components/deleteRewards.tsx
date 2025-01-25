import { motion } from "motion/react";
import React, { useState } from "react";

interface DeleteRewardProps {
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteReward: React.FC<DeleteRewardProps> = ({ onDelete, onCancel }) => {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-40 z-40"></motion.div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 0 }} transition={{ ease: "backInOut", }} className="card-background flex flex-col gap-2 px-12 py-8 items-center justify-center rounded-lg shadow-lg lg:w-1/5 w-4/5">
                    <h1 className="lg:text-3xl text-2xl font-semibold lg:pb-8 pb-2 text-center">Are you sure you want to delete this reward?</h1>
                    <div className="flex flex-row w-full lg:gap-4 gap-3">
                        <button id="cancel-button" className="my-3 py-2 rounded-md w-1/3" onClick={onCancel}>Cancel</button>
                        <button id="" className="my-3 py-2 rounded-md bg-red-500 hover:bg-red-400 transition outline outline-2 outline-gray-500 w-2/3 font-semibold" onClick={onDelete}>Delete</button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default DeleteReward;