import { DatePicker, Select } from "antd";

const Filters = () => {
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
        <Select placeholder="Channel" className="w-40" />
        <Select placeholder="Country" className="w-40" />
        <DatePicker placeholder="Date" className="w-52" />
      </div>
    </div>
  );
};

export default Filters;
