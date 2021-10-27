const base = {
  pwa: {
    themeColor: '#f3f5fc',
  },
  app: {
    logo: 'black',
    favicon: 'black',
    background: 'bg-blue-100',
  },
  illustrations: {
    primaryColor: '#121C42',
    secondaryColor: '#a3b0e6',
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
  sceneCard: {
    text: 'text-gray-400',
    textActive: 'text-blue-400',
    titleColor: 'text-gray-800',
    background: 'bg-white',
    border: 'border-gray-300 border',
    errorBorder: 'border-red-400 border-2',
    errorText: 'text-red-600',
    manageButton: 'bg-blue-500 hover:bg-gray-600',
    manageButtonContentsColor: 'text-white',
    startButton: 'bg-gray-300 hover:bg-gray-200 text-blue-500',
    switchTextColor: 'text-gray-500',
    switchStyle: 'bg-gray-300 peer-checked:bg-blue-400 after:bg-white',
  },
  scenesToolbar: {
    button: 'border border-gray-300 bg-white hover:bg-gray-200 text-blue-500',
    searchField: 'border border-gray-300',
    searchFieldIcon: '',
    searchFieldButton: 'text-gray-500 hover:text-gray-800',
    dropdownStyle: 'bg-white',
    dropdownText: 'text-gray-800',
    checkboxContainer: 'border border-gray-300 bg-white',
    checkboxTextStyle: 'text-gray-900 font-medium',
    checkboxStyle: 'border border-gray-300',
  },
  tooltip: {
    style: 'bg-white border border-gray-300 text-gray-600',
    arrow: 'bg-gray-300',
  },
  notification: {
    containerStyle: 'bg-white',
    titleColor: '',
    textColor: 'text-gray-500',
  },
  modalConfirm: {
    containerStyle: 'bg-white',
    titleColor: 'text-gray-900',
    textColor: 'text-gray-500',
    iconColor: 'text-red-600',
    iconHalo: 'bg-red-100',
    cancelButton: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    confirmButton: 'border border-transparent bg-red-600 text-base text-white hover:bg-red-700',
  },
};

export default base;
