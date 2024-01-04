import { WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import { Catch, NotFoundError } from '../decorators/error';
import { GetOptions } from '../interfaces';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
  order: [],
};

export interface PartialModelType<T> {
  getById(identifier: string, scope?: string): Promise<T>;
  listAll(options?: GetOptions): Promise<T[]>;
  count(): Promise<number>;
}

/**
 * Partial model class.
 * Abstract class that implements the common model operations. (listAll, getById, count)
 * So that other repository inherit from the partial model passing their model and get some boilerplate.
 * Useful for special repositories that don't need to implement all the CRUD operations.
 */
export abstract class PartialModel<M extends Model, T> implements PartialModelType<T> {
  protected model: ModelCtor<M>;

  protected constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  @Catch()
  async getById(identifier: string, scope?: string): Promise<T> {
    let entity;

    if (scope !== '' && scope !== null && scope !== undefined) {
      entity = await this.model.scope(scope).findByPk(identifier);
    } else {
      entity = await this.model.findByPk(identifier);
    }

    if (entity === null) {
      throw new NotFoundError({ name: 'Friday get entity by id', message: 'Entity not found', metadata: identifier });
    }

    return <T>entity.get({ plain: true });
  }

  @Catch()
  async listAll(options?: GetOptions, where?: WhereOptions<T>): Promise<T[]> {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let entities;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      entities = await this.model.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
        order: mergedOptions.order,
        where,
      });
    } else {
      entities = await this.model.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
        order: mergedOptions.order,
        where,
      });
    }

    return <T[]>entities.map((entity) => {
      return <T>entity.get({ plain: true });
    });
  }

  @Catch()
  async count(): Promise<number> {
    const rows = await this.model.findAndCountAll({});
    return rows.count;
  }
}
