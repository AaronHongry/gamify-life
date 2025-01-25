import { motion, AnimatePresence, useAnimate } from "motion/react";
import { useState, useEffect } from "react";

interface LevelUpProps {
    currentLevel: number
}

const LevelUp: React.FC<LevelUpProps> = ({currentLevel}) => {

    const [isDoubleDigits, setIsDoubleDigits] = useState(false);
    const [isGoingDoubleDigits, setIsGoingDoubleDigits] = useState(false);
    const [isOne, setIsOne] = useState(true);

    const [showMessage, setShowMessage] = useState(false);
    const [animateMessageRef, animateMessage] = useAnimate();
    const [animateIconRef, animateIcon] = useAnimate();

    const countOnes = (num: number) => {
        return (num.toString().split('1').length - 1) + (num.toString().split('4').length - 1);
    }

    useEffect(() => {
        setTimeout(() => {
            setShowMessage(true);
        }, 1200);

        setTimeout(() => {
            animateMessage(animateMessageRef.current, {opacity: 0}, {duration: 0.4});
        }, 3000);
        setTimeout(() => {
            animateIcon(animateIconRef.current, {scale: 0, opacity: 0}, {duration: 0.4, ease: "anticipate"});
        }, 3400);
    }, []);

    return (
        <motion.div
        initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0" }}
        animate={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0, 0, 0, 0)" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center z-50 flex-col gap-6">
            <AnimatePresence>
                <motion.div key={"icon"}
                ref={animateIconRef}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut"}}
                className="card-background rounded-full shadow-lg h-64 w-64 border-8 border-p flex items-center justify-center overflow-clip">
                    <motion.div
                    initial={{ translateX: `${8.5 - (countOnes(currentLevel) * 0.15)}rem` }}
                    animate={{ translateX: `${-8.5 - (countOnes(currentLevel + 1) * 0.15)}rem` }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-row items-center justify-content gap-4">
                        <div className="text-center w-64">
                            <p className="text-9xl text-center items-center font-semibold">{currentLevel}</p>
                        </div>
                        <div className="text-center w-64">
                            <p className="text-9xl text-center font-semibold">{currentLevel + 1}</p>
                        </div>
                    </motion.div>
                </motion.div>
                {showMessage &&
                <motion.div
                ref={animateMessageRef}
                layout
                initial={{ translateY: -10, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                key={"icon-text"}>
                <p className="text-4xl font-semibold">You leveled up!</p>
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}

export default LevelUp;