import { Model, ModelCtor } from 'sequelize-typescript';
import { Catch, NotFoundError } from '../decorators/error';
import { exclude, pick } from '../object';
import { PartialModel } from './model.partial';

export interface BaseModelType<T, C> {
  create(data: C): Promise<Omit<T, 'password' | 'createdAt' | 'updatedAt'>>;
  update(identifier: string, data: Partial<Omit<T, 'id'>>): Promise<Omit<T, 'password'>>;
  destroy(identifier: string): Promise<void>;
}

/**
 * Base model class.
 * Abstract class that implements the base CRUD operations. (create, update, delete, listAll, getById, count)
 * So that other repository inherit from the base model passing their model and get some boilerplate.
 */
export default abstract class BaseModel<M extends Model, T, C> extends PartialModel<M, T> implements BaseModelType<T, C> {
  protected model: ModelCtor<M>;
  protected creationKeys: string[] | undefined;

  protected constructor(model: ModelCtor<M>, creationKeys?: string[]) {
    super(model);
    this.model = model;
    this.creationKeys = creationKeys;
  }

  @Catch()
  async create(data: C): Promise<Omit<T, 'password' | 'createdAt' | 'updatedAt'>> {
    let entity: M;
    if (this.creationKeys !== undefined) {
      const pickedData = pick(data as never, this.creationKeys);
      entity = await this.model.create(pickedData as M['_creationAttributes']);
    } else {
      entity = await this.model.create(data as M['_creationAttributes']);
    }

    return exclude(<T>entity.get({ plain: true }));
  }

  @Catch()
  async update(identifier: string, data: Partial<Omit<T, 'id'>>): Promise<Omit<T, 'password'>> {
    const entity = await this.model.findByPk(identifier);

    if (entity === null) {
      throw new NotFoundError({ name: 'Friday update', message: 'Entity not found', metadata: identifier });
    }

    await entity.update(data);
    return exclude(<T>entity.get({ plain: true }));
  }

  @Catch()
  async destroy(identifier: string): Promise<void> {
    const entity = await this.model.findByPk(identifier);

    if (entity === null) {
      throw new NotFoundError({ name: 'Friday destroy', message: 'Entity not found', metadata: identifier });
    }

    return entity.destroy();
  }
}
