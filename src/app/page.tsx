import MainMenu from "@/components/mainMenu";

export default function Home() {
  return (
    <div className="lg:px-52 lg:py-20 px-4 py-10 flex flex-col">
      <h1 className="px-4 lg:text-3xl text-4xl font-bold">Gamify Productivity</h1>
      <div className="mx-4 my-2 px-4 border-l-2">
        <h2 className="p-color">Gamify Your Tasks to Increase Productivity</h2>
        <h3 className="aa-color text-sm">Inspired by <i>Notion Life Gamification</i> by Solt Wagner</h3>
      </div>
      <MainMenu/>
    </div>
  );
}
