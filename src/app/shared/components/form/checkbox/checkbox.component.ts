import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input()
  label: string = '';
  @Input()
  labelFor: string = '';
  @Input()
  name: string = '';
  @Input()
  required: boolean = false;
}
