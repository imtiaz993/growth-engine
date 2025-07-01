// components/SegmentationCard.tsx
import { BulbOutlined } from "@ant-design/icons";

import InfoCard from "../../../../components/InfoCard";

const SegmentationCard = () => {
  return (
    <InfoCard
      heading="User Segmentation Strategy"
      variant="primary"
      icon={<BulbOutlined />}
      content={
        <>
          <p>
            New users (Day 0 ~ Week 1) contribute the majority of IAP and ad revenue.
            Focus on optimizing onboarding, purchase entry points, and rewarded ad
            placements early on.
          </p>
          <p>
            Older users (After Month 3) show lower ARPPU and ad engagement. Reduce
            monetization pressure and shift towards content retention or re-engagement
            strategies.
          </p>
        </>
      }
    />
  );
};

export default SegmentationCard;