import React from 'react';
import { Icon } from '@iconify/react';

interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onSearch }) => {
  return (
    <div className="form-control ml-2 mr-2 sm:mr-5 w-40 sm:w-auto">
      <label id="search" htmlFor="search" className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center px-1 pointer-events-none">
          <Icon icon="ic:sharp-search" className="w-6 h-6 mx-2" />
        </div>
        <input
          id="searchInput"
          aria-labelledby="search"
          type="text"
          className="input input-bordered pl-10 h-10 w-40 sm:w-auto"
          onChange={(event) => {
            onSearch(event.target.value);
          }}
          value={value}
        />
        <button type="button" className={`${value.length === 0 && 'hidden'} absolute inset-y-0 -right-0`} onClick={() => onSearch('')}>
          <Icon icon="ic:outline-close" className="w-5 h-5 mx-2" />
        </button>
      </label>
    </div>
  );
};

export default Search;
