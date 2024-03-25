import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VariableOwner } from '@friday-ai/shared';
import useVariable from '../../../services/api/useVariable';
import useSharedApp from '../../../services/app/useApp';

import { SignupProps } from '../Signup';

export default function Time({ activeStep, setActiveStep }: SignupProps) {
  const theme = useTheme();
  const app = useSharedApp();
  const { t } = useTranslation();
  const { createVariable } = useVariable();

  const [time, setTime] = useState('30');

  const handleChange = (_: unknown, newTime: string) => {
    setTime(newTime);
  };

  const handleNext = () => {
    createVariable.mutate({ key: 'history_state_in_days', value: time, owner: app.user?.id || '', ownerType: VariableOwner.USER });
    setActiveStep(activeStep + 1);
  };

  // Set default time
  useEffect(() => {
    handleChange(null, '30');
  }, []);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
          {t('signup.time.title')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
          {t('signup.time.description')}
        </Typography>
      </Box>

      <ToggleButtonGroup orientation="vertical" value={time} exclusive onChange={handleChange}>
        <ToggleButton value="30" aria-label="list">
          {t('signup.time.1m')}
        </ToggleButton>
        <ToggleButton value="90" aria-label="module">
          {t('signup.time.3m')}
        </ToggleButton>
        <ToggleButton value="180" aria-label="module">
          {t('signup.time.6m')}
        </ToggleButton>
        <ToggleButton value="365" aria-label="module">
          {t('signup.time.1y')}
        </ToggleButton>
        <ToggleButton value="0" aria-label="module">
          {t('signup.time.unlimited')}
        </ToggleButton>
      </ToggleButtonGroup>

      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button variant="contained" size="small" onClick={() => setActiveStep(activeStep - 1)}>
            {t('signup.general.back')}
          </Button>
        }
        nextButton={
          <Button variant="contained" size="small" onClick={() => handleNext()}>
            {t('signup.general.next')}
          </Button>
        }
      />
    </>
  );
}
