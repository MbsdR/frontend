import {Injectable} from '@angular/core';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  storage: Map<string, Array<IDatapoint>>;

  constructor(private usermanagement: UsermanagementService) {
    const dashboards = this.usermanagement.profile.settings;
    this.storage = new Map<string, Array<IDatapoint>>();

    for (const dashboard of Object.keys(dashboards)) {
      for (const iTile of dashboards[dashboard]) {
        this.storage.set(iTile.setting.feature, new Array<IDatapoint>());
      }
    }
  }
}
