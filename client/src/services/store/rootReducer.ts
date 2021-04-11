import { KVArr } from '../../utils/interfaces';

const regexp = new RegExp(/[ \w-]+?(?=.reducer)/gm);

const rootReducer = (): KVArr<string> => {
  const files = import.meta.glob('/**/*.reducer.ts');
  const reducers = {};

  Object.values(files).forEach((file) => {
    const name = regexp.exec(`${file}`);
    if (name !== null) {
      file().then((mod) => {
        // const { RootState } = mod;
        // reducers = <typeof RootState>{ ...reducers, ...{ [name[0]]: mod.default } };
        Object.assign(reducers, { [name[0]]: mod.default });
      });
    }
  });

  return reducers;
};

export default rootReducer;
