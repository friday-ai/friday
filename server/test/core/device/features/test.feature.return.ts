import { assert, expect } from 'chai';
import { AvailableState } from '../../../../src/utils/constants';
import { Color } from '../../../../src/utils/interfaces';
import UserType from '../../../../src/core/user/user.interface';

export default function testFeatureReturn(value: AvailableState|number|Color|string|UserType, state: any, type: string = 'set') {
  expect(state).to.be.an('object');

  expect(state).to.have.property('id');
  expect(state).to.have.property('owner');
  expect(state).to.have.property('ownerType');
  expect(state).to.have.property('value');

  if (type === 'set') {
    expect(state).to.have.property('last');
    expect(state).to.have.property('updatedAt');
    expect(state).to.have.property('createdAt');
  }

  expect(state.ownerType).equal('device');

  if (typeof value === 'object') {
    assert.deepEqual(state.value, value);
  } else {
    expect(state.value).equal(value);
  }
}
