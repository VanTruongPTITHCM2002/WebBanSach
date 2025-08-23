import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderdetailComponent } from './orderdetail.component';

describe('OrderdetailComponent', () => {
  let component: AdminOrderdetailComponent;
  let fixture: ComponentFixture<AdminOrderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
