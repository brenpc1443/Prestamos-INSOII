import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { ValidarUsuarioComponent } from './pages/validar-usuario/validar-usuario.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
