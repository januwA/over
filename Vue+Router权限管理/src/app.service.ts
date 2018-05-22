import { Injectable } from '@nestjs/common';

import { Observable, of, bindNodeCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { readFile } from 'fs'
import { resolve } from 'path';

const html_path = resolve(__dirname, '../', 'app', 'index.html')
@Injectable()
export class AppService {
  root(): Observable<string> {
    return bindNodeCallback(readFile)(html_path)
      .pipe(map(v => (v).toString('utf8')))
  }
}
