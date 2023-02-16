import React, { useRef, useState, useEffect, useCallback } from 'react';

import { useAppSelector } from '../../../services/store/store';
import { theme } from '../../App/app.reducer';
import randomStr from '../../../utils/utils';
import { getCssTheme } from '../../../services/theme/themeColor';

interface PluginIframeProps {
  plugin: string;
  url: string;
  hidden?: boolean;
  minWidth?: number;
  minHeight?: number;
  setPluginState?: (state: number) => void;
}

function PluginIframe({ plugin, url, hidden, minWidth, minHeight, setPluginState }: PluginIframeProps) {
  const selectedTheme = useAppSelector(theme);
  const frame = useRef<HTMLIFrameElement>(null);
  const [id] = useState(randomStr(15));

  const postMessage = useCallback(
    (type: string, msg: Record<string, unknown>) => {
      if (frame.current !== null) {
        frame.current.contentWindow?.postMessage({ source: 'friday', type, id, ...msg }, '*');
      }
    },
    [frame, id]
  );

  const setFrameLength = useCallback(
    (width: number, height: number) => {
      if (frame.current !== null) {
        if (minHeight === 0 && minHeight < height) {
          frame.current.style.height = `${height}px`;
        } else {
          frame.current.style.height = `${minHeight}px`;
        }

        if (minWidth === 0 && minWidth < width) {
          frame.current.style.width = `${width + 100}px`;
        } else {
          frame.current.style.width = `${minWidth}px`;
        }
      }
    },
    [minWidth, minHeight]
  );

  const updateTheme = useCallback(() => {
    if (frame.current !== null && hidden !== true) {
      const css = getCssTheme(selectedTheme);
      postMessage('set-theme', { theme: selectedTheme, css });
    }
  }, [hidden, postMessage, selectedTheme]);

  const onLoad = () => {
    if (frame.current !== null && hidden !== true) {
      // Force width on laod to ensure the client get the real necessary width
      frame.current.style.width = `2000px`;
      postMessage('get-content-length', {});
      updateTheme();
    }
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const msg = event.data;
      if (msg.source && msg.source === 'fpl' && msg.id === id) {
        switch (msg.type) {
          case 'content-length':
            setFrameLength(msg.data.width, msg.data.height);
            break;
          case 'plugin-refresh':
            if (frame.current !== null) {
              frame.current.src += '';
            }
            break;
          case 'plugin-state':
            if (setPluginState) {
              setPluginState(msg.data.state === 'plugin.waiting.configuration' ? 1 : 0);
            }
            break;
          default:
            break;
        }
      }
    });
  }, [id, frame, setPluginState, setFrameLength]);

  useEffect(() => {
    updateTheme();
  }, [updateTheme]);

  return (
    <iframe
      ref={frame}
      className={`w-full ${hidden === true ? 'hidden' : ''}`}
      id={plugin}
      title={plugin}
      src={url}
      sandbox="allow-scripts allow-same-origin"
      onLoad={onLoad}
    />
  );
}

PluginIframe.defaultProps = {
  hidden: false,
  minWidth: 0,
  minHeight: 0,
  setPluginState: (_state: number) => null,
};

export default PluginIframe;
