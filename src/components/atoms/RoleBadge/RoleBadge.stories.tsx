import type { Meta, StoryObj } from '@storybook/nextjs';
import { ROLE_LABEL } from '@/constants/roles';
import RoleBadge from './RoleBadge';

const meta = {
  title: 'Atoms/RoleBadge',
  component: RoleBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoleBadge>;

export default meta;

type Story = StoryObj<typeof RoleBadge>;

export const AllRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      {/* eslint-disable-next-line jsx-a11y/aria-role */}
      <RoleBadge role="user">{ROLE_LABEL.user}</RoleBadge>
      {/* eslint-disable-next-line jsx-a11y/aria-role */}
      <RoleBadge role="manager">{ROLE_LABEL.manager}</RoleBadge>
    </div>
  ),
};
