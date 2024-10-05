import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
// import { ValidarUsuarioComponent } from './validar-usuario/validar-usuario.component';
// import { CronogramaComponent } from "./cronograma/cronograma.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, /*ValidarUsuarioComponent, CronogramaComponent*/],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Prestamos-INSOII';
}
