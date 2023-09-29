import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '#/app/ts/types';
import { ButtonSizes, ButtonVariants } from '#/app/ts/enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements Button {
  @Input() size: ButtonSizes = ButtonSizes.Default;
  @Input() variants: ButtonVariants = ButtonVariants.Default;
  protected readonly ButtonVariants = ButtonVariants;
  protected readonly ButtonSizes = ButtonSizes;
}
