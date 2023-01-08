import React from 'react';
import { SVGProps } from '../../utils/interfaces';
import { useAppSelector } from '../../services/store/store';
import { themeColors } from '../App/app.reducer';

const Favicon: React.FC<SVGProps> = ({ className = '', height = '250', width = '206' }) => {
  const colors = useAppSelector(themeColors);
  return (
    <svg
      id="466f8ab7-2527-4c08-a168-e79693ae8f8f"
      viewBox="0 0 206 250"
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 102.941V250H44.1176V121.324L102.941 62.5V0L0 102.941Z" fill={colors.primary} />
      <path d="M205.882 102.941V250H161.765V121.324L102.941 62.5V0L205.882 102.941Z" fill={colors.primary} />
      <path d="M102.941 95.5884L51.4706 150.735V209.559L102.941 158.088V95.5884Z" fill={colors.primary} />
      <path d="M102.941 95.5884L154.412 150.735V209.559L102.941 158.088V95.5884Z" fill={colors.primary} />
    </svg>
  );
};

export default Favicon;
