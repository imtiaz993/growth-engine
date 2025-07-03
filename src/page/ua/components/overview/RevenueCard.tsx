import type { FC } from "react";
import { ArrowUpOutlined, RiseOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const RevenueCard: FC = () => {
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
          Your Revenue increased by 5% last week. The key contributors were
          Tiktok and Snapchat, with strong campaign scaling in Korea and China.
        </p>
      }
    />
  );
};

export default RevenueCard;
