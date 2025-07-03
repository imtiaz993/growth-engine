import { useEffect, useState } from "react";
import type { FC } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { getBasicInfo } from "../../../../api/ua";

interface BasicData {
  adjust_latest_data_date: string;
}

const LastUpdate: FC = () => {
  const [basicData, setBasicData] = useState<BasicData | null>(null);
  const getBasicData = async () => {
    try {
      const response = await getBasicInfo();
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.data;
      setBasicData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBasicData();
  }, []);
  return (
    basicData && (
      <p>
        Data updated by {basicData?.adjust_latest_data_date}{" "}
        <Tooltip
          title={`This report was updated on ${new Intl.DateTimeFormat(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            }
          ).format(
            new Date()
          )}, based on Adjust data. However, due to Adjust’s reporting delay, the latest available data is only up to ${new Intl.DateTimeFormat(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            }
          ).format(new Date(basicData?.adjust_latest_data_date))}.`}
        >
          <QuestionCircleOutlined style={{ cursor: "pointer" }} />
        </Tooltip>{" "}
      </p>
    )
  );
};

export default LastUpdate;
