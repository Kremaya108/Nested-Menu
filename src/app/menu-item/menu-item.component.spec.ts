import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItemComponent } from './menu-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';

describe('MenuItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        FontAwesomeModule
      ],
      declarations: [
        MenuItemComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MenuItemComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

});
