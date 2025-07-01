import { AreaChartOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";

const LTVInsightCard = () => {
  return (
    <InfoCard
      heading="LTV Insights"
      variant="tertiary"
      icon={<AreaChartOutlined />}
      content={
        <>
          <p>
            Fast Ads Monetization: Ads LTV grows rapidly in the first 3 days,
            ideal for early payback. IAP Catches Up Later: IAP LTV lags early
            but closes the gap by D7-D30.
          </p>
          <p>
            Channel LTV Varies: Some channels peak early, others grow steadily —
            budget should adapt. Install Date Impacts LTV: May 19 cohort shows
            highest LTV — suggests fluctuating traffic quality.
          </p>
          <p>
            Growth Flattens Post-D7: LTV curves plateau after Day 7 — consider
            boosting mid/late-stage engagement.
          </p>
        </>
      }
    />
  );
};

export default LTVInsightCard;
