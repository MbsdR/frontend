import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SidebarComponent} from './pages/sidebar.component';
import {NotFoundComponent} from './@core/not-found/not-found.component';
import {WindEnergyPlantComponent} from './pages/wind-energy-plant/wind-energy-plant.component';
import {LoginComponent} from './@core/login/login.component';
import {AuthGuard} from './@core/login/AuthGuard';

export const wisaRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'wea/:id',
        component: WindEnergyPlantComponent
      }
    ]
  },

  {
    path: '**',
    component: NotFoundComponent,
  }
];
export const wisaRouting = RouterModule.forRoot(wisaRoutes);
export const routingComponents = [
  SidebarComponent, DashboardComponent, WindEnergyPlantComponent,
];
