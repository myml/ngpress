import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { RenderResult } from '../services/markdown.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="markdown-body" [innerHTML]="html$ | async"></div>
    <button class="m-btn" (click)="toTop()">返回顶部</button>
  `,
})
export class PostComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  html$ = this.route.data.pipe(
    map((data) => data['result'] as RenderResult),
    map((result) => result.html)
  );
  ngOnInit(): void {}
  toTop() {
    scroll(0, 0);
  }
}
