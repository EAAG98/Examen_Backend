import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DetalleFactura,
  Producto,
} from '../models';
import {DetalleFacturaRepository} from '../repositories';

export class DetalleFacturaProductoController {
  constructor(
    @repository(DetalleFacturaRepository) protected detalleFacturaRepository: DetalleFacturaRepository,
  ) { }

  @get('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of DetalleFactura has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.detalleFacturaRepository.productos(id).find(filter);
  }

  @post('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleFactura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleFactura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInDetalleFactura',
            exclude: ['id'],
            optional: ['detalleFacturaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.detalleFacturaRepository.productos(id).create(producto);
  }

  @patch('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleFactura.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.detalleFacturaRepository.productos(id).patch(producto, where);
  }

  @del('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleFactura.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.detalleFacturaRepository.productos(id).delete(where);
  }
}
