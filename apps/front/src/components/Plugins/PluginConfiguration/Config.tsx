import React from 'react';
import { Icon } from '@iconify/react';

import PluginIframe from './Iframe';

interface ConfigProps {
  plugin: string;
  title: string;
  url: string;
  minWidth?: number;
  minHeight?: number;
}

function Config({ plugin, title, url, minWidth, minHeight }: ConfigProps) {
  return (
    <div className="mx-7 space-y-5 p-4 text-center centered-container">
      <h1 className="text-3xl font-bold">Plugin first configuration</h1>
      <div className="flex flex-row justify-center gap-6">
        <Icon icon="mdi:arrow-down" className="w-6 h-6" />
        <p className="text-base-content">Please, follow steps to configure your new {plugin} plugin</p>
        <Icon icon="mdi:arrow-down" className="w-6 h-6" />
      </div>
      <div className="bg-base-100 border border-base-300 rounded-btn p-4">
        <PluginIframe plugin={plugin + title} url={`http://localhost:9595${url}`} minWidth={minWidth} minHeight={minHeight} />
      </div>
    </div>
  );
}

Config.defaultProps = {
  minWidth: 0,
  minHeight: 0,
};

export default Config;
