import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { WebsocketMessageTypes } from '@friday-ai/shared';
import { Box, Button, Divider, IconButton, InputAdornment, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { debounce } from '@mui/material/utils';

import { useTranslation } from 'react-i18next';
import Countdown from '../../../../components/Countdown/Countdown';
import FaviconLoader from '../../../../components/Loader/Loader';

import usePlugin from '../../../../services/api/usePlugin';
import useSharedApp from '../../../../services/app/useApp';

interface PluginVars {
  id: number;
  key: string;
  value: string;
}

export default function Install() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { installPlugin } = usePlugin();
  const { ws } = useSharedApp();

  const [loading, setLoading] = useState(false);
  const [pluginInstalled, setPluginInstalled] = useState(false);

  const [pluginvVars, setPluginVars] = useState<PluginVars[]>([]);
  const [name, setName] = useState('');
  const [repo, setRepo] = useState('');
  const [version, setVersion] = useState('');

  // States codes: 0 = initial, 1 = repo not found, 2 = repo found
  const [repoExisting, setRepoExisting] = useState(0);

  // Error codes: 0 = no error, 1 = name invalid, 2 = repo invalid, 3 = version invalid, 4 repo not found
  const [error, setError] = useState(0);

  const addPluginVar = () => {
    const newState = [...pluginvVars, { id: Date.now(), key: '', value: '' }];
    setPluginVars(newState);
  };

  const updateVar = (varId: number, key: string, value: string) => {
    setPluginVars(
      pluginvVars.map((variable) => {
        if (variable.id === varId) {
          return { id: varId, key, value };
        }
        return variable;
      }),
    );
  };

  const checkRepo = useMemo(
    () =>
      debounce((repository: string) => {
        const repoTag = repository.split(':');
        let url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://registry.hub.docker.com/v2/repositories/')}`;

        if (repoTag[1]) {
          url = `${url + repoTag[0]}/tags/?name=${repoTag[1]}`;
        } else {
          url = `${url + repository}`;
        }

        fetch(url)
          .then((res) => res.json())
          .then((res) => JSON.parse(res.contents))
          .then((res) => {
            if (res.message !== undefined && res.message.includes('404')) {
              setRepoExisting(2);
            } else if (res.count === 0) {
              setRepoExisting(2);
            } else {
              setRepoExisting(1);
            }
          })
          .catch((_err) => setRepoExisting(2));
      }, 500),
    [],
  );

  const getIcon = () => {
    switch (repoExisting) {
      case 1:
        return (
          <Tooltip title={t('dashboard.plugin.repoFound')}>
            <CheckIcon color="success" />
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip title={t('dashboard.plugin.repoNotFound')}>
            <CloseIcon color="error" />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const install = async () => {
    // Check fields
    if (name === '' || name.replace(/ /g, '') === '') {
      setError(1);
      return;
    }

    if (repo === '' || repo.replace(/ /g, '') === '') {
      setError(2);
      return;
    }

    if (version === '' || version.replace(/ /g, '') === '') {
      setError(3);
      return;
    }

    if (error === 0) {
      await installPlugin.mutateAsync({ name, repo, satelliteId: id || '', version, variables: [] });
    }
  };

  const handleInstall = useCallback(() => {
    setLoading(true);
  }, []);

  const handleInstalled = useCallback(() => {
    setPluginInstalled(true);
    setTimeout(() => {
      navigate(-1);
    }, 5000);
  }, [navigate]);

  useEffect(() => {
    ws.on(WebsocketMessageTypes.PLUGIN_INSTALLING, handleInstall);
    ws.on(WebsocketMessageTypes.PLUGIN_INSTALLED, handleInstalled);

    return () => {
      ws.off(WebsocketMessageTypes.PLUGIN_INSTALLING, handleInstall);
      ws.off(WebsocketMessageTypes.PLUGIN_INSTALLED, handleInstalled);
    };
  }, [ws, handleInstall, handleInstalled]);

  return (
    <Box maxWidth={1200} padding={2} marginLeft="auto" marginRight="auto">
      <Stack spacing={4} alignContent="center">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2} flex="none">
            <Stack justifyContent="center">
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
            </Stack>
            <Stack>
              <Typography variant="caption">{t('dashboard.plugin.goBack')}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {t('dashboard.plugin.installPlugin')}
              </Typography>
            </Stack>
          </Stack>
          <Stack justifyContent="center">
            <Button variant="outlined" onClick={() => install()}>
              {t('dashboard.plugin.install')}
            </Button>
          </Stack>
        </Stack>
        {loading ? (
          <Box textAlign="center">
            <div className={`swap ${pluginInstalled && 'swap-active'}`}>
              <div className="swap-on">
                <Typography marginBottom={2} variant="h5">
                  {t('dashboard.plugin.pluginInstalled')}
                </Typography>
                <CheckCircleOutlineOutlinedIcon color="success" sx={{ fontSize: 100, marginBottom: 2 }} />
                <Countdown start={pluginInstalled} count={5} />
              </div>
              <div className="swap-off">
                <Typography marginBottom={2} variant="h5">
                  {t('dashboard.plugin.pluginInstalling')}
                </Typography>
                <FaviconLoader />
              </div>
            </div>
          </Box>
        ) : (
          <Stack spacing={4} direction="row" divider={<Divider orientation="vertical" flexItem />}>
            <Stack spacing={4} flex={1}>
              <Typography variant="h6">{t('dashboard.plugin.pluginInformation')}</Typography>
              <TextField
                id="plugin-name"
                label={t('dashboard.plugin.pluginName')}
                type="text"
                error={error === 1}
                helperText={error === 1 ? t('dashboard.plugin.pluginNameInvalid') : ''}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="plugin-repo"
                label={t('dashboard.plugin.repo')}
                type="text"
                error={error === 2}
                helperText={error === 2 ? t('dashboard.plugin.repoInvalid') : ''}
                value={repo}
                onChange={(e) => {
                  checkRepo(e.target.value);
                  setRepo(e.target.value);
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{getIcon()}</InputAdornment>,
                }}
              />
              <TextField
                id="plugin-version"
                label={t('dashboard.plugin.version')}
                type="text"
                error={error === 3}
                helperText={error === 3 ? t('dashboard.plugin.versionInvalid') : ''}
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </Stack>
            <Stack spacing={4} flex={1}>
              <Typography variant="h6">{t('dashboard.plugin.variables')}</Typography>
              {pluginvVars.length !== 0 && (
                <>
                  {pluginvVars.map((variable) => {
                    return (
                      <Paper sx={{ padding: '1rem' }} key={`plugin-var-key-${variable.id}`}>
                        <Stack spacing={2} alignContent="center">
                          <Typography variant="body2">{t('dashboard.plugin.variableInformation')}</Typography>
                          <TextField
                            id="plugin-var-key"
                            label={t('dashboard.plugin.key')}
                            type="text"
                            value={variable.key}
                            onChange={(e) => updateVar(variable.id, e.target.value, variable.value)}
                          />
                          <TextField
                            id="plugin-var-value"
                            label={t('dashboard.plugin.value')}
                            type="text"
                            value={variable.value}
                            onChange={(e) => updateVar(variable.id, variable.key, e.target.value)}
                          />
                        </Stack>
                      </Paper>
                    );
                  })}
                </>
              )}
              <Button variant="outlined" color="inherit" sx={{ height: '80px', borderStyle: 'dashed' }} onClick={addPluginVar}>
                {t('dashboard.plugin.addVariable')}
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
