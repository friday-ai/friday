import React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { PluginType } from '../../utils/interfaces';

interface PluginCardProps {
  plugin: PluginType;
  flippedProps?: unknown;
}

const PluginCard: React.FC<PluginCardProps> = ({ flippedProps = {}, plugin }) => {
  return (
    <div {...flippedProps} className="card-base shadow-none border border-gray-300">
      {plugin.name}
    </div>
  );
};

interface PluginListProps {
  flipKey: string;
  plugins: PluginType[];
}

const PluginList = ({ flipKey, plugins }: PluginListProps): JSX.Element => {
  return (
    <Flipper className="m-5 grid-container grid-cols-minmax-180" flipKey={`${flipKey}`} decisionData={{ type: 'list' }}>
      <>
        {plugins.map((plugin) => (
          <Flipped flipId={`item-${plugin.id}`} key={`item-${plugin.id}`}>
            {(flippedProps) => <PluginCard plugin={plugin} flippedProps={flippedProps} />}
          </Flipped>
        ))}
      </>
    </Flipper>
  );
};

export { PluginList, PluginCard };
