import {Injectable} from '@angular/core';
import {IProfile, Profile} from '../@core/model/Usermangemant/IProfile';
import {CHANNELS} from '../@core/model/Constants/mapping';
import {FREQUENCY, UNITS} from '../@core/model/Constants/ChartSettingConstants';
import {TileSetting} from '../@core/model/Usermangemant/ITileSetting';
import {SettingMockUpService} from './setting-mock-up.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileMockUpService {
  profiles: { obe: IProfile, vat: IProfile, dwt?: IProfile};

  constructor(private settings: SettingMockUpService) {
    this.profiles = {
      vat: new Profile(),
      obe: new Profile()
    };

    this.profiles.vat.condition = settings.vatTiles;
    this.profiles.obe.condition = settings.obeTiles;
  }
}
