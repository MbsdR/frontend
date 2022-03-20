import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {WisaComponent} from './wisa.component';
import {SidebarComponent} from './pages/sidebar.component';
import {OcarinaOfTimeComponent} from './@core/ocarina-of-time/component/ocarina-of-time/ocarina-of-time.component';
import {wisaRouting, routingComponents} from './wisa.routing';
import {NotFoundComponent} from './@core/not-found/not-found.component';
import {WindEnergyPlantComponent} from './pages/wind-energy-plant/wind-energy-plant.component';
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
import {MatButtonModule} from '@angular/material/button';
import {PreferenceComponent} from './@core/utility/preference/preference.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {LoginComponent} from './@core/login/login.component';
import {AUTH_ENABLED, BASE_URL_DATAPLATFORM, DEMONSTRATOR, LANGUAGE, STOMP_DESTINATION, WEBSOCKET_DESTINATION} from './wisa.tokens';

import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {AccountModule} from './@core/account/account.module';
import {MapComponent} from './@core/map/map.component';
import { AnalysisComponent } from './@core/utility/analysis/analysis.component';
import {ConditionMonitoringComponent} from './@core/condition-monitoring/condition-monitoring.component';
import {LineChartComponent} from './@core/utility/depiction/echarts/line-chart/line-chart.component';
import {QuickviewComponent} from './@core/condition-monitoring/components/quickview/quickview.component';
import {HeatmapComponent} from './@core/utility/depiction/echarts/heatmap/heatmap.component';
import {ContentCreatorComponent, GraphicsDirective} from './@core/utility/content-creator/content-creator.component';
import {HeaderComponent} from './pages/header/header.component';
import {PredictiveAnalyticsComponent} from './@core/predictive-analytics/predictive-analytics.component';
import { AddTileComponent } from './@core/utility/add-tile/add-tile.component';
import {environment as env} from '../environments/environment';
import {BarChartComponent} from "./@core/utility/depiction/echarts/bar-chart/bar-chart.component";
import {TestLineChartComponent} from "./@core/utility/depiction/echarts/test-line-chart/test-line-chart.component";
import {FooterComponent} from "./pages/footer/footer.component";
import {GaugeComponent} from "./@core/utility/depiction/echarts/gauge/gauge.component";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    WisaComponent,
    DashboardComponent,
    SidebarComponent,
    OcarinaOfTimeComponent,
    routingComponents,
    NotFoundComponent,
    WindEnergyPlantComponent,
    PreferenceComponent,
    LoginComponent,
    MapComponent,
    AnalysisComponent,
    ConditionMonitoringComponent,
    PredictiveAnalyticsComponent,
    LineChartComponent,
    QuickviewComponent,
    HeatmapComponent,
    ContentCreatorComponent,
    GraphicsDirective,
    HeaderComponent,
    AddTileComponent,
    BarChartComponent,
    TestLineChartComponent,
    FooterComponent,
    GaugeComponent

  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    wisaRouting,

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
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    CdkAccordionModule,
    MatTabsModule,
    MatInputModule,
    MatButtonToggleModule,
    AccountModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {provide: BASE_URL_DATAPLATFORM, useValue: `http://${env.DATA_PLATFORM.host}:${env.DATA_PLATFORM.port}`},
    {provide: AUTH_ENABLED, useValue: env.AUTH_ENABLE},
    {provide: LANGUAGE, useValue: 'de'},
    {provide: LOCALE_ID, useValue: 'de'},
    {provide: WEBSOCKET_DESTINATION, useValue: env.WS_DES},
    {provide: STOMP_DESTINATION, useValue: env.STOMP_DES},
    {provide: DEMONSTRATOR, useValue: `http://${env.MANAGER.host}:${env.MANAGER.port}`}
    // {provide: APP_BASE_HREF, useValue: '/wisa'}[CookieService],
  ],
  bootstrap: [WisaComponent]
})
export class WisaModule {
}
