import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { changeTheme, theme } from '../App/app.reducer';
import { ThemeType } from '../../utils/interfaces';
import themes from '../../services/theme/themes';

interface ThemesListProps {
  list: ThemeType[];
  change: (value: string) => void;
  selected: string;
}

function ThemeList({ list, change, selected }: ThemesListProps): JSX.Element {
  return (
    <>
      {list.map((t) => (
        <li key={JSON.stringify(t)}>
          {t.name === 'separator' && t.value === 'separator' ? (
            <div className="divider divider-sm mx-3" />
          ) : (
            <button
              type="button"
              aria-label={t.name}
              onClick={() => change(t.value)}
              data-set-theme={t.value}
              data-act-class="active"
              className={`${selected === t.value && 'active'} mb-2`}
            >
              {t.name}
            </button>
          )}
        </li>
      ))}
    </>
  );
}

function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector(theme);

  const handleChange = (value: string) => {
    document.documentElement.setAttribute('data-theme', value);
    dispatch(changeTheme(value));
  };

  useEffect(() => {
    // Force Init theme
    document.documentElement.setAttribute('data-theme', selectedTheme);
    dispatch(changeTheme(selectedTheme));
  });

  return (
    <div title="Change Theme" className="dropdown dropdown-end">
      <button aria-label="Change Theme" type="button" tabIndex={0} className="btn btn-ghost btn-circle bg-base-300 text-primary">
        <Icon icon="mdi:palette-swatch-variant" className="w-5 h-5" />
      </button>
      <div className="dropdown-base text-base-content border border-base-300">
        <ul className="p-4 menu compact">
          <ThemeList list={themes} change={handleChange} selected={selectedTheme} />
        </ul>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
