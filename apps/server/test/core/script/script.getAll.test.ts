import { expect } from 'chai';
import Script from '../../../src/core/script/script';

let script: Script;

describe('Script.listAll', () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it('should return all script', async () => {
    const scripts = await script.listAll();

    expect(scripts).to.be.an('array');
    scripts.forEach((a) => {
      expect(a).to.contains.keys(['id', 'name', 'code']);
    });
  });
});
