import React from 'react';
import { PluginType } from '../../utils/interfaces';

interface PluginCardProps {
  plugin: PluginType;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
  return <div className="card-base shadow-none border border-gray-300">{plugin.name}</div>;
};

export default PluginCard;
