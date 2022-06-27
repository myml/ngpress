import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FsService } from './fs.service';
import { MarkdownService, RenderResult } from './markdown.service';

@Injectable({
  providedIn: 'root',
})
export class PostsResolverService implements Resolve<RenderResult> {
  constructor(private markdown: MarkdownService, private fs: FsService) {}
  async resolve(route: ActivatedRouteSnapshot): Promise<RenderResult> {
    const path = route.url.map(String).join('/');
    const md = await this.fs.readFile(`posts/${path}.md`);
    return this.markdown.render(md);
  }
}
