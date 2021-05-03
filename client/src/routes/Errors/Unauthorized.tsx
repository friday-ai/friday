import React from 'react';
import { Link } from 'react-router-dom';
import unauthorized from '../../assets/undraw_unauthorized.svg';
import { useTheme } from '../../services/theme/themeProvider';
import UndrawUnauthorized from '../../components/Illustrations/UndrawUnauthorized';

const Unauthorized: React.FunctionComponent = () => {
  const { theme } = useTheme();

  return (
    <div className="geo-background centered-container">
      <UndrawUnauthorized
        className="self-center"
        primaryColor={theme.illustrations.primaryColor}
        secondaryColor={theme.illustrations.secondaryColor}
        width="500"
        height="550"
      />
      <h1 className={`mt-5 text-4xl font-bold text-center ${theme.errorPages.primaryText}`}>Missing permissions</h1>
      <span className={`mt-5 text-lg text-gray-400 text-center ${theme.errorPages.secondaryText}`}>
        Do not worry though, there is always a way to go back homepage.
      </span>
      <Link to="/" className={`btn-base ${theme.primaryButton.text} ${theme.primaryButton.background} ${theme.primaryButton.border}`}>
        back to homepage
      </Link>
    </div>
  );
};

export default Unauthorized;
