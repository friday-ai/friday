import React, { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Icon } from '@iconify/react';

import Switch from '../Generic/Switch';
import { SceneType } from '../../utils/interfaces';
import Tooltip from '../Tooltip/Tooltip';
import { useTheme } from '../../services/theme/ThemeProvider';

interface SceneCardProps {
  children?: React.ReactNode;
  scene: SceneType;
  onStart: (scene: SceneType) => void;
  onDelete: (scene: SceneType) => void;
  onEdit: (scene: SceneType) => void;
  onStatusChange: (scene: SceneType, value: string) => void;
  flippedProps?: unknown;
}

const SceneCard: React.FunctionComponent<SceneCardProps> = ({ scene, onStart, onDelete, onEdit, onStatusChange, flippedProps = {} }) => {
  const [status, setStatus] = useState(scene.status);
  const { theme } = useTheme();

  const onChange = (value: boolean) => {
    scene.status = value ? 'active' : 'inactive';
    setStatus(scene.status);
    onStatusChange(scene, scene.status);
  };

  return (
    <div
      {...flippedProps}
      className={`card-base ${theme.sceneCard.background} ${status === 'errored' ? theme.sceneCard.errorBorder : theme.sceneCard.border}`}
    >
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <div className={`rounded-2xl relative p-2 w-16 h-16 flex items-center justify-center ${theme.sceneCard.border}`}>
            <Icon icon={scene.icon} className={`w-10 h-10 ${status === 'active' ? theme.sceneCard.textActive : theme.sceneCard.text}`} />
          </div>
        </div>
        <div className="flex items-start">
          <Tooltip msg="Edit scene" placement="top">
            <button
              type="button"
              className={`p-2 rounded-full mx-3 ${theme.sceneCard.manageButton} ${status === 'errored' ? 'animate-pulse' : ''}`}
              onClick={() => onEdit(scene)}
            >
              <Icon icon="ic:baseline-edit-note" className={`w-4 h-4 ${theme.sceneCard.manageButtonContentsColor}`} />
            </button>
          </Tooltip>
          <Tooltip msg="Delete scene" placement="top">
            <button type="button" className={`p-2 rounded-full ${theme.sceneCard.manageButton}`} onClick={() => onDelete(scene)}>
              <Icon icon="ic:baseline-delete-outline" className={`w-4 h-4 ${theme.sceneCard.manageButtonContentsColor}`} />
            </button>
          </Tooltip>
        </div>
      </div>

      <p className={`${theme.sceneCard.titleColor} text-lg font-medium mb-1`}>{scene.name}</p>

      <Tooltip msg={scene.description} condition={scene.description.length >= 27}>
        <p className={`self-start truncate mb-1 w-48 ${theme.sceneCard.text}`}>{scene.description}</p>
      </Tooltip>

      {status !== 'errored' && (
        <Switch
          id={scene.id}
          label="Active"
          checked={status === 'active'}
          cb={onChange}
          textStyle={theme.sceneCard.switchTextColor}
          switchStyle={theme.sceneCard.switchStyle}
        />
      )}

      {status === 'errored' && (
        <div className="flex mb-1 justify-center">
          <span className="text-red-600 font-extrabold mr-2 my-1">Errored</span>
          {scene.errorMessage && (
            <Tooltip msg={scene.errorMessage} placement="top">
              <Icon icon="ic:baseline-help-outline" className="w-6 h-6 text-red-600 my-1" />
            </Tooltip>
          )}
        </div>
      )}

      <button type="button" className={`btn-base w-full text-base mt-0 ${theme.sceneCard.startButton}`} onClick={() => onStart(scene)}>
        {' '}
        START{' '}
      </button>
    </div>
  );
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
    <Flipper className="grid-container m-5 grid-cols-minmax-280" flipKey={`${flipKey}`} decisionData={{ type: 'list' }}>
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
