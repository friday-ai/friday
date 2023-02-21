import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import Docker from '../src/index';

chai.use(chaiLike);
chai.use(chaiThings);
chai.use(chaiAsPromised);

before(async function before() {
  this.timeout(16000);

  // Create Friday core object
  global.DOCKER = new Docker();
});
