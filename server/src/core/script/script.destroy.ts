import Script from '../../models/script';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(id: string): Promise<void> {
  try {
    const scriptToDelete = await Script.findByPk(id);

    if (scriptToDelete === null) {
      throw logger.error('Script not found');
    }

    await scriptToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
