import type { Meta, StoryObj } from "@storybook/react";
import { APITracker } from "./api-tracker";

const meta: Meta<typeof APITracker> = {
  title: "Devtools/APITracker",
  component: APITracker,
};

export default meta;

export const Default: StoryObj<typeof APITracker> = {};
