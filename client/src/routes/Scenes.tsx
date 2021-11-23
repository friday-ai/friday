import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { SceneCardList } from '../components/Scenes/SceneCard';
import ScenesToolbar from '../components/Scenes/ScenesToolbar';
import Notification from '../components/Notification/Notification';
import UndrawEmpty from '../components/Illustrations/UndrawEmpty';

import { SceneType } from '../utils/interfaces';
import { useApi } from '../services/api/ApiProvider';
import { contains } from '../utils/array';
import ModalConfirm from '../components/Modal/ModalConfirm';

let sceneList: SceneType[] = [];

const Scenes: React.FC = () => {
  const { scenes } = useApi();

  const [flipKey, setFlipKey] = useState(v4());
  const [filteredScenes, setFilteredScenes] = useState<SceneType[]>([]);
  const [searchField, setSearchField] = useState('');
  const [filters, setFilters] = useState(['active', 'inactive', 'errored']);
  const [sort, setSort] = useState('a-z');

  useEffect(() => {
    scenes.getAll().then((res) => {
      sceneList = res.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name);
      });
      setFlipKey(v4());
      setFilteredScenes(sceneList);
    });
  }, [scenes]);

  useEffect(() => {
    let list = sceneList;

    list = list.filter(
      (scene) => scene.name.toLowerCase().includes(searchField.toLowerCase()) || scene.description.toLowerCase().includes(searchField.toLowerCase())
    );

    list = list.filter((scene) => contains([scene.status], filters));

    list = list.sort((a, b) => {
      if (sort === 'z-a') return b.name.toLowerCase().localeCompare(a.name);
      return a.name.toLowerCase().localeCompare(b.name);
    });

    setFlipKey(v4());
    setFilteredScenes(list);
  }, [filters, searchField, sort]);

  const onDelete = (scene: SceneType) => {
    ModalConfirm({
      title: 'Delete a scene',
      message: 'Are you sure you want to delete this scene ? This action cannot be undone.',
      onOk: () => {
        scenes.delete(scene).then((res) => {
          if (res.success) {
            const list = sceneList.filter((s) => s.id !== scene.id);
            setFlipKey(v4());
            setFilteredScenes(list);
            sceneList = list;

            Notification.success({ title: 'Scene deleted successfully.' });
          }
        });
      },
    });
  };

  const onEdit = (scene: SceneType) => {
    // TODO: create edition view
    Notification.info({ title: `Editing scene '${scene.name}'`, message: 'But for the moment this is not implemented :)' });
  };

  const onStatusChange = (scene: SceneType, value: string) => {
    const sceneToUpdate = scene;
    sceneToUpdate.status = value;

    scenes.patch(sceneToUpdate).then((_res) => {
      Notification.success({ title: 'Scene status change', message: `Status of scene '${scene.name}' set to ${value}` });
    });
  };

  const onStart = (scene: SceneType) => {
    // TODO: call api
    Notification.success({ title: `Scene '${scene.name}' started !`, message: 'But for the moment this is not implemented :)' });
  };

  const onCreate = () => {
    Notification.info({ title: 'Create scene', message: 'Sorry, this is not implemented for the moment :(' });
  };

  return (
    <div>
      <ScenesToolbar onSearch={setSearchField} onFilter={setFilters} onSort={setSort} onCreate={onCreate} />
      <SceneCardList
        flipKey={`${flipKey}`}
        scenes={filteredScenes}
        onDelete={onDelete}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onStart={onStart}
      />

      {filteredScenes.length === 0 && (
        <div className="centered-container">
          <UndrawEmpty className="self-center" width="400" height="400" />
          <h1 className="my-5 text-4xl font-bold text-center">No results found.</h1>
        </div>
      )}
    </div>
  );
};

export default Scenes;
