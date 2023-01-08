import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Favicon from '../../components/Illustrations/Favicon';

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
      <motion.div key="logo" variants={item}>
        <Favicon className="p-2" width="100" height="100" />
      </motion.div>
      <motion.h1 key="title" className="mt-10 text-4xl text-primary font-bold" variants={item}>
        Welcome to Friday
      </motion.h1>
      <motion.button key="button" className="mt-10 btn btn-wide btn-sm" variants={item} onClick={() => navigate('/signup/language')}>
        Start
      </motion.button>
    </motion.div>
  );
};

export default Brand;
