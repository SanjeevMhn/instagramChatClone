import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageItem } from './chat-message-item';

describe('ChatMessageItem', () => {
  let component: ChatMessageItem;
  let fixture: ComponentFixture<ChatMessageItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessageItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
