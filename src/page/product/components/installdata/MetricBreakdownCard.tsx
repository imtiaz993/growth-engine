import { BarChartOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const MetricBreakdownCard = () => {
  return (
    <InfoCard
      heading="Q Metric Breakdown & Optimization"
      variant="secondary"
      icon={<BarChartOutlined />}
      content={
        <>
          <p>
            DAU remains stable, but IAP revenue declines. Investigate recent
            feature/content changes to identify potential conversion drop-offs.
          </p>
          <p>
            Ad watch rates are steady, but frequency is low. Add mechanisms like "Watch 3
            ads daily to claim rewards" to boost repeat engagement.
          </p>
        </>
      }
    />
  );
};

export default MetricBreakdownCard;