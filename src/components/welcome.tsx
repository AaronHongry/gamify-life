"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, setDoc, doc, Timestamp} from "firebase/firestore";
import LoginPanel from "./loginPanel";
import SignUpPanel from "./signupPanel";

interface WelcomeInterface {
    onLogin: (username: string) => void;
}

const Welcome: React.FC<WelcomeInterface> = ({onLogin}) => {
    const [loginError, setLoginError] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const fetchUsers = async () => {
        try {
            const query = await getDocs(collection(db, "users"));
            return query.docs.map(doc => doc.data());
        } catch (error) {
            console.log("Error fetching users.", error);
            return [];
        }
    };

    const handleLogin = async (username: string, password: string) => {
        const users = await fetchUsers();
        const user = users.find(user => user.username == username && user.password == password);

        if (user) {
            setLoginError(false);
            onLogin(user.username);
        } else {
            setLoginError(true);
        }
    };

    const handleSignUp = async (username: string, password: string) => {
        try {
            await setDoc(doc(db, "users", username), {
                username: username,
                password: password,
                lastLogin: Timestamp.fromDate(new Date("2000-01-01")),
                level: 1,
                xp: 0,
                streak: 0,
                tasks: [
                    {id: "task-1737364792", name: "Go to the gym.", tag: "Health", xp: 5, completed: false, date: ""},
                    {id: "task-1737364847", name: "Do a LeetCode problem.", tag: "Work", xp: 10, completed: false, date: ""}
                ],
                completedTasks: [],
                rewards: [
                    {id: "reward-1737361234", name: "Play Guitar", tag: "Other", cost: 100, active: false, date: "January 19, 2025"},
                    {id: "reward-1737364567", name: "Watch Netflix", tag: "Movies", cost: 20, active: false, date: "January 19, 2025"},
                    {id: "reward-1737362345", name: "Go clubbing", tag: "Party", cost: 50, active: false, date: "January 19, 2025"}
                ],
                inventory: [],
                totalXp: 0,
            });
            onLogin(username);
        } catch (error) {
            console.log("Error adding user.", error);
        }
    };

    const handleChange = () => {
        setShowLogin(!showLogin);
    };
    
    return (
        <motion.div exit={{opacity: 0}} className="w-screen h-screen lg:px-52 lg:py-20 px-4 py-10 flex flex-col justify-center items-center">
            <motion.div className="h-full w-full flex flex-col items-center justify-center">
                <AnimatePresence>
                    {showLogin && <LoginPanel loginError={loginError} onLogin={handleLogin} onChange={handleChange}/>}
                    {!showLogin && <SignUpPanel onSignUp={handleSignUp} onChange={handleChange}/>}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default Welcome;