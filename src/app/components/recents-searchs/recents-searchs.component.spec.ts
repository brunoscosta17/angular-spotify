import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentsSearchsComponent } from './recents-searchs.component';

describe('RecentsSearchsComponent', () => {
  let component: RecentsSearchsComponent;
  let fixture: ComponentFixture<RecentsSearchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentsSearchsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentsSearchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
