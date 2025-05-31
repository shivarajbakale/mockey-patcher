import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { Switch } from "./switch";

const meta = {
  title: "UI/Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    id: "airplane-mode",
  },
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Story />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
  ],
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
