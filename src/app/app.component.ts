import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IniciarSesionComponent, SolicitudComponent, MenuComponent], // Asegúrate de que RouterOutlet esté configurado en tus rutas
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Asegúrate de que sea styleUrls, no styleUrl
})
export class AppComponent {
  title = 'Prestamos-INSOII';  // Título de tu aplicación
}