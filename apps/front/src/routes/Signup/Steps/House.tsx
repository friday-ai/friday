import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MobileStepper from '@mui/material/MobileStepper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Map from '../../../components/Map/Map';

import { SignupProps } from '../Signup';

import useHouse from '../../../services/api/useHouse';
import useRoom from '../../../services/api/useRoom';

export default function House({ activeStep, setActiveStep }: SignupProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { createHouse } = useHouse();
  const { createRoom } = useRoom();

  const [houseName, setHouseName] = useState('');
  const [houseCoordinates, setHouseCoordinates] = useState<[number, number]>([0, 0]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [rooms, setRooms] = useState<string[]>([]);

  const [stepCompleted, setStepCompleted] = useState(true);

  const handleHouseNameChange = (change: string) => {
    setHouseName(change);

    if (change !== '' && change.replace(/ /g, '') !== '' && rooms.length > 0) {
      setStepCompleted(true);
    } else {
      setStepCompleted(false);
    }
  };

  const handleAddRoom = () => {
    if (currentRoom !== '' && currentRoom.replace(/ /g, '') !== '') {
      const newRooms = [...rooms, currentRoom];

      setRooms(newRooms);
      setCurrentRoom('');

      if (newRooms.length > 0 && houseName !== '' && houseName.replace(/ /g, '') !== '') {
        setStepCompleted(true);
      }
    }
  };

  const handleDeleteRoom = (roomName: string) => {
    const newRooms = rooms.filter((r) => r !== roomName);
    setRooms(newRooms);

    if (newRooms.length < 1) {
      setStepCompleted(false);
    }
  };

  const handleNext = async () => {
    const res = await createHouse.mutateAsync({ name: houseName, latitude: `${houseCoordinates[0]}`, longitude: `${houseCoordinates[1]}` });

    if (res) {
      rooms.forEach(async (r) => {
        await createRoom.mutateAsync({ name: r, houseId: res.id });
      });

      setActiveStep(activeStep + 1);
    }
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
          {t('signup.house.title')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
          {t('signup.house.description')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
          {t('signup.house.description2')}
        </Typography>
      </Box>

      <Map
        markers={[{ title: houseName, position: houseCoordinates }]}
        onNewMarker={(latitude, longitude) => setHouseCoordinates([latitude, longitude])}
      />

      <Stack direction="row" spacing={1}>
        <TextField
          label={t('signup.house.houseName')}
          id="house"
          type="text"
          value={houseName}
          onChange={(event) => {
            handleHouseNameChange(event.target.value);
          }}
        />

        <TextField
          label={t('signup.house.rooms')}
          id="rooms"
          type="text"
          value={currentRoom}
          onChange={(event) => {
            setCurrentRoom(event.target.value);
          }}
          InputProps={{
            onKeyPress: (event) => {
              const { key } = event;
              if (key === 'Enter') {
                handleAddRoom();
              }
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="add room" onClick={() => handleAddRoom()} edge="end">
                  <AddCircleOutlineIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {rooms.map((r, index) => (
          <Chip key={`${r}+${index + 1}`} label={r} color="primary" variant="outlined" onDelete={() => handleDeleteRoom(r)} />
        ))}
      </Stack>

      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button variant="contained" size="small" onClick={() => setActiveStep(activeStep - 1)}>
            {t('signup.general.back')}
          </Button>
        }
        nextButton={
          <Button variant="contained" size="small" onClick={() => handleNext()} disabled={!stepCompleted}>
            {t('signup.general.next')}
          </Button>
        }
      />
    </>
  );
}
