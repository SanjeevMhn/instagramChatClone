import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiList } from './emoji-list';

describe('EmojiList', () => {
  let component: EmojiList;
  let fixture: ComponentFixture<EmojiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
