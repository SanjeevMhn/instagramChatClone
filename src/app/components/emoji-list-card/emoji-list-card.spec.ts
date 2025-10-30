import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiListCard } from './emoji-list-card';

describe('EmojiListCard', () => {
  let component: EmojiListCard;
  let fixture: ComponentFixture<EmojiListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
