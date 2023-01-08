import React, { useEffect, useState } from 'react';
import Tabs from '../../components/Generic/Tabs';
import Modal from '../../components/Modal/Modal';
import PluginHeader from '../../components/Plugins/PluginConfiguration/Header';
import PluginDevices from '../../components/Plugins/PluginConfiguration/Devices';
import PluginIframe from '../../components/Plugins/PluginConfiguration/Iframe';
import Config from '../../components/Plugins/PluginConfiguration/Config';

interface DevicesTabs {
  keys: { label: string; key: string }[];
  values: { [key: string]: string }[];
}

interface SettingsTabs {
  title: string;
}

interface PluginSchema {
  root: {
    title?: string;
    url?: string;
    header?: {
      logo: string;
      badges?: { title: string; value: string }[];
      action?: { text: string };
    };
    tabs?: {
      type?: 'devices' | 'settings';
      data?: DevicesTabs | SettingsTabs;
      custom?: boolean;
      title?: string;
      url?: string;
    }[];
  };
  config: {
    title?: string;
    url?: string;
  };
  modals?: {
    id: string;
    title: string;
    url: string;
    actions: string[];
  }[];
}

function PluginConfiguration() {
  const [openManagerModal, setOpenManagerModal] = useState(false);
  const [pluginState, setPluginState] = useState(1);
  const [data, setData] = useState<PluginSchema>({ root: {}, config: {} });

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.source && event.data.source === 'fpl') {
        if (event.data.type === 'initViews') {
          setData(event.data.data as PluginSchema);
        }
      }
    });
  }, []);

  return (
    <div className="m-4">
      <PluginIframe plugin="zwave" url="http://localhost:9595" hidden={data.root && data.root.url !== undefined} setPluginState={setPluginState} />

      {pluginState === 1 && data.config && data.config.url !== undefined && (
        <Config plugin="zwave" title={data.config.title || ''} url={data.config.url} />
      )}

      {pluginState !== 1 && data.root && data.root.url === undefined && (
        <div className="flex flex-col">
          {data.root && data.root.header && data.root.url === undefined && (
            <PluginHeader
              logo={data.root.header.logo}
              badges={data.root.header.badges}
              action={data.root.header.action}
              cb={() => setOpenManagerModal(true)}
            />
          )}

          {data.root && data.root.tabs && data.root.url === undefined && (
            <Tabs defaultTab="Devices">
              {data.root.tabs.map((tab) => {
                if (tab.type === 'devices' && tab.data && 'keys' in tab.data) {
                  return (
                    <div key="zwave-devices" data-label="Devices">
                      <PluginDevices keys={tab.data.keys} values={tab.data.values} />
                    </div>
                  );
                }

                if (tab.type === 'settings') {
                  return (
                    <div key="zwave-settings" data-label="Settings">
                      {JSON.stringify(tab)}
                    </div>
                  );
                }

                return (
                  <div data-label={tab.title}>
                    <PluginIframe key={`zwave-${tab.title}`} plugin={`zwave-${tab.title}`} url={`${tab.url}`} />
                  </div>
                );
              })}
            </Tabs>
          )}
        </div>
      )}

      {data.modals &&
        data.modals.map((modal) => (
          <Modal key={`zwave-${modal.id}`} open={openManagerModal} hasActionsButtons={false} onClose={() => setOpenManagerModal(false)}>
            <h3 className="font-bold text-lg mb-4">{modal.title}</h3>
            <PluginIframe plugin={`zwave-${modal.id}`} url={`http://localhost:9595${modal.url}`} />

            {modal.actions && (
              <div className="modal-action">
                {modal.actions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => null}
                    className="btn btn-primary btn-outline btn-sm font-medium sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </Modal>
        ))}
    </div>
  );
}

export default PluginConfiguration;
