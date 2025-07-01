import { ArrowUpOutlined, RiseOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const RevenueCard = () => {
  return (
    <InfoCard
      heading="Weekly Revenue"
      variant="primary"
      icon={<RiseOutlined className="text-blue-600 text-lg" />}
      subText={
        <div className="flex items-center gap-1 text-sm text-green-600">
          <span>5% increase</span>
          <ArrowUpOutlined />
        </div>
      }
      content={
        <p>
          Your Revenue increase by 5% last week, the key contributors on
          channels are from Tiktok and Snapchat, with your campaign scaling on
          Korea and China
        </p>
      }
    />
  );
};

export default RevenueCard;
