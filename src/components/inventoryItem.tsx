import { motion } from "motion/react"
import { Ellipsis, Gamepad2, Martini, Clapperboard} from "lucide-react";

interface InventoryItemProps {
    name: string,
    tag: string
}

const InventoryItem: React.FC<InventoryItemProps> = ({name, tag}) => {
    return (
        <motion.div
            layout 
            transition={{duration: 0.3}} 
            whileTap={{ scale: 0.95, transition: {duration: 0.1} }} 
            whileHover={{ scale: 1.05, transition: {duration: 0.3} }} 
            className="w-full h-10 card-background shadow-md ">
            <div className="flex flex-col gap-3 py-3 px-3">
                <div className="flex flex-row gap-2 items-start">
                { tag == "Games" ? (
                    <Gamepad2 className="w-4 h-4 p-color"/>
                ) : tag == "Party" ? (
                    <Martini className="w-4 h-4 p-color"/>
                ) : tag == "Movies" ? (
                    <Clapperboard className="w-4 h-4 p-color"/>)
                : (<Ellipsis className="w-4 h-4 p-color"/>)}
                    <h1 className="text-sm font-semibold">{name}</h1>
                </div>
            </div>
        </motion.div>
    );
}

export default InventoryItem;