import type { Meta, StoryObj } from '@storybook/nextjs';
import ItemMenu from './ItemMenu';

const meta: Meta<typeof ItemMenu> = {
  title: 'Molecules/ItemMenu',
  component: ItemMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ItemMenu>;

export const Default: Story = {
  args: {},
};
