import { InjectionToken } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';

export const NODE_READ_FILE = new InjectionToken<() => Promise<string>>(
  'node.fs.readfile'
);

@Injectable({
  providedIn: 'root',
})
export class FsService {
  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    @Optional()
    @Inject(NODE_READ_FILE)
    private nodeReadFile: (file: string) => Promise<string>,
    private http: HttpClient
  ) {}

  async readFile(file: string) {
    if (isPlatformServer(this.platform)) {
      try {
        const data = await this.nodeReadFile(`src/assets/${file}`);
        return data;
      } catch (err) {
        console.log(err);
        return `# Error\nFile: ${file} \n`;
      }
    }

    return firstValueFrom(
      this.http.get(`assets/${file}`, { responseType: 'text' })
    );
  }
}
