import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta = {
  title: "UI/Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    delayDuration: 1000,
    children: (
      <>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me (delayed)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a 1 second delay</p>
        </TooltipContent>
      </>
    ),
  },
};
