import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hidden: boolean = false;
  name: string = 'something...';

  public onClickToggle(): void {
    this.hidden = !this.hidden;
  }

  public onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.name = input.value;
  }
}
