import type { Meta, StoryObj } from "@storybook/react";
import { Main } from "./components/main";

const meta: Meta<typeof Main> = {
  title: "Devtools/APITracker",
  component: Main,
};

export default meta;

export const Default: StoryObj<typeof Main> = {};
