import type { Meta, StoryObj } from "@storybook/react";
import { Globe, Mail, Phone, User } from "lucide-react";
import { MultiSelect } from "./multiselect";

const meta = {
  title: "Components/Atoms/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible multi-select component with advanced features like search, animations, and customizable styling.

### Features

- Search functionality
- Select all/clear all options
- Customizable badge styles
- Optional animations
- Icon support
- Responsive design
- Keyboard navigation
- Customizable max display count

### Usage

\`\`\`tsx
import { MultiSelect } from "@/components/atoms/multi-select/multiselect";

function MyComponent() {
  const options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
  ];

  return (
    <MultiSelect
      options={options}
      onValueChange={(values) => console.log(values)}
      placeholder="Select items..."
    />
  );
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    options: {
      description:
        "Array of option objects with label, value, and optional icon",
      control: "object",
    },
    onValueChange: {
      description: "Callback fired when selected values change",
      control: false,
    },
    defaultValue: {
      description: "Array of pre-selected values",
      control: "object",
    },
    placeholder: {
      description: "Text shown when no options are selected",
      control: "text",
    },
    animation: {
      description: "Animation duration in seconds for badge bouncing effect",
      control: { type: "number", min: 0, max: 5, step: 0.1 },
    },
    maxCount: {
      description: "Maximum number of badges to show before collapsing",
      control: { type: "number", min: 1, max: 10 },
    },
    variant: {
      description: "Visual style variant of the badges",
      control: "select",
      options: ["default", "secondary", "destructive", "inverted"],
    },
    modalPopover: {
      description: "Whether the popover should be modal",
      control: "boolean",
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const defaultOptions = [
  { label: "Users", value: "users", icon: User },
  { label: "Messages", value: "messages", icon: Mail },
  { label: "Contacts", value: "contacts", icon: Phone },
  { label: "Website", value: "website", icon: Globe },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select options...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const WithDefaultValues: Story = {
  args: {
    options: defaultOptions,
    defaultValue: ["users", "messages"],
    placeholder: "Select options...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
  parameters: {
    docs: {
      description: {
        story: "MultiSelect initialized with pre-selected values.",
      },
    },
  },
};

export const WithAnimation: Story = {
  args: {
    options: defaultOptions,
    animation: 0.5,
    placeholder: "Select options (with animation)...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the badge bouncing animation effect.",
      },
    },
  },
};

export const WithCustomMaxCount: Story = {
  args: {
    options: [
      ...defaultOptions,
      { label: "Settings", value: "settings" },
      { label: "Profile", value: "profile" },
      { label: "Dashboard", value: "dashboard" },
      { label: "Analytics", value: "analytics" },
    ],
    maxCount: 2,
    defaultValue: ["users", "messages", "contacts", "website"],
    placeholder: "Select options...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how the component handles displaying many selected values with a lower maxCount.",
      },
    },
  },
};

export const SecondaryVariant: Story = {
  args: {
    options: defaultOptions,
    variant: "secondary",
    placeholder: "Select options...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
  parameters: {
    docs: {
      description: {
        story: "MultiSelect with secondary styling variant.",
      },
    },
  },
};

export const WithManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })),
    placeholder: "Select from many options...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how the component handles a large number of options.",
      },
    },
  },
};

export const Modal: Story = {
  args: {
    options: defaultOptions,
    modalPopover: true,
    placeholder: "Select options (modal)...",
    onValueChange: (values) => console.log("Selected values:", values),
  },
  parameters: {
    docs: {
      description: {
        story: "MultiSelect with modal popover behavior.",
      },
    },
  },
};
