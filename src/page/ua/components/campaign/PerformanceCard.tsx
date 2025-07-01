import { ArrowUpOutlined, BulbOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const PerformanceCard = () => {
  return (
    <InfoCard
      heading="Creative Performance"
      variant="primary"
      icon={<BulbOutlined className="text-blue-600 text-lg" />}
      subText={
        <div className="flex items-center gap-1 text-sm text-green-600">
          <span>50% increase</span>
          <ArrowUpOutlined />
        </div>
      }
      content={
        <p className="!mt-2 text-sm leading-[1.6]">
          Creative A recently performing great, spends Increasing 50% on Tiktok,
          scale and expand it to more campaigns!
        </p>
      }
    />
  );
};

export default PerformanceCard;
