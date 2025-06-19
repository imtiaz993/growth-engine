import Overview from "./components/Overview";
import Campaign from "./components/Campaign";
import Creative from "./components/Creative";

const Page = () => {
  return (
    <div className="p-4">
      <Overview />
      <Campaign />
      <Creative />
    </div>
  );
};

export default Page;
