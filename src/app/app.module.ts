import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SidebarComponent} from './pages/sidebar.component';
import {OcarinaOfTimeComponent} from './@core/ocarina-of-time/component/ocarina-of-time/ocarina-of-time.component';
import {appRouting, routingComponents} from './app.routing';
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
import {ConditionMonitoringModule} from './@core/condition-monitoring/condition-monitoring.module';
import {MatButtonModule} from '@angular/material/button';
import { PreferenceComponent } from './@core/utility/preference/preference.component';
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
import {AUTH_ENABLED, BASE_URL_DATAPLATFORM, LANGUAGE} from './app.tokens';
import { TabDirective } from './pages/wind-energy-plant/tab.directive';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { AccountComponent } from './@core/account/account.component';
import {AccountModule} from './@core/account/account.module';
registerLocaleData(localeDe);
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    OcarinaOfTimeComponent,
    routingComponents,
    NotFoundComponent,
    WindEnergyPlantComponent,
    PreferenceComponent,
    LoginComponent,
    TabDirective
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
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    CdkAccordionModule,
    MatTabsModule,
    MatInputModule,
    ConditionMonitoringModule,
    MatButtonToggleModule,
    AccountModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de'},
    { provide: BASE_URL_DATAPLATFORM, useValue: 'http://localhost:8001'},
    { provide: AUTH_ENABLED, useValue: false},
    { provide: LANGUAGE, useValue: 'de'},
    { provide: LOCALE_ID, useValue: 'de'}
    // {provide: APP_BASE_HREF, useValue: '/wisa'}[CookieService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
