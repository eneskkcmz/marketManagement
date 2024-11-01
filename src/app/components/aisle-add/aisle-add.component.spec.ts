import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AisleAddComponent } from './aisle-add.component';

describe('AisleAddComponent', () => {
  let component: AisleAddComponent;
  let fixture: ComponentFixture<AisleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AisleAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AisleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
