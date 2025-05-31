import type { Meta, StoryObj } from "@storybook/react";
import { Main } from "./components/main";
import { RequestItem } from "./components/RequestItem";
import React, { useState } from "react";
import { RequestList } from "./components/RequestList";
import data from "./data.json";
import { Button } from "@/components/atoms/button/button";

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
  render: (args) => {
    const [requests] = useState(args.requests);
    const [empty, setEmpty] = useState(false);

    return (
      <div>
        <Button onClick={() => setEmpty(!empty)}>Empty Requests</Button>
        <div>
          <RequestList requests={empty ? [] : requests} />
        </div>
      </div>
    );
  },
};
