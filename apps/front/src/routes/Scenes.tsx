import React, { useEffect, useState } from 'react';

import SceneCard from '../components/Scenes/SceneCard';
import ScenesToolbar from '../components/Scenes/ScenesToolbar';
import Notification from '../components/Notification/Notification';
import UndrawEmpty from '../components/Illustrations/UndrawEmpty';

import { SceneType } from '../utils/interfaces';
import ModalConfirm from '../components/Modal/ModalConfirm';
import useSharedApp from '../services/App';
import AnimatedList from '../components/AnimatedList/AnimatedList';

let sceneList: SceneType[] = [];

const Scenes: React.FC = () => {
  const { scenes } = useSharedApp();
  const [filteredScenes, setFilteredScenes] = useState<SceneType[]>([]);
  const [searchField, setSearchField] = useState('');
  const [filters, setFilters] = useState(['active', 'inactive', 'errored']);
  const [sort, setSort] = useState('a-z');

  useEffect(() => {
    scenes
      .getAll()
      .then((res) => {
        sceneList = res.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name);
        });
        setFilteredScenes(sceneList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [scenes]);

  useEffect(() => {
    let list = sceneList;

    list = list.filter(
      (scene) => scene.name.toLowerCase().includes(searchField.toLowerCase()) || scene.description.toLowerCase().includes(searchField.toLowerCase())
    );

    // list = list.filter((scene) => contains([scene.status], filters));

    list = list.sort((a, b) => {
      if (sort === 'z-a') return b.name.toLowerCase().localeCompare(a.name);
      return a.name.toLowerCase().localeCompare(b.name);
    });

    setFilteredScenes(list);
  }, [filters, searchField, sort]);

  const onSceneClick = (event: 'start' | 'edit' | 'delete', scene: SceneType) => {
    switch (event) {
      case 'start':
        // TODO: call api
        Notification.success({
          title: `Scene '${scene.name}' started !`,
          message: 'But for the moment this is not implemented :)',
        });
        break;
      case 'edit':
        // TODO: create edition view
        Notification.info({
          title: `Editing scene '${scene.name}'`,
          message: 'But for the moment this is not implemented :)',
        });
        break;
      default:
        ModalConfirm({
          title: 'Delete a scene',
          message: 'Are you sure you want to delete this scene ? This action cannot be undone.',
          onOk: () => {
            scenes.delete(scene).then((res) => {
              if (res.success) {
                const list = sceneList.filter((s) => s.id !== scene.id);
                setFilteredScenes(list);
                sceneList = list;

                Notification.success({ title: 'Scene deleted successfully.' });
              }
            });
          },
        });
        break;
    }
  };

  const onStatusChange = (scene: SceneType, value: string) => {
    const sceneToUpdate = scene;
    sceneToUpdate.status = value;

    scenes.patch(sceneToUpdate).then((_res) => {
      Notification.success({ title: 'Scene status change', message: `Status of scene '${scene.name}' set to ${value}` });
    });
  };

  const onCreate = () => {
    Notification.info({ title: 'Create scene', message: 'Sorry, this is not implemented for the moment :(' });
  };

  return (
    <div>
      <ScenesToolbar onSearch={setSearchField} onFilter={setFilters} onSort={setSort} onCreate={onCreate} />

      <div className="grid-container grid-cols-minmax-280 m-5">
        <AnimatedList
          renderItem={(item) => <SceneCard scene={item} onSceneClick={onSceneClick} onStatusChange={onStatusChange} />}
          items={filteredScenes}
        />
      </div>

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
