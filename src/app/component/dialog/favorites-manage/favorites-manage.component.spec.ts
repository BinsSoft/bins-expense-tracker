import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesManageComponent } from './favorites-manage.component';

describe('FavoritesManageComponent', () => {
  let component: FavoritesManageComponent;
  let fixture: ComponentFixture<FavoritesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
