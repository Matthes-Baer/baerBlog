import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Output() customClick = new EventEmitter<void>();

  handleClick() {
    this.customClick.emit();
  }
}
