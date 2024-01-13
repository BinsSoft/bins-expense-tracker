import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeekToTransactionComponent } from './speek-to-transaction.component';

describe('SpeekToTransactionComponent', () => {
  let component: SpeekToTransactionComponent;
  let fixture: ComponentFixture<SpeekToTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeekToTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeekToTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
