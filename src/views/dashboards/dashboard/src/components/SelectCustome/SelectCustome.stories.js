import { SelectCustome } from ".";

export default {
  title: "Components/SelectCustome",
  component: SelectCustome,
  argTypes: {
    stateProp: {
      options: ["default", "success", "focus", "hover", "error", "disabled"],
      control: { type: "select" },
    },
    textConfigurations: {
      options: ["input-text", "label-text", "placeholder-text"],
      control: { type: "select" },
    },
    size: {
      options: ["m", "SM", "LG"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    inputText: "Input",
    labelText: "Label",
    supportingText: "Help text",
    iconRight: true,
    placeholderText: "Placeholder",
    showSupportingText: true,
    iconLeft: false,
    stateProp: "default",
    textConfigurations: "input-text",
    size: "m",
    className: {},
    hasFormLabel: true,
    inputTextClassName: {},
    inputType: "text",
  },
};
