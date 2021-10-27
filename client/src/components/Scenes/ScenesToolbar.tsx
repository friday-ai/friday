import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Checkbox from '../Generic/Checkbox';
import { contains } from '../../utils/array';
import Dropdown from '../Generic/Dropdown';
import { useTheme } from '../../services/theme/ThemeProvider';

interface Props {
  onSearch: (value: string) => void;
  onFilter: (value: string[]) => void;
  onSort: (value: string) => void;
  onCreate: () => void;
}

const ScenesToolbar: React.FunctionComponent<Props> = ({ onSearch, onFilter, onSort, onCreate }) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(['all', 'active', 'inactive', 'errored']);
  const [sort, setSort] = useState('a-z');

  useEffect(() => {
    onSearch(search);
    onSort(sort);
  }, [onSearch, onSort, search, sort]);

  const filter = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const id = event.target.id.substring(0, event.target.id.length - 2);
    let list = [...filters];

    // All filter cannot be unchecked by user
    if (id === 'all' && !checked) return;

    if (checked || !filters.includes(id)) {
      list.push(id);
      // If All checkbox was checked by use, push all filters in list
      if (id === 'all') list.push('active', 'inactive', 'errored');
      // If user check all filters without check 'all', push it in array
      if (contains(['active', 'inactive', 'errored'], list) && !list.includes('all')) list.push('all');
    } else if (!checked && filters.includes(id)) {
      if (id !== 'all') list = list.filter((f) => f !== 'all');
      list = list.filter((f) => f !== id);
    }

    // List cannot be empty
    if (list.length === 0) list.push('all', 'active', 'inactive', 'errored');

    // Trick to remove duplicates
    list = Array.from(new Set(list));
    setFilters(list);
    onFilter(list);
  };

  return (
    <div className="flex m-5">
      <div className="relative text-gray-700 mr-5">
        <div className="absolute inset-y-0 left-0 flex items-center px-1 pointer-events-none">
          <Icon icon="ic:sharp-search" className={`w-6 h-6 mx-2 ${theme.scenesToolbar.searchFieldIcon}`} />
        </div>
        <input
          type="text"
          className={`w-full h-10 pl-10 pr-8 text-base rounded-xl focus:outline-none ${theme.scenesToolbar.searchField}`}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <button type="button" className={`${search.length !== 0 ? '' : 'hidden'} absolute inset-y-0 -right-0`} onClick={() => setSearch('')}>
          <Icon icon="ic:outline-close" className={`w-5 h-5 mx-2 ${theme.scenesToolbar.searchFieldButton}`} />
        </button>
      </div>
      <div />
      <button
        type="button"
        className={`icon-btn hidden xl:inline-flex ${theme.scenesToolbar.button}`}
        onClick={() => {
          setSort(sort === 'a-z' ? 'z-a' : 'a-z');
        }}
      >
        <span className="truncate">Alphabetical</span>
        <Icon icon={`${sort === 'a-z' ? 'ic:baseline-arrow-downward' : 'ic:baseline-arrow-upward'}`} className="w-5 h-5 ml-2" />
      </button>
      <Dropdown
        buttonClassname={`icon-btn mr-5 ${theme.scenesToolbar.button}`}
        buttonText="Filters"
        className="xl:hidden"
        buttonIcon="ic:outline-filter-alt"
        containerStyle={theme.scenesToolbar.dropdownStyle}
      >
        <div className="p-3">
          <span className={`font-extrabold ${theme.scenesToolbar.dropdownText}`}>Status</span>
          <div className="flex flex-col items-start mt-3">
            <Checkbox
              key={Math.random()}
              id="all_1"
              label="All"
              checked={filters.includes('all')}
              cb={filter}
              checkboxStyle={theme.scenesToolbar.checkboxStyle}
              textStyle={theme.scenesToolbar.checkboxTextStyle}
            />
            <Checkbox
              key={Math.random()}
              id="active_1"
              label="Active"
              checked={filters.includes('active') || filters.includes('all')}
              cb={filter}
              checkboxStyle={theme.scenesToolbar.checkboxStyle}
              textStyle={theme.scenesToolbar.checkboxTextStyle}
            />
            <Checkbox
              key={Math.random()}
              id="inactive_1"
              label="Inactive"
              checked={filters.includes('inactive') || filters.includes('all')}
              cb={filter}
              checkboxStyle={theme.scenesToolbar.checkboxStyle}
              textStyle={theme.scenesToolbar.checkboxTextStyle}
            />
            <Checkbox
              key={Math.random()}
              id="errored_1"
              label="Errored"
              checked={filters.includes('errored') || filters.includes('all')}
              cb={filter}
              checkboxStyle={theme.scenesToolbar.checkboxStyle}
              textStyle={theme.scenesToolbar.checkboxTextStyle}
            />
          </div>
        </div>
        <div className="p-3">
          <span className={`font-extrabold ${theme.scenesToolbar.dropdownText}`}>Sort by</span>
          <div className="flex flex-col items-start mt-3">
            <button
              type="button"
              className={`icon-btn w-full mb-3 ${theme.scenesToolbar.button}`}
              onClick={() => {
                setSort(sort === 'a-z' ? 'z-a' : 'a-z');
              }}
            >
              <span className="truncate">Alphabetical</span>
              <Icon icon={`${sort === 'a-z' ? 'ic:baseline-arrow-downward' : 'ic:baseline-arrow-upward'}`} className="w-5 h-5 ml-auto" />
            </button>
          </div>
        </div>
      </Dropdown>
      <div className="ml-auto flex">
        <div className={`hidden xl:inline-flex items-center px-4 mr-5 rounded-xl gap-1 ${theme.scenesToolbar.checkboxContainer}`}>
          <Checkbox
            key={Math.random()}
            id="all_0"
            label="All"
            checked={filters.includes('all')}
            cb={filter}
            checkboxStyle={theme.scenesToolbar.checkboxStyle}
            textStyle={theme.scenesToolbar.checkboxTextStyle}
          />
          <Checkbox
            key={Math.random()}
            id="active_0"
            label="Active"
            checked={filters.includes('active') || filters.includes('all')}
            cb={filter}
            checkboxStyle={theme.scenesToolbar.checkboxStyle}
            textStyle={theme.scenesToolbar.checkboxTextStyle}
          />
          <Checkbox
            key={Math.random()}
            id="inactive_0"
            label="Inactive"
            checked={filters.includes('inactive') || filters.includes('all')}
            cb={filter}
            checkboxStyle={theme.scenesToolbar.checkboxStyle}
            textStyle={theme.scenesToolbar.checkboxTextStyle}
          />
          <Checkbox
            key={Math.random()}
            id="errored_0"
            label="Errored"
            checked={filters.includes('errored') || filters.includes('all')}
            cb={filter}
            checkboxStyle={theme.scenesToolbar.checkboxStyle}
            textStyle={theme.scenesToolbar.checkboxTextStyle}
          />
        </div>
        <button type="button" className={`icon-btn mr-5 ${theme.scenesToolbar.button}`} onClick={onCreate}>
          <Icon icon="ic:outline-add-circle-outline" className="w-5 h-5 mr-2" />
          <span className="truncate">New Scene</span>
        </button>
      </div>
    </div>
  );
};

export default ScenesToolbar;
