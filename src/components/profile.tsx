import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";

const Profile = () => {
    return (
        <div className="w-full h-full card-background shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
                <Image src="/pics/dp.jpg" alt="AH" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
            <div className="py-3 px-3">
                <h1 className="text-lg font-semibold">Aaron Hong</h1>
                <p className="text-color">Level: </p>
                <p className="text-color">XP: </p>
                <p className="text-color">Coins: </p>
            </div>
        </div>
    );
}

export default Profile;