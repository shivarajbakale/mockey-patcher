import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MockSelectionDialog } from "./mock-selection-dialog";
import { useRequestsStore } from "@/devtool-panels/api-tracker/store/requests";

const meta = {
  title: "Components/Molecules/MockSelectionDialog",
  component: MockSelectionDialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A dialog component for filtering network requests based on multiple criteria:

- **URL Substring**: Filter requests by matching URL text
- **Origins**: Multi-select filter for request origins (domains)
- **Duration Range**: Filter requests by their response time

### Features

- Real-time filtering feedback
- Multi-criteria filtering
- Origin selection with search
- Duration range slider
- Live count of matching requests
- Filter summary display

### Usage

\`\`\`tsx
import { MockSelectionDialog } from "@/components/molecules/mock-selection-dialog/mock-selection-dialog";

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <MockSelectionDialog 
      open={open} 
      onOpenChange={setOpen}
    />
  );
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls the visibility of the dialog",
    },
    onOpenChange: {
      description: "Callback fired when the dialog open state changes",
    },
  },
} satisfies Meta<typeof MockSelectionDialog>;

export default meta;
type Story = StoryObj<typeof MockSelectionDialog>;

// Mock data for the stories
const mockRequests = [
  {
    url: "https://api.example.com/users",
    method: "GET",
    status: 200,
    duration: 150,
    requestId: "1",
    responseBody: "{}",
    requestBody: null,
    numberOfBytes: 1024,
    startTime: Date.now(),
    endTime: Date.now() + 150,
  },
  {
    url: "https://api.example.com/posts",
    method: "POST",
    status: 201,
    duration: 300,
    requestId: "2",
    responseBody: "{}",
    requestBody: null,
    numberOfBytes: 2048,
    startTime: Date.now(),
    endTime: Date.now() + 300,
  },
  {
    url: "https://api2.different.com/data",
    method: "GET",
    status: 200,
    duration: 500,
    requestId: "3",
    responseBody: "{}",
    requestBody: null,
    numberOfBytes: 4096,
    startTime: Date.now(),
    endTime: Date.now() + 500,
  },
];

// Helper to initialize the store with mock data
const initializeStore = () => {
  const store = useRequestsStore.getState();
  mockRequests.forEach((request) => store.addRequest(request));
};

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log("Dialog open state:", open),
  },
  decorators: [
    (Story) => {
      initializeStore();
      return <Story />;
    },
  ],
};

export const WithPreselectedFilters: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log("Dialog open state:", open),
  },
  decorators: [
    (Story) => {
      const store = useRequestsStore.getState();
      store.clearRequests();
      mockRequests.forEach((request) => store.addRequest(request));
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story: "Example showing the dialog with some pre-selected filters.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log("Dialog open state:", open),
  },
  decorators: [
    (Story) => {
      const store = useRequestsStore.getState();
      store.clearRequests();
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Shows how the dialog appears when there are no requests to filter.",
      },
    },
  },
};

export const WithManyOrigins: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log("Dialog open state:", open),
  },
  decorators: [
    (Story) => {
      const store = useRequestsStore.getState();
      store.clearRequests();

      // Generate many requests with different origins
      const origins = [
        "https://api1.example.com",
        "https://api2.example.com",
        "https://api3.example.com",
        "https://different.com",
        "https://another.com",
        "https://test.com",
        "https://dev.example.com",
        "https://staging.example.com",
      ];

      origins.forEach((origin, index) => {
        store.addRequest({
          url: `${origin}/endpoint`,
          method: "GET",
          status: 200,
          duration: 100 + index * 50,
          requestId: `req-${index}`,
          responseBody: "{}",
          requestBody: null,
          numberOfBytes: 1024,
          startTime: Date.now(),
          endTime: Date.now() + 100,
        });
      });

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how the dialog handles a large number of unique origins in the origin selector.",
      },
    },
  },
};

export const WithLongDurations: Story = {
  args: {
    open: true,
    onOpenChange: (open: boolean) => console.log("Dialog open state:", open),
  },
  decorators: [
    (Story) => {
      const store = useRequestsStore.getState();
      store.clearRequests();

      // Add requests with varying durations
      [100, 500, 1000, 2000, 5000, 10000].forEach((duration, index) => {
        store.addRequest({
          url: `https://api.example.com/endpoint-${index}`,
          method: "GET",
          status: 200,
          duration,
          requestId: `req-${index}`,
          responseBody: "{}",
          requestBody: null,
          numberOfBytes: 1024,
          startTime: Date.now(),
          endTime: Date.now() + duration,
        });
      });

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Shows how the duration slider handles a wide range of request durations.",
      },
    },
  },
};
