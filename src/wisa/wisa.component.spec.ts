import {TestBed} from '@angular/core/testing';
import {WisaComponent} from './wisa.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WisaComponent
      ],
    }).compileComponents();
  });

  it('should create the wisa', () => {
    const fixture = TestBed.createComponent(WisaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Testing'`, () => {
    const fixture = TestBed.createComponent(WisaComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Demonstrator');
  });
});
