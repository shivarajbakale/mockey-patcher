import type { Meta, StoryObj } from "@storybook/react";
import { Main } from "./components/main";
import { RequestItem } from "./components/RequestItem";
import React from "react";
import { RequestList } from "./components/RequestList";
import data from "./data.json";

const meta: Meta<typeof Main> = {
  title: "Devtools/APITracker",
  component: Main,
};

export default meta;

export const RequestItemStory: StoryObj<typeof RequestItem> = {
  args: {
    request: data[0],
  },
  render: (args) => <RequestItem {...args} />,
};

export const RequestListStory: StoryObj<typeof RequestList> = {
  args: {
    requests: data,
  },
  render: (args) => <RequestList {...args} />,
};
