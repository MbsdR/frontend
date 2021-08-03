import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SidebarComponent} from './@layout/sidebar/sidebar.component';
import {NotFoundComponent} from './@core/not-found/not-found.component';
import {WindEnergyPlantComponent} from './pages/wind-energy-plant/wind-energy-plant.component';
import {LoginComponent} from './@core/login/login.component';
import {LoginService} from './@core/login/service/login.service';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,
    canActivateChild: [LoginService],
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
export const appRouting = RouterModule.forRoot(appRoutes);
export const routingComponents = [
  SidebarComponent, DashboardComponent, WindEnergyPlantComponent,
];
