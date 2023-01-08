import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Favicon from '../../../components/Illustrations/Favicon';
import Map from '../../../components/Map/Map';
import useForm from '../../../services/hooks/useForm';

interface House {
  name: string;
  position: [number, number];
  rooms: string[];
  roomName: string;
}

function House({ submit }: { submit: (name: string, position: [number, number], rooms: string[]) => void }) {
  const navigate = useNavigate();

  const { onSubmit, onChange, onUpdate, data, errors, setCustomErrors } = useForm<House>({
    initialValues: {
      name: '',
      position: [0, 0],
      rooms: [],
      roomName: '',
    },
    validations: {
      name: {
        allowEmpty: {
          value: false,
          message: 'The name of house cannot be empty',
        },
      },
      position: {},
      rooms: {
        allowEmpty: {
          value: false,
          message: 'You need to add one room or more',
        },
      },
      roomName: {},
    },
  });

  const handleSubmit = async () => {
    const res = await onSubmit(null);
    if (res) {
      submit(data.name, data.position, data.rooms);
      navigate('/signup/final');
    }
  };

  const AddRoom = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.type === 'keyup' && (e as React.KeyboardEvent).key === 'Enter' && data.roomName.length === 0) {
      setCustomErrors('roomName', 'The name of room cannot be empty');
      return;
    }

    if (((e.type === 'keyup' && (e as React.KeyboardEvent).key === 'Enter') || e.type === 'click') && data.roomName.length >= 1) {
      onUpdate('rooms', [...data.rooms, data.roomName]);
      onUpdate('roomName', '');
      setCustomErrors('roomName', '');
    }
  };

  const onRemoveRoom = (room: string) => {
    onUpdate(
      'rooms',
      data.rooms.filter((r) => r !== room)
    );
  };

  return (
    <form className="card-base flex flex-col items-center p-10 h-4/5 w-4/5 xl:w-3/5 overflow-auto">
      <div className="mb-5 flex-none">
        <Favicon width="60" height="60" />
      </div>

      <span className="text-xl mb-5 flex-none">House information</span>

      <div className="flex flex-row grow w-full justify-evenly md:space-x-20">
        <div className="hidden sm:block basis-10/12">
          <Map
            markers={[{ title: data.name, position: data.position }]}
            onNewMarker={(latitude, longitude) => onUpdate('position', [latitude, longitude])}
          />
        </div>
        <div className="flex flex-col space-y-4 basis-full sm:basis-1/2 md:basis-11/12 lg:basis-6/12">
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Main house"
              className={`input input-bordered ${errors.name && 'input-error'}`}
              value={data.name}
              onInput={onChange('name')}
            />
            <label htmlFor="name" className={`label p-0 pt-1 ${errors.name ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.name}</span>
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="room" className="label">
              <span className="label-text">Add all rooms in your home</span>
            </label>
            <div className="input-group">
              <input
                id="room"
                name="room"
                type="text"
                placeholder="Bedroom"
                className={`input input-bordered w-full ${(errors.rooms || errors.roomName) && 'input-error'}`}
                value={data.roomName}
                onInput={onChange('roomName')}
                onKeyUp={AddRoom}
              />
              <button type="button" className="btn" onClick={AddRoom}>
                Add
              </button>
            </div>
            <label htmlFor="room" className={`label p-0 pt-1 ${errors.rooms ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.rooms}</span>
            </label>
            <label htmlFor="name" className={`label p-0 pt-1 ${errors.roomName ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.roomName}</span>
            </label>
            <div className="flex flex-wrap gap-2 py-5">
              {data.rooms.map((room) => (
                <button key={room} type="button" className="btn btn-primary btn-outline btn-xs" onClick={() => onRemoveRoom(room)}>
                  <span className="hidden md:block">{room}</span>
                  <Icon icon="ic:outline-close" className="w-5 h-5 md:ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-sm self-end flex-none mt-5" onClick={handleSubmit}>
        Next step
      </button>
    </form>
  );
}

export default House;
