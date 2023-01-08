import React from 'react';

interface PluginDevicesProps {
  keys: { label: string; key: string }[];
  values: { [key: string]: string }[];
}

const PluginDevices: React.FC<PluginDevicesProps> = ({ keys, values }) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          {keys.map((k: { label: string; key: string }) => (
            <th key={`device-list-header-${k.key}`}>{k.label}</th>
          ))}
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {values.map((device: { [key: string]: string }) => (
          <tr key={JSON.stringify(device)} className="hover">
            {keys.map((k: { label: string; key: string }) => (
              <td key={JSON.stringify(device[k.key])}>{device[k.key]}</td>
            ))}
            <td>
              <button type="button" className="btn btn-xs btn-ghost">
                Manage
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PluginDevices;
