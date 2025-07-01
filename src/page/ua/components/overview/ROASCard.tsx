import { ArrowDownOutlined, FallOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const ROASCard = () => {
  return (
    <InfoCard
      heading="ROAS D0"
      variant="secondary"
      icon={<FallOutlined className="text-blue-600 text-lg" />}
      subText={
        <div className="flex items-center gap-1 text-sm text-red-600">
          <span>30% → 25%</span>
          <ArrowDownOutlined />
        </div>
      }
      content={
        <p>
          Your overall ROAS D0 decreased from 30% to 25%, the reason was ROAS D0
          on Apple decreased, please check your campaign details to optimize
        </p>
      }
    />
  );
};

export default ROASCard;
