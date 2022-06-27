import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { FsService } from './fs.service';
import { MarkdownService } from './markdown.service';

@Injectable({
  providedIn: 'root',
})
export class IndexResolverService implements Resolve<Post[]> {
  constructor(private fs: FsService, private markdown: MarkdownService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const posts = JSON.parse(await this.fs.readFile('posts.json')) as Post[];
    for (const post of posts) {
      const result = await this.markdown.render(post.content);
      post.content = result.html;
    }
    return posts;
  }
}

export interface Post {
  path: string;
  title: string;
  date: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  content: string;
}
