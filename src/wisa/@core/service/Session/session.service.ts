import {EventEmitter, Injectable} from '@angular/core';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {IProfile} from "../../model/Usermangemant/IProfile";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  storage: Map<string, Array<IDatapoint>>;
  $Profile: EventEmitter<IProfile>;

  constructor(private usermanagement: UsermanagementService) {

    this.$Profile = new EventEmitter<IProfile>();
    this.$Profile.emit(usermanagement.profile);
    const dashboards = this.usermanagement.profile.settings;
    this.storage = new Map<string, Array<IDatapoint>>();

    for (const dashboard of Object.keys(dashboards)) {
      for (const iTile of dashboards[dashboard]) {
        this.storage.set(iTile.setting.feature, new Array<IDatapoint>());
      }
    }
  }

  newProfile(profile: IProfile): void {
    this.usermanagement.profile = profile;
    this.$Profile.emit(profile);
  }
}
