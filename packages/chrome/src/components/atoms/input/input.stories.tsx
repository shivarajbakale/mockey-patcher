import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "UI/Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithLabel: Story = {
  args: {
    type: "text",
    placeholder: "Enter email",
    id: "email",
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="email">Email</label>
        <Story />
      </div>
    ),
  ],
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};
