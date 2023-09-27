import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentsModule } from '#/app/components/layout-components/layout-components.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, LayoutComponentsModule, RouterOutlet],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {}
