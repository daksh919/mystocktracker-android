import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDataComponent } from './process-data.component';

describe('ProcessDataComponent', () => {
  let component: ProcessDataComponent;
  let fixture: ComponentFixture<ProcessDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
