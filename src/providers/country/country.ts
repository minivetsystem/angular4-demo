import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SingletonService } from '../configservice';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryProvider {
  apiUrl: any;
  constructor(public http: Http, public endpoint: SingletonService) {
    this.apiUrl = endpoint.apiUrl;
  }
  allcountries() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'countries?local=' + localStorage.getItem('language') + '&token=' + localStorage.getItem('token');
      // let data  = countryname;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().countries);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  allstates(cid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'country/' + cid + '/states';
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().states);
          console.log("000-  ", cid);
        }, (err) => {
          reject(err);
          console.log("fromcountryService", err);
        });
    });
  }
  getStatebyid(cid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'country/' + cid + '/states';
      // let data  = countryname;    

      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().states);
          // console.log(JSON.stringify(res.json().states));
        }, (err) => {
          reject(err);
          console.log("fromcountryService", err);
        });
    });
  }
  allcities(sid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'state/' + sid + '/cities';
      // let data  = countryname;    

      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().cities);
          // console.log("000-  ",cid);
        }, (err) => {
          reject(err);
          console.log("fromcountryService", err);
        });
    });
  }
}