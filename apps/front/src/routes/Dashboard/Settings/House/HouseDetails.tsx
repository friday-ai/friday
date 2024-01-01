import React, { useEffect, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Button, Chip, Divider, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { HouseAttributes, HouseCreationAttributes } from '@friday-ai/shared';
import { enqueueSnackbar } from 'notistack';
import Map from '../../../../components/Map/Map';
import useHouse from '../../../../services/api/useHouse';
import useRoom from '../../../../services/api/useRoom';

interface HouseDetailsProps {
  house: HouseAttributes | HouseCreationAttributes;
  selectHouse: (id: string) => void;
}

export default function HouseDetails({ house, selectHouse }: HouseDetailsProps) {
  const { t } = useTranslation();
  const { createHouse, updateHouse } = useHouse();
  const { createRoom, deleteRoom } = useRoom();

  const [houseName, setHouseName] = useState('');
  const [houseCoordinates, setHouseCoordinates] = useState<[number, number]>([0, 0]);

  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState<string[]>([]);
  const [roomsToDelete, setRoomsToDelete] = useState<string[]>([]);
  const [roomsToCreate, setRoomsToCreate] = useState<string[]>([]);

  const houseMustBeSaved = houseName !== house.name || houseCoordinates[0] + houseCoordinates[1] !== Number(house.latitude) + Number(house.longitude);

  const handleAddRoom = () => {
    if (roomName !== '' && roomName.replace(/ /g, '') !== '') {
      // If in initial state key 'rooms' is present, it mean isn't a new house
      // so additional stuff is necessary, else, simply add to list
      if ('rooms' in house && house.rooms) {
        // Add to list only if the room was not present in the starting list
        // else remove it from delete list
        if (!house.rooms.some((r) => r.name === roomName)) {
          setRoomsToCreate([...roomsToCreate, roomName]);
        } else {
          const id = house.rooms.filter((r) => r.name === roomName).map((r) => r.id);
          setRoomsToDelete(roomsToDelete.filter((r) => r !== id[0]));
        }
      } else {
        setRoomsToCreate([...roomsToCreate, roomName]);
      }

      setRooms([...rooms, roomName]);
      setRoomName('');
    }
  };

  const handleDeleteRoom = (name: string) => {
    const filteredRooms = rooms.filter((r) => r !== name);
    setRooms(filteredRooms);

    // If in initial state key 'rooms' is present, it mean isn't a new house
    // so additional stuff is necessary
    if ('rooms' in house && house.rooms) {
      const id = house.rooms.filter((r) => r.name === name).map((r) => r.id);
      const newList = [...roomsToDelete, ...id];
      setRoomsToDelete(newList);
    }

    // Also filter rooms to create to prevent a room that is deleted by user before was saved
    setRoomsToCreate(roomsToCreate.filter((r) => r !== name));
  };

  const handleSave = async () => {
    let houseId = 'id' in house ? house.id : '';

    if (houseMustBeSaved) {
      if ('id' in house) {
        await updateHouse.mutateAsync({
          id: houseId,
          house: { name: houseName, latitude: houseCoordinates[0].toString(), longitude: houseCoordinates[1].toString() },
        });
      } else {
        const res = await createHouse.mutateAsync({
          name: houseName,
          latitude: houseCoordinates[0].toString(),
          longitude: houseCoordinates[1].toString(),
        });

        houseId = res.id;
      }
    }

    if (roomsToCreate.length !== 0) {
      roomsToCreate.map(async (name) => {
        await createRoom.mutateAsync({ name, houseId });
      });
    }

    if (roomsToDelete.length !== 0) {
      roomsToDelete.map(async (rId) => {
        await deleteRoom.mutateAsync(rId);
      });
    }

    // Ensure house still selected
    selectHouse(houseId);
    enqueueSnackbar('House saved', { variant: 'success' });
  };

  /** This is necessary because it is the parent component which
   * holds the initial data and which decides which house to modify,
   * so this component is unfortunately rendered twice at startup
   */
  useEffect(() => {
    setHouseName(house.name);
    setHouseCoordinates([Number(house.latitude), Number(house.longitude)]);
    setRooms('rooms' in house && house.rooms ? house.rooms.map((h) => h.name) : []);
  }, [house]);

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          {t('settings.house.edit')}
        </Typography>
        <Button
          variant={'outlined'}
          startIcon={<SaveOutlinedIcon />}
          onClick={handleSave}
          disabled={!(houseMustBeSaved || roomsToCreate.length !== 0 || roomsToDelete.length !== 0)}
        >
          {t('settings.house.save')}
        </Button>
      </Stack>
      <Paper sx={{ padding: '2rem' }}>
        <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
          <Stack spacing={2} width={400}>
            <TextField
              label={t('settings.house.houseName')}
              id="house"
              type="text"
              value={houseName}
              onChange={(event) => {
                setHouseName(event.target.value);
              }}
            />

            <Map
              markers={[{ title: houseName, position: houseCoordinates }]}
              onNewMarker={(latitude, longitude) => {
                setHouseCoordinates([latitude, longitude]);
              }}
            />

            <TextField
              label={t('settings.house.latitude')}
              id="latitude"
              type="number"
              value={houseCoordinates[0]}
              onChange={(event) => {
                setHouseCoordinates([Number(event.target.value), houseCoordinates[1]]);
              }}
            />

            <TextField
              label={t('settings.house.longitude')}
              id="longitude"
              type="number"
              value={houseCoordinates[1]}
              onChange={(event) => {
                setHouseCoordinates([houseCoordinates[0], Number(event.target.value)]);
              }}
            />
          </Stack>

          <Stack spacing={2} width={400}>
            <TextField
              label={t('settings.house.rooms')}
              id="rooms"
              type="text"
              value={roomName}
              onChange={(event) => {
                setRoomName(event.target.value);
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
                    <IconButton aria-label="add room" onClick={handleAddRoom} edge="end">
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {rooms.map((r) => (
                <Chip key={`${r}`} label={r} color="primary" variant="outlined" onDelete={() => handleDeleteRoom(r)} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
