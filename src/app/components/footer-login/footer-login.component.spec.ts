import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLoginComponent } from './footer-login.component';

describe('FooterLoginComponent', () => {
  let component: FooterLoginComponent;
  let fixture: ComponentFixture<FooterLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterLoginComponent]
    });
    fixture = TestBed.createComponent(FooterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
