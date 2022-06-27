import { Injectable } from '@angular/core';
import { marked } from 'marked';
import fm from 'front-matter';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  constructor() {}
  hljs = import('highlight.js/lib/common').then((m) => m.default);

  async highlight(code: string, lang: string) {
    const result = (await this.hljs).highlight(lang, code);
    return result.value;
  }

  async render(md: string): Promise<RenderResult> {
    const result = fm(md);
    const html = await new Promise<string>((resolve, reject) => {
      marked(
        result.body,
        {
          highlight: (code, lang, callback) => {
            if (callback) {
              this.highlight(code, lang).then((value) => callback(null, value));
            }
          },
        },
        (err, html) => (err ? reject(err) : resolve(html))
      );
    });
    return { html, meta: result.attributes as {} };
  }
}

export interface RenderResult {
  html: string;
  meta: { title?: string };
}
