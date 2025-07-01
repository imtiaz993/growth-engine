import { RocketOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const OptimizationCard = () => {
  return (
    <InfoCard
      heading="Optimization Tip"
      variant="tertiary"
      icon={<RocketOutlined className="text-blue-600 text-lg" />}
      content={
        <p className="!mt-2 text-sm leading-[1.6]">
          Consider reallocating 15% of budget from underperforming creatives to
          Creative A for better overall ROAS
        </p>
      }
    />
  );
};

export default OptimizationCard;
