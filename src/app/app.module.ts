import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SidebarComponent} from './@layout/sidebar/sidebar.component';
import {OcarinaOfTimeComponent} from './@layout/ocarina-of-time/ocarina-of-time.component';
import {appRouting, routingComponents} from './app.routing';
import {NotFoundComponent} from './@core/not-found/not-found.component';
import {WindEnergyPlantComponent} from './pages/wind-energy-plant/wind-energy-plant.component';
import {WepDashboardComponent} from './pages/wind-energy-plant/wep-dashboard.component';
import {WepDirectiveDirective} from './pages/wind-energy-plant/wep-directive.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {ConditionMonitoringModule} from './@core/condition-monitoring/condition-monitoring.module';
import {MatButtonModule} from '@angular/material/button';
import {LineChartComponent} from './@layout/charts/line-chart/line-chart.component';
import { PreferenceComponent } from './@core/utility/preference/preference.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    OcarinaOfTimeComponent,
    routingComponents,
    NotFoundComponent,
    WindEnergyPlantComponent,
    WepDashboardComponent,
    WepDirectiveDirective,
    LineChartComponent,
    PreferenceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,

    LayoutModule,

    MatNativeDateModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,

    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    ConditionMonitoringModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    CdkAccordionModule,
    MatTabsModule,
    MatInputModule,

  ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'de'},
      // {provide: LOCALE_ID, useValue: 'de'}
      // {provide: APP_BASE_HREF, useValue: '/wisa'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
