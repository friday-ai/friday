import React from 'react';
import { Link } from 'react-router-dom';

import { PluginType } from '../../utils/interfaces';

interface PluginCardProps {
  plugin: PluginType;
}

function PluginCard({ plugin }: PluginCardProps) {
  return (
    <div className="card-base shadow-none border border-gray-300">
      {plugin.name}
      <Link to={`plugin/configuration/${plugin.name}/${plugin.id}`} className="btn btn-sm btn-ghost">
        Configuration
      </Link>
    </div>
  );
}

export default PluginCard;
