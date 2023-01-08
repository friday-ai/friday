import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import Switch from '../Generic/Switch';
import { SceneType } from '../../utils/interfaces';
import Tooltip from '../Generic/Tooltip';

interface SceneCardProps {
  scene: SceneType;
  onSceneClick: (event: 'start' | 'edit' | 'delete', scene: SceneType) => void;
  onStatusChange: (scene: SceneType, value: string) => void;
}

function SceneCard({ scene, onSceneClick, onStatusChange }: SceneCardProps) {
  const [status, setStatus] = useState(scene.status);

  const onChange = (value: boolean) => {
    scene.status = value ? 'active' : 'inactive';
    setStatus(scene.status);
    onStatusChange(scene, scene.status);
  };

  return (
    <div className={`card-base ${status === 'errored' && 'border-error'}`}>
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center rounded-box border-2 border-base-300 p-2">
            <Icon icon={scene.icon} className={`w-12 h-12 ${status === 'active' ? 'text-primary' : 'text-base-300'}`} />
          </div>
        </div>
        <div className="flex items-start">
          <Tooltip msg="Edit scene">
            <button
              type="button"
              aria-label="Edit scene"
              className={`btn btn-circle btn-sm btn-primary p-2 mr-2 ${status === 'errored' && 'animate-pulse'}`}
              onClick={() => onSceneClick('edit', scene)}
            >
              <Icon icon="ic:baseline-edit-note" className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip msg="Delete scene">
            <button
              aria-label="Delete scene"
              type="button"
              className="btn btn-circle btn-sm btn-primary p-2"
              onClick={() => onSceneClick('delete', scene)}
            >
              <Icon icon="ic:baseline-delete-outline" className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      <p className="text-lg font-medium mb-1">{scene.name}</p>

      <Tooltip msg={scene.description} condition={scene.description.length >= 27}>
        <p className="self-start truncate mb-1 w-48">{scene.description}</p>
      </Tooltip>

      {status !== 'errored' && <Switch id={scene.id} label="Active" checked={status === 'active'} cb={onChange} />}

      {status === 'errored' && (
        <div className="flex mb-1 justify-center">
          <span className="text-error font-extrabold mr-2 my-1">Errored</span>
          {scene.errorMessage && (
            <Tooltip msg={scene.errorMessage}>
              <Icon icon="ic:baseline-help-outline" className="w-6 h-6 text-error my-1" />
            </Tooltip>
          )}
        </div>
      )}

      <button type="button" className="btn btn-ghost btn-block bg-base-300 mt-0" onClick={() => onSceneClick('start', scene)}>
        {' '}
        START{' '}
      </button>
    </div>
  );
}

export default SceneCard;
