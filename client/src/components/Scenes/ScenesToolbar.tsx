import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Dropdown from '../Generic/Dropdown';
import Search from '../Generic/Search';
import CheckboxGroup from '../Generic/Checkbox/CheckboxGroup';

interface Props {
  onSearch: (value: string) => void;
  onFilter: (value: string[]) => void;
  onSort: (value: string) => void;
  onCreate: VoidFunction;
}

const checkboxFilters = [
  { label: 'Active', value: 'active', checked: true },
  { label: 'Inactive', value: 'inactive', checked: true },
  { label: 'Errored', value: 'errored', checked: true },
];

const ScenesToolbar: React.FC<Props> = ({ onSearch, onFilter, onSort, onCreate }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('a-z');

  useEffect(() => {
    onSearch(search);
    onSort(sort);
  }, [onSearch, onSort, search, sort]);

  return (
    <div className="flex m-5">
      <Search value={search} onSearch={setSearch} />
      <div />
      <button
        type="button"
        className="btn-neutral hidden xl:inline-flex"
        onClick={() => {
          setSort(sort === 'a-z' ? 'z-a' : 'a-z');
        }}
      >
        <span className="truncate">Alphabetical</span>
        <Icon icon={`${sort === 'a-z' ? 'ic:baseline-arrow-downward' : 'ic:baseline-arrow-upward'}`} className="w-5 h-5 ml-2" />
      </button>
      <Dropdown className="xl:hidden" title="Filters" btnText="Filters" btnStyle="btn-neutral" icon="ic:outline-filter-alt">
        <div className="checkbox-group-vertical pt-4 px-4">
          <span className="font-extrabold">Status</span>
          <div className="flex flex-col items-start mt-2">
            <CheckboxGroup hasCheckAll canUncheckAll={false} checkboxes={checkboxFilters} onChange={onFilter} />
          </div>
        </div>
        <div className="pb-4 pt-2 px-4">
          <span className="font-extrabold">Sort by</span>
          <div className="flex flex-col items-start mt-2">
            <button
              type="button"
              className="btn-neutral btn-block mb-3"
              onClick={() => {
                setSort(sort === 'a-z' ? 'z-a' : 'a-z');
              }}
            >
              <span className="truncate">Alphabetical</span>
              <Icon icon={`${sort === 'a-z' ? 'ic:baseline-arrow-downward' : 'ic:baseline-arrow-upward'}`} className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </Dropdown>
      <div className="ml-auto flex">
        <div className="checkbox-group hidden xl:inline-flex items-center px-4 mr-5 rounded-btn bg-base-100 border border-base-300 gap-1">
          <CheckboxGroup hasCheckAll canUncheckAll={false} checkboxes={checkboxFilters} onChange={onFilter} />
        </div>
        <button type="button" className="btn-neutral mr-2" onClick={onCreate}>
          <Icon icon="ic:outline-add-circle-outline" className="w-5 h-5 md:mr-2" />
          <span className="hidden md:block">New Scene</span>
        </button>
      </div>
    </div>
  );
};

export default ScenesToolbar;
