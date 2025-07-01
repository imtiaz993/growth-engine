import { ArrowDownOutlined, WarningOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const AlertCard = () => {
  return (
    <InfoCard
      heading="Creative Alert"
      variant="secondary"
      icon={<WarningOutlined className="text-blue-600 text-lg" />}
      subText={
        <div className="flex items-center gap-1 text-sm text-red-600 justify-end">
          <span>20% decline</span>
          <ArrowDownOutlined />
        </div>
      }
      content={
        <p className="!mt-2 text-sm leading-[1.6]">
          Creative B & Creative C declined 20% week by week on Applovin, please
          replace with new Creatives
        </p>
      }
    />
  );
};

export default AlertCard;
