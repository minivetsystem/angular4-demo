import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SingletonService } from '../configservice';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerProvider {

  apiUrl:any;
  data = {
    fname:'',
    lname:'',
    level:'',
    acct_bal:'',
    earning:''
  };
  constructor(public http: Http, public endpoint:SingletonService) {
    this.apiUrl = endpoint.apiUrl;
   }
   authenticate() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'checktoken?local='+localStorage.getItem('language')+'&token='+localStorage.getItem('token')+'&local='+localStorage.getItem('language');
      // let data  = countryname;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json());
          // console.log("earning",res.json());
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
   getMonthlyEarnings(custid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'customer/'+ custid + '/account/monthlyearnings?local='+localStorage.getItem('language')+'&token='+localStorage.getItem('token');
      // let data  = countryname;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json());
          // console.log("earning",res.json());
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
   
}


