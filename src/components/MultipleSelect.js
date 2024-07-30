import React from "react";
import { Select, Checkbox } from "antd";

const { Option, OptGroup } = Select;

const MySelectWithCheckbox = ({
  items = [],
  onSelect,
  onDeselect,
  ...props
}) => {
  // const [selectedValues, setSelectedValues] = React.useState([]);

  // const handleCheckboxChange = (value, checked) => {
  //   if (checked) {
  //     // Add the value to the selectedValues array only if it's not already present
  //     if (!selectedValues.includes(value)) {
  //       setSelectedValues([...selectedValues, value]);
  //     }
  //   } else {
  //     // Remove the value from the selectedValues array
  //     setSelectedValues(selectedValues.filter((val) => val !== value));
  //   }
  // };

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="Please select"
      onSelect={onSelect}
      onDeselect={onDeselect}
      {...props}
    >
      {items.map((group) => (
        <OptGroup key={group.groupname} label={group.groupname}>
          {group.options.map((option) => (
            <Option
              key={`${group.groupname}_${option.value}`}
              value={`${option.value}`}
              {...option}
            >
              {option.label}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default MySelectWithCheckbox;
