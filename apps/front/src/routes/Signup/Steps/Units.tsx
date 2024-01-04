import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VariableOwner } from '@friday-ai/shared';
import useVariable from '../../../services/api/useVariable';
import useSharedApp from '../../../services/app/useApp';

import { SignupProps } from '../Signup';

export default function Units({ activeStep, setActiveStep }: SignupProps) {
  const theme = useTheme();
  const app = useSharedApp();
  const { t } = useTranslation();
  const { createVariable } = useVariable();

  const [units, setUnits] = useState('metric');

  const handleChange = (_: unknown, newUnits: string) => {
    setUnits(newUnits);
  };

  const handleNext = () => {
    createVariable.mutate({ key: 'system_units', value: units, owner: app.user?.id || '', ownerType: VariableOwner.USER });
    setActiveStep(activeStep + 1);
  };

  // Set default units
  useEffect(() => {
    handleChange(null, 'metric');
  }, []);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
          {t('signup.units.title')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
          {t('signup.units.description')}
        </Typography>
      </Box>

      <ToggleButtonGroup orientation="vertical" value={units} exclusive onChange={handleChange}>
        <ToggleButton value="metric" aria-label="list">
          {t('signup.units.metric')}
        </ToggleButton>
        <ToggleButton value="us" aria-label="module">
          {t('signup.units.us')}
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
