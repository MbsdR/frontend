import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HistoricData, IHistoricData} from '../../model/dto/IHistoricData';
import {formatDate} from '@angular/common';
import {ITile} from '../../model/Usermangemant/ITile';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {catchError, retry} from 'rxjs';
import {DEMONSTRATOR} from '../../../wisa.tokens';

@Injectable({
  providedIn: 'root'
})
export class ManagerAPIService {

  public turbine: string;
  public dashboard: string;

  private user: string;

  constructor(@Inject(DEMONSTRATOR) private URL: string,
              private managementService: UsermanagementService,
              private http: HttpClient) {
    this.user = managementService.getUser();
  }

  historicData(start: Date, end: Date): void {
    const body = new HistoricData('OBE');
    body.start = formatDate(start, 'YYYY-MM-dd HH:mm:ssZ', 'de');
    body.stop = formatDate(end, 'YYYY-MM-dd HH:mm:ssZ', 'de');
    body.turbine = this.turbine;
    console.log(this.dashboard);
    // Todo anpassen an sichtbares Dashboard
    const dashboards = this.managementService.profile.settings;

    for (const iTile of dashboards.pa) {
      body.features.push(iTile.setting.feature);
    }
    for (const iTile of dashboards.cms) {
      body.channels.push(iTile.setting.feature);
    }

    console.log('request', JSON.stringify(body));
    this.http.post<IHistoricData>(`http://${this.URL}/api/historicData`, body, {headers: {user: this.user}})
      .pipe(retry(3)).subscribe();
  }

  /**
   */
  public controlJob(nextDate: Date): void {
    console.log('control Job', formatDate(nextDate, 'yyyy-MM-dd HH:mm:ssZ', 'de'));
    this.http.post<string>(
      `http://${this.URL}/api/historicData/control`,
      `${formatDate(nextDate, 'yyyy-MM-dd HH:mm:ssZ', 'de')}`,
      {headers: {user: this.user}
      }).subscribe();
  }
}
