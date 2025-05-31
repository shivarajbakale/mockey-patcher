import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./typography";

const meta = {
  title: "Components/Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "small",
        "lead",
      ],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    children:
      "This is a paragraph of text. It demonstrates the default typography style for body text in the application.",
  },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "This is a lead paragraph that stands out from regular text.",
  },
};

export const Blockquote: Story = {
  args: {
    variant: "blockquote",
    children:
      "This is a blockquote. It's perfect for highlighting important quotes or statements.",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    children:
      "This is small text, perfect for captions or auxiliary information.",
  },
};

export const CustomElement: Story = {
  args: {
    variant: "h1",
    as: "div",
    children: "This is a heading styled text rendered as a div",
  },
};

export const WithCustomClass: Story = {
  args: {
    variant: "p",
    className: "text-blue-500 font-bold",
    children: "This paragraph has custom styling applied through className.",
  },
};
