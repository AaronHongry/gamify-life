import { Separator } from "@/components/ui/separator";
import Profile from "@/components/profile";

const MainMenu = () => {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-1/5 h-full p-4">
                <h1 className="text-2xl font-semibold">My Profile</h1>
                <Separator className="my-3 aa-bg"/>
                <Profile />
            </div>
            <div className="p-4 w-4/5 h-full">
                <h1 className="text-2xl font-semibold">Todos</h1>
                <Separator className="my-3 aa-bg"/>
                <div className="w-full h-full card-background">
                <h1>Aaron Hong</h1>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;