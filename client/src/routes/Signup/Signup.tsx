import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Brand from './Brand';
import Language from './Steps/Language';
import Account from './Steps/Account';
import Settings from './Steps/Settings';
import House from './Steps/House';
import Final from './Final';

import { useApp } from '../../services/AppProvider';
import { UserType } from '../../utils/interfaces';

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
  const [data, setData] = useState<UserType>({});
  const location = useLocation();

  const handleDataChange = (d: UserType) => {
    setData((prevState) => ({
      ...prevState,
      ...d,
    }));
  };

  const setLanguage = (code: string) => {
    handleDataChange({ language: code });
  };

  const setUser = async (username: string, email: string, password: string) => {
    handleDataChange({ name: 't', firstName: 't', username, email, password, role: 'superadmin' });
    await app.signup(data);
  };

  const setSettings = async (units: string, history: string) => {
    handleDataChange({ units });
    await app.users.patch(data);
    await app.variables.create({ key: 'history_state_in_days', value: history });
  };

  const setHouse = async (name: string, position: [number, number], rooms: string[]) => {
    const house = await app.houses.create({ name, latitude: position[0], longitude: position[1] });
    rooms.map(async (room) => {
      await app.rooms.create({ name: room, houseId: house.id });
    });
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
