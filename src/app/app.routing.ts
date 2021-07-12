import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SidebarComponent} from './@layout/sidebar/sidebar.component';
import {NotFoundComponent} from './@core/not-found/not-found.component';
import {WindEnergyPlantComponent} from './pages/wind-energy-plant/wind-energy-plant.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: DashboardComponent},
      {
        path: 'wea/:id',
        component: WindEnergyPlantComponent},
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];
export const appRouting = RouterModule.forRoot(appRoutes);
export const routingComponents = [
  SidebarComponent, DashboardComponent, WindEnergyPlantComponent,
];
