import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleFactura,
  Factura,
} from '../models';
import {DetalleFacturaRepository} from '../repositories';

export class DetalleFacturaFacturaController {
  constructor(
    @repository(DetalleFacturaRepository)
    public detalleFacturaRepository: DetalleFacturaRepository,
  ) { }

  @get('/detalle-facturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to DetalleFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof DetalleFactura.prototype.id,
  ): Promise<Factura> {
    return this.detalleFacturaRepository.factura(id);
  }
}
