import Rewards from "./rewards";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"

interface RewardsTabProps {
    rewards: {id: string, name: string, tag: string, cost: number, active: boolean, date: string}[];
    handleDeleteReward: (id: string) => void;
    handleDoneReward: (id: string) => void;
    handleAddReward: () => void;
}


const RewardsTab: React.FC<RewardsTabProps> = ({rewards, handleDeleteReward, handleDoneReward, handleAddReward }) => {

    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        if (rewards.length > 0) {
            setShowButton(true);
        } else {
            setTimeout(()=>{
                setShowButton(false);
            }, 200);
            
        }
    });
    return (
        <motion.div initial={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0}} className="flex flex-row gap-3 w-full h-full overflow-y-hidden overflow-x-auto lg:flex-wrap">
            <AnimatePresence>
                {rewards.map((reward, _) => (
                    <Rewards key={reward.id} id={reward.id} name={reward.name} tag={reward.tag} cost={reward.cost} active={reward.active} onDelete={() => handleDeleteReward(reward.id)} onDone={() => handleDoneReward(reward.id)} date={reward.date}/>
                ))}
                {showButton && 
                    <motion.button layout transition={{duration: 0.2, ease: "easeInOut"}} id="addTask" initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="card-background lg:h-10 lg:w-10 h-16 w-16 self-center rounded-lg flex-shrink-0" onClick={handleAddReward}>+</motion.button>}
                {!showButton && 
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{delay: 0.3}} className="flex flex-col w-full h-full justify-center items-center py-2 gap-3">
                        <p className="text-2xl">You have no rewards!</p>
                        <button id="add-button" className="my-3 py-2 t-bg rounded-md p-bg lg:w-1/5 w-2/5 font-semibold" onClick={handleAddReward}>Add Reward</button>
                    </motion.div>}
            </AnimatePresence>   
        </motion.div>
    );

}

export default RewardsTab;