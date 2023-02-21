import React from 'react';

interface BadgeProps {
  text: string;
  size?: '' | 'badge-ws' | 'badge-sm' | 'badge-md' | 'badge-lg';
  type?: '' | 'badge-primary' | 'badge-secondary' | 'badge-accent' | 'badge-ghost' | 'badge-info' | 'badge-success' | 'badge-warning' | 'badge-error';
}

function Badge({ text, size, type }: BadgeProps) {
  return <div className={`badge p-3 ${type} ${size} badge-outline truncate`}>{text}</div>;
}

Badge.defaultProps = {
  size: '',
  type: '',
};

export default Badge;
