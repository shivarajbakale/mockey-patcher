import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: "terms",
    children: "Accept terms and conditions",
  },
};

export const Disabled: Story = {
  args: {
    id: "terms",
    disabled: true,
    children: "Accept terms and conditions",
  },
};

export const WithLabel: Story = {
  args: {
    id: "terms",
    children: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    id: "terms",
    checked: true,
    children: "Accept terms and conditions",
  },
};
