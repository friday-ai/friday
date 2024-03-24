import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SignupProps } from '../Signup';

export default function Language({ activeStep, setActiveStep }: SignupProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState('en');

  const handleLanguage = useCallback(
    (_: unknown, value: string) => {
      setLanguage(value);
      localStorage.setItem('i18nextLng', value || 'en');
      i18n.changeLanguage(value || 'en');
    },
    [i18n],
  );

  // Set default language
  useEffect(() => {
    handleLanguage(null, 'en');
  }, [handleLanguage]);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
          {t('signup.language.title')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
          {t('signup.language.description')}
        </Typography>
      </Box>

      <ToggleButtonGroup orientation="vertical" value={language} exclusive onChange={handleLanguage}>
        <ToggleButton value="en" aria-label="list">
          English
        </ToggleButton>
        <ToggleButton value="fr" aria-label="module">
          Français
        </ToggleButton>
      </ToggleButtonGroup>

      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button variant="contained" size="small" onClick={() => setActiveStep(activeStep - 1)} disabled={activeStep === 0}>
            {t('signup.general.back')}
          </Button>
        }
        nextButton={
          <Button variant="contained" size="small" onClick={() => setActiveStep(activeStep + 1)}>
            {t('signup.general.next')}
          </Button>
        }
      />
    </>
  );
}
