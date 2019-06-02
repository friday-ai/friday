import Variable from '../../models/variable';
import Log from '../../utils/log';
const logger = new Log();

export default async function get(): Promise<Variable[]> {
    try {
        const variables = await Variable.findAll();
        return variables;
    } catch (e) {
        throw logger.error(e);
    }
}
