import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Brand from './Brand';
import Language from './Steps/Language';
import Account from './Steps/Account';
import Settings from './Steps/Settings';
import House from './Steps/House';
import Final from './Final';

import { useApp } from '../../services/AppProvider';

const animation = {
  variants: {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  },
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 50,
  },
};

const Signup: React.FC = () => {
  const app = useApp();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const restartServer = async () => {
    setTimeout(async () => {
      const res = await app.system.init();
      if (res.success) {
        navigate('/dashboard');
      }
    }, 3000);
  };

  const setUser = async (userName: string, email: string, password: string) => {
    await app.signup({ userName, email, password, language, role: 'superadmin' });
  };

  const setSettings = async (units: string, history: string) => {
    await app.variables.create({
      key: 'system_units',
      value: units,
      owner: app.session?.user?.id,
      ownerType: 'user',
    });

    await app.variables.create({
      key: 'history_state_in_days',
      value: history,
      owner: app.session?.user?.id,
      ownerType: 'satellite',
    });
  };

  const setHouse = async (name: string, position: [number, number], rooms: string[]) => {
    const house = await app.houses.create({ name, latitude: position[0], longitude: position[1] });
    rooms.map(async (room) => {
      await app.rooms.create({ name: room, houseId: house.id });
    });
    await restartServer();
  };

  return (
    <AnimatePresence key={location.pathname}>
      <motion.div
        className="centered-container overflow-hidden"
        initial="initial"
        animate="in"
        exit="out"
        variants={animation.variants}
        transition={animation.transition}
      >
        <Routes>
          <Route path="/" element={<Brand />} />
          <Route path="language" element={<Language submit={setLanguage} />} />
          <Route path="account" element={<Account submit={setUser} />} />
          <Route path="settings" element={<Settings submit={setSettings} />} />
          <Route path="house" element={<House submit={setHouse} />} />
          <Route path="final" element={<Final />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default Signup;
