import React from 'react';
import { motion } from 'framer-motion';
import { SVGProps } from '../../utils/interfaces';
import { useAppSelector } from '../../services/store/store';
import { themeColors } from '../App/app.reducer';

const FaviconLoader: React.FC<SVGProps> = ({ className = '', height = '250', width = '206' }) => {
  const colors = useAppSelector(themeColors);

  const transition = {
    duration: 4,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <svg
      id="466f8ab7-2527-4c08-a168-e79693ae8f8f"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
      stroke="currentColor"
      strokeWidth={3}
      fill={colors.primary}
    >
      <motion.path
        d="M 46.189883,510.98092 V 211.25131 L 256,1.4411962 V 128.82613 L 136.10856,248.71878 v 262.26214 l -89.918677,0"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      />
      <motion.path
        d="M 465.81011,510.98092 V 211.25131 L 256,1.4411962 V 128.82613 l 119.89265,119.89265 v 262.26214 l 89.91746,0"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      />
      <motion.path
        d="M 151.09514,428.55574 V 308.66308 L 256,196.26554 V 323.64966 L 151.09514,428.55574"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      />
      <motion.path
        d="M 360.90607,428.55574 V 308.66308 L 256,196.26554 v 127.38412 z"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      />
    </svg>
  );
};
export default FaviconLoader;
