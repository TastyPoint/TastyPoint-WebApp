import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoginComponent } from './navbar-login.component';

describe('NavbarLoginComponent', () => {
  let component: NavbarLoginComponent;
  let fixture: ComponentFixture<NavbarLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLoginComponent]
    });
    fixture = TestBed.createComponent(NavbarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
