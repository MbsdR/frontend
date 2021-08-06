import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './sidebar.component';

export const pagesRoutes = [
  {
    path: 'windpark', component: SidebarComponent,
    children: [
      {path: '', component: DashboardComponent, data: {}},
    ]
  }];

export const pagesRoutingComponents = [
  DashboardComponent
];
