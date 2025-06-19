import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateComponent } from './book.create.component';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
