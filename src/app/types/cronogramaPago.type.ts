export enum EstadoPago {
  EN_PROCESO = 'EN_PROCESO',
  CUMPLIDO = 'CUMPLIDO',
}

export interface CronogramaPagoDTO {
  idCronograma: number;
  fechaCronograma: string;
  montoPorPagar: number;
  estadoPago: EstadoPago;
}
