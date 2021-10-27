import React from 'react';
import { Link } from 'react-router-dom';
import UndrawNotFound from '../../components/Illustrations/UndrawNotFound';
import { useTheme } from '../../services/theme/ThemeProvider';

const NotFound: React.FunctionComponent = () => {
  const { theme } = useTheme();

  return (
    <div className="geo-background centered-container">
      <UndrawNotFound
        className="self-center"
        primaryColor={theme.illustrations.primaryColor}
        secondaryColor={theme.illustrations.secondaryColor}
        width="500"
        height="300"
      />
      <h1 className={`mt-5 text-4xl font-bold text-center ${theme.errorPages.primaryText}`}>Sorry we couldn&apos;t find this page.</h1>
      <span className={`mt-5 text-lg text-gray-400 text-center ${theme.errorPages.secondaryText}`}>
        But dont worry, you can find plenty of other things on homepage.
      </span>
      <Link to="/" className={`btn-base ${theme.primaryButton.text} ${theme.primaryButton.background} ${theme.primaryButton.border}`}>
        back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
