import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasalaListComponent } from './masala-list.component';

describe('MasalaListComponent', () => {
  let component: MasalaListComponent;
  let fixture: ComponentFixture<MasalaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasalaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasalaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
