import { ExclamationCircleOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const LTVCard = () => {
  return (
    <div className="mt-5">
      <InfoCard
        heading="LTV D0 Alert"
        variant="danger"
        titleSize="base"
        icon={<ExclamationCircleOutlined className="text-red-600 text-lg" />}
        content={
          <p>
            Your overall LTV D0 decreased from 30% to 25%, the reason was LTV D0
            on Apple decreased and LTV D7 on Applovin decreased, please check
            your campaign details to optimize.
          </p>
        }
      />
    </div>
  );
};

export default LTVCard;
