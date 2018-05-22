import { Get, Post, Controller, Header, Query, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of, bindNodeCallback } from 'rxjs';
import * as _ from 'lodash'
import { get } from 'http';


let users = [
  { name: 'Ajanuw', password: '12345', jurisdiction: 0, token: 0, ts: 0 },
  { name: 'Asd', password: '66666', jurisdiction: 0, token: 0, ts: 0 }
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Header('access-control-allow-origin', '*')
  @Header('X-username', 'Ajanuw')
  root(): Observable<string> {
    return this.appService.root();
  }

  @Post('login')
  create(
    @Body('name') name,
    @Body('password') password,
    @Body('timeStamp') timeStamp): Observable<any> {
    const isUserExis: number = _.findIndex(users, { name, password });

    if (isUserExis >= 0) {
      /**
       * 登陆设置token，timeStamp,更具用户名设置权限
       */
      if (_.eq(name, 'Ajanuw')) {
        Object.assign(users[isUserExis], {
          token: +new Date(),
          ts: +new Date(),
          jurisdiction: 1
        });
      } else if (_.eq(name, 'Asd')) {
        Object.assign(users[isUserExis], {
          token: +new Date(),
          ts: +new Date(),
          jurisdiction: 2
        });
      }

      return of({ code: 1, token: users[isUserExis].token })
    } else {
      return of({ code: 0 })
    }
  }

  @Get('getData')
  data(
    @Query('token') token,
    @Query('t') t): Observable<any> {
    const index: number = _.findIndex(users, user => user.token == token);
    if (index >= 0) {

      const elapsed = (t - users[index].ts) / 1000;
      let min = elapsed / 60;
      const old_t: boolean = min >= 1; // 登陆时间已过期
      console.log( min);
      

      if (old_t) {
        // 时间到了清空token
        console.log('clear token');
        _.update(users, `[${index}].token`, 0);
        return of({
          code: 0
        })
      } else {
        const j = users[index].jurisdiction;
        if (j === 1) {
          return of({
            code: 1,
            body: '你的权限极高'
          })
        } else if (j === 2) {
          return of({
            code: 1,
            body: '你只有一点权限'
          })
        } else {
          return of({
            code: 1,
            body: '你没有权限'
          })
        }
      }
    } else {
      // token 不存在，过期登陆
      return of({
        code: 0
      })
    }
  }
}
