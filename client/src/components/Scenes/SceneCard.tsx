import React, { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Icon } from '@iconify/react';

import Switch from '../Generic/Switch';
import { SceneType } from '../../utils/interfaces';
import Tooltip from '../Generic/Tooltip';

interface SceneCardProps {
  scene: SceneType;
  onStart: (scene: SceneType) => void;
  onDelete: (scene: SceneType) => void;
  onEdit: (scene: SceneType) => void;
  onStatusChange: (scene: SceneType, value: string) => void;
  flippedProps?: unknown;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, onStart, onDelete, onEdit, onStatusChange, flippedProps }) => {
  const [status, setStatus] = useState(scene.status);

  const onChange = (value: boolean) => {
    scene.status = value ? 'active' : 'inactive';
    setStatus(scene.status);
    onStatusChange(scene, scene.status);
  };

  return (
    <div {...flippedProps} className={`card-base ${status === 'errored' && 'border-error'}`}>
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
              onClick={() => onEdit(scene)}
            >
              <Icon icon="ic:baseline-edit-note" className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip msg="Delete scene">
            <button aria-label="Delete scene" type="button" className="btn btn-circle btn-sm btn-primary p-2" onClick={() => onDelete(scene)}>
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

      <button type="button" className="btn btn-ghost btn-block bg-base-300 mt-0" onClick={() => onStart(scene)}>
        {' '}
        START{' '}
      </button>
    </div>
  );
};

SceneCard.defaultProps = {
  flippedProps: {},
};

interface SceneListProps {
  flipKey: string;
  scenes: SceneType[];
  onStart: (scene: SceneType) => void;
  onDelete: (scene: SceneType) => void;
  onEdit: (scene: SceneType) => void;
  onStatusChange: (scene: SceneType, value: string) => void;
}

const SceneCardList = ({ flipKey, scenes, onStart, onDelete, onEdit, onStatusChange }: SceneListProps): JSX.Element => {
  return (
    <Flipper className="grid-container grid-cols-minmax-280 m-5" flipKey={`${flipKey}`} decisionData={{ type: 'list' }}>
      <>
        {scenes.map((scene) => (
          <Flipped flipId={`item-${scene.id}`} key={`item-${scene.id}`}>
            {(flippedProps) => (
              <SceneCard
                scene={scene}
                onStart={onStart}
                onDelete={onDelete}
                onEdit={onEdit}
                onStatusChange={onStatusChange}
                flippedProps={flippedProps}
              />
            )}
          </Flipped>
        ))}
      </>
    </Flipper>
  );
};

export { SceneCardList, SceneCard };
