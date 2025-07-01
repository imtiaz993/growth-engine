// PlayUserCard.tsx

import { CrownOutlined } from "@ant-design/icons";
import InfoCard from "../../../../components/InfoCard";
const PayUserCard = () => {
  return (
    <InfoCard
      heading="Monetization Strategy by User Tier"
      variant="primary"
      icon={<CrownOutlined />}
      content={
        <>
          <p>
            Minnows dominate DAU, but contribute less to revenue per user (ARPPU: 8.89). Focus on scalable monetization mechanisms like low-friction bundles or ad incentives.
          </p>
          <p>
            Dolphins and Whales have high ARPPU (Dolphin: 31.82, Whale: 48.07) but limited DAU. Consider retention strategies (e.g., VIP missions, exclusive deals) to maintain high-value users.
          </p>
          <p>
            Whale conversion rate (0.61) is stable and highest among all groups. Ensure payment UX is smooth and personalized for this segment.
          </p>
        </>
      }
    />
  );
};

export default PayUserCard;
