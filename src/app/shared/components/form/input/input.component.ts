import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputType } from '#/app/shared/components/form/input/input.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  type: InputType = InputType.text;
  @Input()
  label: string = '';
  @Input()
  labelFor: string = '';
  @Input()
  id: string = '';
  @Input()
  name: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  required: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  success: string = '';
  @Input()
  error: string = '';
  @Input()
  hasIcon: boolean = false;
  @Input()
  formControlName: string = '';
  @Input()
  classes: string[] = [''];
}
