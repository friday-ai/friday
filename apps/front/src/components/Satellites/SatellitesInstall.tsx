import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import useForm from '../../services/hooks/useForm';

import Modal from '../Modal/Modal';
import FaviconLoader from '../Loader/Loader';
import Countdown from '../Countdown/Countdown';

import useSharedApp from '../../services/App';

import { WebsocketMessageType } from '../../utils/constants';
import { SatelliteType } from '../../utils/interfaces';

interface SatellitesInstallProps {
  openModal: boolean;
  satellites: SatelliteType[];
  setOpenModal: (openModal: boolean) => void;
}

interface PluginType {
  name: string;
  version: string;
  repoTag: string;
  satelliteId: string;
}

const SatellitesInstall: React.FC<SatellitesInstallProps> = ({ openModal, setOpenModal, satellites }) => {
  const [loading, setLoading] = useState(false);
  const [pluginInstalled, setPluginInstalled] = useState(false);
  const { plugins, emitter } = useSharedApp();
  const { onSubmit, onChange, data, errors } = useForm<PluginType>({
    initialValues: {
      name: '',
      version: '',
      repoTag: '',
      satelliteId: '',
    },
    validations: {
      name: {
        allowEmpty: {
          value: false,
          message: 'The plugin name cannot be empty',
        },
      },
      version: {
        allowEmpty: {
          value: false,
          message: 'The plugin version cannot be empty',
        },
      },
      repoTag: {
        allowEmpty: {
          value: false,
          message: 'The plugin tag cannot be empty',
        },
      },
      satelliteId: {
        allowEmpty: {
          value: false,
          message: 'The satellite id cannot be empty',
        },
      },
    },
  });

  const handleSubmit = async () => {
    const res = await onSubmit(null);
    if (res) {
      await plugins.install(data);
    }
  };

  const handleInstall = useCallback((_: string) => {
    setLoading(true);
  }, []);

  const handleInstalled = useCallback(
    (_: string) => {
      setPluginInstalled(true);
      setTimeout(() => {
        setOpenModal(false);
        setPluginInstalled(false);
        setLoading(false);
      }, 5000);
    },
    [setOpenModal, setPluginInstalled, setLoading]
  );

  useEffect(() => {
    emitter.addListener(WebsocketMessageType.PLUGIN_INSTALLING, handleInstall);
    emitter.addListener(WebsocketMessageType.PLUGIN_INSTALLED, handleInstalled);
  }, [emitter, handleInstall, handleInstalled]);

  return (
    <Modal open={openModal} hasActionsButtons={!loading} onConfirm={handleSubmit} onClose={() => setOpenModal(false)}>
      {loading ? (
        <div className="flex flex-col place-content-center place-items-center">
          <div className={`swap cursor-auto ${pluginInstalled && 'swap-active'}`}>
            <div className="swap-off text-center">
              <h3 className="font-bold text-lg">Installing plugin</h3>
              <FaviconLoader />
            </div>
            <div className="swap-on text-center flex flex-col place-items-center">
              <h3 className="font-bold text-lg">Plugin installed</h3>
              <Icon icon="mdi:checkbox-marked-circle-outline" className="w-32 h-32 place-self-center grow text-success" />
              <Countdown start={pluginInstalled} count={5} />
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-4">
          <h3 className="font-bold text-lg">Complete the information of the plugin to install</h3>
          <div className="form-control">
            <label htmlFor="plugin-name" className="label">
              <span className="label-text">Name of plugin</span>
            </label>
            <input
              id="plugin-name"
              name="plugin-name"
              type="text"
              placeholder="Zwave"
              required
              className={`input input-bordered ${errors.name && 'input-error'}`}
              value={data.name}
              onInput={onChange('name')}
            />
            <label htmlFor="username" className={`label p-0 pt-1 ${errors.name ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.name}</span>
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="plugin-version" className="label">
              <span className="label-text">Version of plugin</span>
            </label>
            <div className="relative">
              <input
                id="plugin-version"
                name="plugin-version"
                type="text"
                placeholder="1.0.0"
                required
                className={`input input-bordered w-full ${errors.version && 'input-error'}`}
                value={data.version}
                onInput={onChange('version')}
              />
              <label htmlFor="username" className={`label p-0 pt-1 ${errors.version ? 'visible' : 'invisible'}`}>
                <span className="label-text-alt text-error">{errors.version}</span>
              </label>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="plugin-repoTag" className="label">
              <span className="label-text">Tag of plugin</span>
            </label>
            <input
              id="plugin-repoTag"
              name="plugin-repoTag"
              type="text"
              placeholder="zwavejs:latest"
              required
              className={`input input-bordered ${errors.repoTag && 'input-error'}`}
              value={data.repoTag}
              onInput={onChange('repoTag')}
            />
            <label htmlFor="username" className={`label p-0 pt-1 ${errors.repoTag ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.repoTag}</span>
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="plugin-repoTag" className="label">
              <span className="label-text">Satellite where plugin will be installed</span>
            </label>
            <select className="select select-bordered" onChange={onChange('satelliteId')}>
              {satellites.map((satellite) => (
                <option key={satellite.id} value={satellite.id}>
                  {satellite.name}
                </option>
              ))}
            </select>
            <label htmlFor="username" className={`label p-0 pt-1 ${errors.satelliteId ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.satelliteId}</span>
            </label>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default SatellitesInstall;
