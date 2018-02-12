import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SingletonService } from '../configservice';
import 'rxjs/add/operator/map';
@Injectable()
export class VendorServiceProvider {

  apiUrl:any;
  constructor(public http: Http, public endpoint:SingletonService) {
    this.apiUrl = endpoint.apiUrl;
   }
  getCategories() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'categories?local='+localStorage.getItem('language')+'&token='+localStorage.getItem('token');
      // let data  = countryname;        
      let options = new RequestOptions({ headers: headers });
      this.http.get(url, options)
        .subscribe(res => {
          resolve(res.json());
          //console.log("000",res.json().message);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
  getSubCategories(maincatid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'category/'+maincatid+'/subcategories?local='+localStorage.getItem('language')+'&token='+localStorage.getItem('token');
      // let data  = countryname;        
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

  getBrands() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'brands?local='+localStorage.getItem('language')+'&token='+localStorage.getItem('token');
      // let data  = countryname;        
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
 
  addNewDept (deptdetails, cid, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'company/' + cid + '/department?local='+localStorage.getItem('language')+'&token='+ token;
      console.log('promise', deptdetails);
      let newDeptData = {
        department_name:deptdetails,
      };
      this.http.post(url, newDeptData, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

 
}
