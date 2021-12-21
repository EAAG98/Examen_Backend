import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {DetalleFactura} from './detalle-factura.model';

@model({settings: {strict: false}})
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  unidad: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;
  @hasMany(() => DetalleFactura)
  detalleFacturas: DetalleFactura[];

  @belongsTo(() => DetalleFactura)
  detalleFacturaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
