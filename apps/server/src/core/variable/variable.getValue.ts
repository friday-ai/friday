import { VariableAttributes } from '@friday/shared';
import Variable from '../../models/variable';
import { BadParametersError, NotFoundError } from '../../utils/decorators/error';

/**
 * Get a variable value by key.
 * @param {String} key - Key of variable.
 * @returns {Promise<VariableAttributes>} Resolve with variable.
 * @example
 * ````
 * friday.variable.getValue('key');
 * ````
 */
export default async function getValue(key: string): Promise<VariableAttributes> {
  if (key === '') {
    throw new BadParametersError({ name: 'Get value of an Variable', message: "Variable's key can not be empty", metadata: key });
  }

  const variable = await Variable.findOne({
    where: {
      key,
    },
  });

  if (variable === null) {
    throw new NotFoundError({ name: 'Get value of an Variable', message: 'Variable not found', metadata: key });
  }

  return <VariableAttributes>variable.get({ plain: true });
}
