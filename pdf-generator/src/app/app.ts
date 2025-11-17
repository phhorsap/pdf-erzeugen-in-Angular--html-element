import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pdf } from './pdf/pdf';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Pdf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pdf-generator');
}
