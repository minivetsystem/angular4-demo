import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SingletonService } from '../configservice';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyProvider {

  apiUrl:any;
  totaloffers:any;
  constructor(public http: Http, public endpoint:SingletonService) {
    this.apiUrl = endpoint.apiUrl;
   }
  company_dept(cid, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'company/' + cid + '/departments?local='+localStorage.getItem('language')+'&token=' + token;  
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json().departments);
          this.totaloffers = res.json().totals.offers.total_offers;
        
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
  allcompany_dept(companyid,token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'company/' + companyid + '/finance/departments/?local='+localStorage.getItem('language')+'&token=' + token+'&page=1';        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json());;
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  
  getRecommend(userid, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'customer/' + userid + '/recommends?local='+localStorage.getItem('language')+'&token=' + token+'&page=1';        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
   getHelp(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
  
      let url = this.apiUrl + 'helps/?page=1&limit=10';        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
}