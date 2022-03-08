import {Injectable} from '@angular/core';
import {IProfile, Profile} from '../@core/model/Usermangemant/IProfile';
import {SettingMockUpService} from './setting-mock-up.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileMockUpService {
  profiles: { obe: IProfile, vat: IProfile, dwt?: IProfile};

  constructor(private settingMockUpService: SettingMockUpService) {
    this.profiles = {
      vat: new Profile(settingMockUpService.vatTiles),
      obe: new Profile(settingMockUpService.obeTiles)
    };
  }
}
