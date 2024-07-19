import { Menu } from ".";

export default {
  title: "Components/Menu",
  component: Menu,
  argTypes: {
    menu: {
      options: ["menu-drawer", "semi-dark", "menu-collapsed-drawer", "border-menu-drawer"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    menu: "menu-drawer",
    className: {},
    logoClassName: {},
    menuDrawerClassName: {},
  },
};
