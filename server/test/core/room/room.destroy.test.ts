import Room from '../../../src/core/room';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('room.destoy', () => {
  const room = new Room();

  it('should destroy an room', async () => {
    expect.assertions(0);
    await room.destroy('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');
  });

  it('should not found an room to destroy', async () => {
    expect.assertions(1);
    await room.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
