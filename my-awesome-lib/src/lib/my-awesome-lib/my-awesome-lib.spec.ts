import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAwesomeLib } from './my-awesome-lib';

describe('MyAwesomeLib', () => {
  let component: MyAwesomeLib;
  let fixture: ComponentFixture<MyAwesomeLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAwesomeLib],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAwesomeLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
