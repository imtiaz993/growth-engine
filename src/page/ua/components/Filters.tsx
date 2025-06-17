import { useState } from "react";
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;

const allChannels = [
  "Appier",
  "Apple",
  "Applovin",
  "Bilibili (呼噜哔哩)",
  "Facebook",
  "Google Ads",
  "IronSource",
  "MOLOCO",
  "Mintegral",
  "Ocean Engine",
  "Persona.ly",
  "TikTok",
  "Snapchat",
  "Twitter",
  "Unity",
];

const allCountries = ["US", "China", "Korea", "Japan", "Brazil", "Germany"];

const Filters = () => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleChannelChange = (value: string[]) => {
    if (value.includes("all")) {
      if (selectedChannels.length === allChannels.length) {
        setSelectedChannels([]);
      } else {
        setSelectedChannels(allChannels);
      }
      return;
    }

    setSelectedChannels(value);
  };

  return (
    <div className="flex justify-between">
      <div>
        <Select
          placeholder="Rodeo"
          options={[{ value: "Rodeo", label: "Rodeo" }]}
          className="w-40"
        />
      </div>
      <div className="flex gap-5">
        <Select
          mode="multiple"
          placeholder="Channel"
          className="w-48"
          value={selectedChannels}
          onChange={handleChannelChange}
          maxTagCount={0}
          maxTagPlaceholder={(selected) =>
            selected.length ? `${selected.length} channels selected` : undefined
          }
          options={[
            {
              label:
                selectedChannels.length !== allChannels.length
                  ? "Select All"
                  : "Unselect All",
              value: "all",
            },
            ...allChannels.map((channel) => ({
              label: channel,
              value: channel,
            })),
          ]}
        />

        <Select
          mode="multiple"
          placeholder="Country"
          className="w-48"
          value={selectedCountries}
          onChange={setSelectedCountries}
          maxTagCount={selectedCountries.length === 1 ? 1 : 0}
          maxTagPlaceholder={(selected) =>
            selected.length
              ? `${selected.length} countries selected`
              : undefined
          }
          options={allCountries.map((country) => ({
            label: country,
            value: country,
          }))}
        />
        <RangePicker className="w-56" />
      </div>
    </div>
  );
};

export default Filters;
