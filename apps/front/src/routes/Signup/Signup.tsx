import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ReactLogo } from '../../assets/svg/favicon.svg';

import AnimationContainer from '../../components/App/AnimationContainer';
import LoaderLayout from '../../components/Loader/LoaderLayout';
import Account from './Steps/Account';
import House from './Steps/House';
import Language from './Steps/Language';
import Time from './Steps/Time';
import Units from './Steps/Units';

import useSystem from '../../services/api/useSystem';
import request from '../../services/app/request';

// Welcome
// Step 0: Choose your language
// Step 1: Create an account
// Step 2: Choose your units
// Step 3: Choose how long you want to keep your devices states
// Step 4: Setup your home
// Done!

export interface SignupProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export default function Signup() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { initSystem } = useSystem();

  const [isSignupStarted, setIsSignupStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleLastStep = (_: number) => {
    setActiveStep(activeStep + 1);

    setTimeout(async () => {
      const res = await initSystem.mutateAsync(undefined, {
        onError: () => {
          navigate('/server-down');
        },
      });

      if (res) {
        navigate('/dashboard');
      }
    }, 3000);
  };

  // Prevent user to acces this route if instance is already configured
  useEffect(() => {
    request<number>('get', '/api/v1/user/count', '')
      .then((count) => {
        if (count !== 0) {
          navigate('/login');
        }
      })
      .catch((error) => {
        throw error;
      });
  });

  return (
    <Container maxWidth="sm">
      <AnimationContainer id={`${isSignupStarted && activeStep > 4}`} style={{ height: '100%' }}>
        {!isSignupStarted && (
          <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
            <Stack spacing={4} alignItems="center">
              <ReactLogo width="200px" display="block" fill={theme.palette.primary.main} />

              <Typography variant="h4" align="center" gutterBottom>
                {t('signup.general.welcome')}
              </Typography>

              <Button variant="contained" size="small" onClick={() => setIsSignupStarted(true)} sx={{ marginX: 'auto', paddingX: 10 }}>
                {t('signup.general.start')}
              </Button>
            </Stack>
          </Box>
        )}

        {isSignupStarted && activeStep < 5 && (
          <>
            <Box pb={4} pt={4} display="flex" justifyContent="center">
              <ReactLogo width="50px" display="block" fill={theme.palette.primary.main} />
            </Box>

            <AnimationContainer id={activeStep}>
              <Paper sx={{ padding: '2rem 3rem' }}>
                <Stack spacing={4}>
                  {activeStep === 0 && <Language activeStep={activeStep} setActiveStep={setActiveStep} />}
                  {activeStep === 1 && <Account activeStep={activeStep} setActiveStep={setActiveStep} />}
                  {activeStep === 2 && <Units activeStep={activeStep} setActiveStep={setActiveStep} />}
                  {activeStep === 3 && <Time activeStep={activeStep} setActiveStep={setActiveStep} />}
                  {activeStep === 4 && <House activeStep={activeStep} setActiveStep={handleLastStep} />}
                </Stack>
              </Paper>
            </AnimationContainer>
          </>
        )}

        {isSignupStarted && activeStep > 4 && (
          <Box display="flex" textAlign="center" height="100%" alignItems="center">
            <Stack spacing={1}>
              <LoaderLayout />

              <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
                {t('signup.general.fridayInit')}
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
                {t('signup.general.fridayInitDesc')}
              </Typography>
            </Stack>
          </Box>
        )}
      </AnimationContainer>
    </Container>
  );
}
