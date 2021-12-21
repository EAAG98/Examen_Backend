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
  Factura,
  DetalleFactura,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaDetalleFacturaController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Array of Factura has many DetalleFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleFactura>,
  ): Promise<DetalleFactura[]> {
    return this.facturaRepository.detalleFacturas(id).find(filter);
  }

  @post('/facturas/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFactura, {
            title: 'NewDetalleFacturaInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) detalleFactura: Omit<DetalleFactura, 'id'>,
  ): Promise<DetalleFactura> {
    return this.facturaRepository.detalleFacturas(id).create(detalleFactura);
  }

  @patch('/facturas/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Factura.DetalleFactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFactura, {partial: true}),
        },
      },
    })
    detalleFactura: Partial<DetalleFactura>,
    @param.query.object('where', getWhereSchemaFor(DetalleFactura)) where?: Where<DetalleFactura>,
  ): Promise<Count> {
    return this.facturaRepository.detalleFacturas(id).patch(detalleFactura, where);
  }

  @del('/facturas/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Factura.DetalleFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFactura)) where?: Where<DetalleFactura>,
  ): Promise<Count> {
    return this.facturaRepository.detalleFacturas(id).delete(where);
  }
}
