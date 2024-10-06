export enum TipoPrestamo {
  UN_MES = 'UN_MES',
  SEIS_MESES = 'SEIS_MESES',
}

export interface PrestamoType {
  idPrestamo?: number;
  idUsuario: number;
  idCliente: number;
  monto: number;
  tipoPrestamo: TipoPrestamo;
  interes: number;
  fechaSolicitud: string;
  nombreCliente: string;
  dni: string;
}
