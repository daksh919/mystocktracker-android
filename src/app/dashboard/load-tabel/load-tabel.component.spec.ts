import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTabelComponent } from './load-tabel.component';

describe('LoadTabelComponent', () => {
  let component: LoadTabelComponent;
  let fixture: ComponentFixture<LoadTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadTabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
