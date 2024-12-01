import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { ValidarUsuarioComponent } from './pages/validar-usuario/validar-usuario.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component'; // Importación del componente Editar Perfil
import { AgregarUsuariosComponent } from './pages/agregar-usuarios/agregar-usuarios.component';
import { VerUsuariosComponent } from './pages/ver-usuarios/ver-usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al componente de login
  { path: 'login', component: LoginComponent },
  {
    path: 'cronograma',
    component: CronogramaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'validar-usuario',
    component: ValidarUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitud',
    component: SolicitudComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-perfil', // Nueva ruta para Editar Perfil
    component: EditarPerfilComponent,
    canActivate: [AuthGuard], // Protegida por el guard
  },
  {
    path: 'agregar-usuarios',
    component: AgregarUsuariosComponent, // Nueva ruta para Agregar Usuarios
    canActivate: [AuthGuard], // Asegúrate de que solo los usuarios autenticados puedan acceder
  },
  {
    path: 'ver-usuarios', // Nueva ruta
    component: VerUsuariosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
