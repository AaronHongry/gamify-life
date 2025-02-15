"use client";

import MainMenu from "@/components/mainMenu";
import { useState } from "react";
import Welcome from "@/components/welcome";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [username, setUsername] = useState("");


    const handleLogin = (username: string) => {
        setLoginSuccess(true);
        setUsername(username);
    }

    return (
        <AnimatePresence>
            {!loginSuccess && <Welcome onLogin={handleLogin}/>}
            {loginSuccess &&
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="lg:px-52 lg:py-20 px-4 py-10 flex flex-col">
                    <h1 className="px-4 lg:text-3xl text-4xl font-bold">Gamify Productivity</h1>
                    <div className="mx-4 my-2 px-4 border-l-2">
                        <h2 className="p-color">Gamify Your Tasks to Increase Productivity</h2>
                        <h3 className="aa-color text-sm">Inspired by <i>Notion Life Gamification</i> by Solt Wagner</h3>
                    </div>
                    <MainMenu username={username}/>
                </motion.div>
            }
        </AnimatePresence>
    );
}
