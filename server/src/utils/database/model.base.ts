import { Model, ModelCtor } from 'sequelize-typescript';
import { Catch, NotFoundError } from '../decorators/error';
import { PartialModel } from './model.partial';

export interface BaseModelType<T> {
  create(data: Omit<T, 'id'>): Promise<T>;
  update(identifier: string, data: Omit<T, 'id'>): Promise<T>;
  destroy(identifier: string): Promise<void>;
}

/**
 * Base model class.
 * Abstract class that implements the base CRUD operations. (create, update, delete, listAll, getById, count)
 * So that other repository inherit from the base model passing their model and get some boilerplate.
 */
export default abstract class BaseModel<M extends Model, T> extends PartialModel<M, T> implements BaseModelType<T> {
  protected model: ModelCtor<M>;

  protected constructor(model: ModelCtor<M>) {
    super(model);
    this.model = model;
  }

  @Catch()
  async create(data: Omit<T, 'id'>): Promise<T> {
    const entity = await this.model.create(data as M['_creationAttributes']);
    return <T>entity.get({ plain: true });
  }

  @Catch()
  async update(identifier: string, data: Omit<T, 'id'>): Promise<T> {
    const entity = await this.model.findByPk(identifier);

    if (entity === null) {
      throw new NotFoundError({ name: 'Friday update', message: 'Entity not found', metadata: identifier });
    }

    await entity.update(data);
    return <T>entity.get({ plain: true });
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
