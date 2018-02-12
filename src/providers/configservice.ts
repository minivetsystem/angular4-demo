import { Injectable } from '@angular/core';

@Injectable()
export class SingletonService {
  public baseurl:string = 'http://server.com/waves/';
  public apiUrl:string='http://server.com/waves/api/v1/';
  
}