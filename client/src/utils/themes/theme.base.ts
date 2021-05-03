import { KVArr } from '../interfaces';

const base: KVArr<KVArr<string>> = {
  app: {
    logo: 'black',
    favicon: 'black',
    background: 'bg-blue-100',
  },
  illustrations: {
    primaryColor: '#121C42',
    secondaryColor: 'bg-white',
  },
  errorPages: {
    primaryText: 'text-blue-500',
    secondaryText: 'text-gray-400',
  },
  primaryButton: {
    text: 'text-white',
    background: 'bg-blue-800 hover:bg-opacity-80',
    border: 'border-blue-800',
  },
  header: {
    text: 'text-blue-500',
    background: 'bg-white',
    border: '',
    buttonsBg: 'bg-gray-200',
  },
  sidebar: {
    closeButton: 'text-blue-500',
    text: 'text-gray-400',
    background: 'bg-white',
    border: '',
    elementActive: 'text-blue-500 bg-blue-500 bg-opacity-30 hover:bg-opacity-10',
    elementInactive: 'hover:bg-blue-500 hover:bg-opacity-10',
  },
};

export default base;
