import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { RenderResult } from '../services/markdown.service';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="markdown-body" [innerHTML]="html$ | async"></div>
    <button class="m-btn" (click)="toTop()">返回顶部</button>
  `,
})
export class PostComponent implements OnInit {
  constructor(private title: Title, private route: ActivatedRoute) {}
  html$ = this.route.data.pipe(
    map((data) => data['result'] as RenderResult),
    map((result) => {
      if (result.meta?.title) {
        this.title.setTitle(result.meta.title);
      }
      return result.html;
    })
  );
  ngOnInit(): void {
    this.toTop();
  }
  toTop() {
    scroll(0, 0);
  }
}
