import { Separator } from "@/components/ui/separator";
import MainMenu from "@/components/mainMenu";

export default function Home() {
  return (
    <div className="px-52 py-20 flex flex-col">
      <h1 className="px-4 text-3xl font-bold">Gamify Productivity</h1>
      <div className="mx-4 my-2 px-4 border-l-2">
        <h2 className="p-color">Gamify Your Tasks to Increase Productivity</h2>
        <h3 className="aa-color text-sm">Inspired by <i>Notion Life Gamification</i> by Solt Wagner</h3>
      </div>
      <MainMenu/>
    </div>
  );
}
