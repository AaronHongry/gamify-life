"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Input } from "./ui/input";

interface SignUpPanelProps {
    onSignUp: (username: string, password: string) => void,
    onChange: () => void;
}

const SignUpPanel: React.FC<SignUpPanelProps> = ({onSignUp, onChange}) => {

    const [username, setUsername] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [passwordOneError, setPasswordOneError] = useState(false);
    const [passwordTwoError, setPasswordTwoError] = useState(false);

    const handleSignUp = () => {
        setUsernameError(!username);
        setPasswordOneError(!passwordOne);
        setPasswordTwoError(passwordOne != passwordTwo);

        if (!username || !passwordOne || passwordOne != passwordTwo) return;
        else {
            onSignUp(username, passwordOne);
        }
    }

    return (
        <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 20, opacity: 0}} className="w-1/3 card-background py-12 px-6 flex flex-col items-center gap-3">
            <h1 className="text-3xl font-bold py-6 pb-8">Sign Up for an Account</h1>

            <div className="flex flex-col gap-2 w-full px-4">
                <h2>Username</h2>
                <Input onChange={e => setUsername(e.target.value)} className=""/>
                <h3 className={`${!usernameError ? "invisible" : ""} text-red-300`}>Please enter a username.</h3>
            </div>

            <div className="flex flex-col gap-2 w-full px-4">
                <h2>Password</h2>
                <Input onChange={e => setPasswordOne(e.target.value)}type="password"/>
                <h3 className={`${!passwordOneError ? "invisible" : ""} text-red-300`}>Please enter a password.</h3>
            </div>

            <div className="flex flex-col gap-2 w-full px-4">
                <h2>Confirm Password</h2>
                <Input onChange={e => setPasswordTwo(e.target.value)}type="password"/>
                <h3 className={`${!passwordTwoError ? "invisible" : ""} text-red-300`}>This does not match the password above.</h3>
            </div>

            <div className="flex flex-col gap-2 w-full px-4 pt-8">
                <button className="s-bg h-12 rounded-xl overflow-hidden transition duration-300 hover:bg-p" onClick={handleSignUp}>Sign Up</button>
            </div>
            <div>
                <h1 className="hover:underline cursor-pointer" onClick={onChange}>Have an account? Login</h1>
            </div>
        </motion.div>
    );
}

export default SignUpPanel;