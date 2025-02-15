"use client";

import { motion } from "motion/react";
import { Input } from "./ui/input";
import { useState } from "react";

interface loginPanelProps {
    loginError: boolean,
    onLogin: (username: string, password: string) => void,
    onChange: () => void;
}

const LoginPanel: React.FC<loginPanelProps> = ({loginError, onLogin, onChange}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = () => {
        setUsernameError(!username);
        setPasswordError(!password);

        if (!username || !password) return;
        else {
            onLogin(username.toLowerCase(), password);
        }
    };

    return (
        <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 20, opacity: 0}} className="w-1/3 card-background py-12 px-6 flex flex-col items-center gap-3">
            <h1 className="text-3xl font-bold py-6 pb-8">Login to Your Account</h1>

            <div className="flex flex-col gap-2 w-full px-4">
                <h2>Username</h2>
                <Input onChange={e => setUsername(e.target.value)} className=""/>
                <h3 className={`${!usernameError ? "invisible" : ""} text-red-300`}>Please enter a username.</h3>
            </div>

            <div className="flex flex-col gap-2 w-full px-4">
                <h2>Password</h2>
                <Input onChange={e => setPassword(e.target.value)}type="password"/>
                <h3 className={`${!passwordError ? "invisible" : ""} text-red-300`}>Please enter a password.</h3>
            </div>

            <div className="flex flex-col gap-2 w-full px-4 pt-8">
            <h3 className={`${!loginError ? "invisible" : ""} text-red-300 text-center`}>There doesn't exist a user with that password. Please try again.</h3>
                <button className="s-bg h-12 rounded-xl overflow-hidden transition duration-300 hover:bg-p" onClick={handleLogin}>Login</button>
            </div>
            <div>
                <h1 className="hover:underline cursor-pointer" onClick={onChange}>Don't have an account? Sign up</h1>
            </div>
        </motion.div>
    );
    
};

export default LoginPanel;