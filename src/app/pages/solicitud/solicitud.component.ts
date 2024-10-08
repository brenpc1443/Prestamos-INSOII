import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar [(ngModel)]
import { PrestamoType, TipoPrestamo } from '../../types/prestamo.type';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import { LoginService } from '../../services/login/login.service';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'app-solicitud',
  standalone: true, // Definir como componente standalone
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  imports: [FormsModule] // Importar FormsModule directamente
})
export class SolicitudComponent {
  monto: number = 0; // Inicializar el monto
  opcion: number = 0; // Almacena la opción seleccionada: 1 mes o 6 meses
  interes: number = 0; // Interés basado en la opción seleccionada
  cuotas: number = 0; // Número de cuotas basado en la opción seleccionada
  montoTotal: number = 0; // Resultado del monto total
  dniCliente: string = ''; // DNI del cliente (puedes obtenerlo del formulario o de otro lado)


  // Agregar propiedad para el servicio
  private prestamoService: PrestamoService;
  private loginService: LoginService;
  private clientService: ClienteService;

  // Constructor para inyectar el servicio
  constructor(prestamoService: PrestamoService, loginService: LoginService, clientService: ClienteService, private router: Router, private route: ActivatedRoute) {
    this.prestamoService = prestamoService; // Asignar el servicio a la propiedad
    this.loginService = loginService;
    this.clientService = clientService;
  }

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.monto = +params['monto']; // convertir a número
      this.opcion = +params['tipoPrestamo'];
    });
  }

  // Método para seleccionar opción (1 mes o 6 meses)
  seleccionarOpcion(opcion: number): void {
    this.opcion = opcion;
    // Asignar interés y cuotas en función de la opción
    this.interes = opcion === 1 ? 10 : 20;
    this.cuotas = opcion === 1 ? 1 : 6;
  }

  // Método para calcular el préstamo basado en el monto y el interés
  calcularPrestamo(): void {
    if (this.monto > 0) { // Validar que el monto sea mayor a 0
      this.montoTotal = this.monto + (this.monto * this.interes / 100);
    } else {
      alert('Ingrese un monto válido.'); // Alerta si el monto es inválido
    }
  }

  // Método para aprobar el préstamo, mostrar el monto total y registrar la solicitud
  aprobarPrestamo(): void {
    if (this.montoTotal > 0) { // Validar que se haya calculado un monto total y que haya un DNI
      alert('Préstamo aprobado por un total de S/' + this.montoTotal);
      const prestamoDTO: PrestamoType = {
        nombreCliente: this.clientService.getCurrentClient().nombreCliente,
        dni: this.dniCliente,
        fechaSolicitud: new Date().toISOString(),
        tipoPrestamo: this.opcion === 1 ? TipoPrestamo.UN_MES : TipoPrestamo.SEIS_MESES,
        idUsuario: 1 /*this.loginService.getCurrentUser().idUsuario*/,
        idCliente: this.clientService.getCurrentClient().idCliente,
        monto: this.monto,
        interes: this.interes,
        cuotas: this.cuotas,
        montoTotal: this.montoTotal
      };

      // Registrar la solicitud de préstamo a través del servicio
      this.prestamoService.registrarSolicitudPrestamo(prestamoDTO, this.dniCliente)
        .subscribe({
          next: (response) => {
            alert('Solicitud registrada exitosamente: ' + response);
          },
          error: (error) => {
            alert('Error al registrar la solicitud de préstamo: ' + error);
          }
        });

    } else {
      alert('Realice el cálculo antes de aprobar el préstamo.'); // Alerta si no se ha calculado aún
    }
  }

  navigateTo(): void {
    this.router.navigate(['/cronograma'], { queryParams: { monto: this.monto, tipoPrestamo: this.opcion } });
  }
  
}
