import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  template: `
    <section *ngFor="let post of posts$ | async">
      <main class="markdown-body" [innerHtml]="post.content"></main>
      <footer>
        <a [href]="post.path.slice(0, -3)">
          <button class="m-btn">阅读更多</button>
        </a>
        <span>
          {{ post.date | date: 'yyyy-MM-dd' }}
        </span>
      </footer>
      <hr />
    </section>
  `,
  imports: [CommonModule],

  styles: [
    `
      footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: gray;
        }
      }
    `,
  ],
})
export class IndexComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  posts$ = this.route.data.pipe(map((data) => data['result']));
  ngOnInit(): void {}
}
