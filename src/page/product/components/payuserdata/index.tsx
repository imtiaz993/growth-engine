import ConversionRate from "./ConversionRate";
import ConversionUser from "./ConversionUser";
import PayAge from "./PayAge";
import PayDays from "./PayDays";
import PayUserCard from "./PayUserCard";

const PayUserData = () => {
  return (
    <div className="">
      <h1 className="font-bold text-xl pt-10">Pay User Dashboard</h1>
      <PayUserCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4 ">
        <PayAge />
        <ConversionUser />
        <ConversionRate />
        <PayDays />
      </div>
    </div>
  );
};

export default PayUserData;
