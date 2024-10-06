export enum EstadoPago {
  EN_PROCESO = 'EN_PROCESO',
  CUMPLIDO = 'CUMPLIDO',
}

export interface CronogramaPagoType {
  idCronograma?: number;
  idPrestamo: number;
  fechaCronograma: string;
  montoPorPagar: number;
  estadoPago: EstadoPago;
}
