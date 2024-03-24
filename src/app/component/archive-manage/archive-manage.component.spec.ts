import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveManageComponent } from './archive-manage.component';

describe('ArchiveManageComponent', () => {
  let component: ArchiveManageComponent;
  let fixture: ComponentFixture<ArchiveManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
