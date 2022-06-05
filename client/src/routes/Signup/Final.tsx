import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Favicon from '../../components/Loader/Loader';

const Brand: React.FC = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        staggerChildren: 2.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div className="centered-container" variants={container} initial="hidden" animate="visible">
      <div key="logo">
        <Favicon className="p-2" />
      </div>
      <motion.h1 key="title" className="mt-10 text-3xl text-primary font-bold" variants={item}>
        Friday is now initializing, this step can take a few minutes.
      </motion.h1>
      <motion.h3 key="description" className="mt-10 text-1xl" variants={item}>
        When Friday is ready, you will be automatically redirected to the dashboard
      </motion.h3>
    </motion.div>
  );
};

export default Brand;
