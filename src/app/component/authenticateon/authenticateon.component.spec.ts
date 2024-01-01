import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateonComponent } from './authenticateon.component';

describe('AuthenticateonComponent', () => {
  let component: AuthenticateonComponent;
  let fixture: ComponentFixture<AuthenticateonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
