import Variable from '../../models/variable';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(variable: Variable): Promise<void> {
    try {
        const variableToDelete = await Variable.findByPk(variable.id);

        if (variableToDelete === null) {
            throw logger.error('Variable not found');
        }

        await variableToDelete.destroy();
    } catch (e) {
        throw logger.error(e);
    }
}
