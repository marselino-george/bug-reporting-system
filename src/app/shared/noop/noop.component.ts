import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noop',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: []
})
export class NoopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
