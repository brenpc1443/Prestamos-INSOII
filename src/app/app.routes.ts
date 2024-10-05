import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { ValidarUsuarioComponent } from './pages/validar-usuario/validar-usuario.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'cronograma',
    component: CronogramaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'validarusuario',
    component: ValidarUsuarioComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
