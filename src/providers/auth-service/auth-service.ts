import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SingletonService } from '../configservice';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  apiUrl: any;
  constructor(public http: Http, public endpoint: SingletonService) {
    this.apiUrl = endpoint.apiUrl;
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let url = this.apiUrl + 'user/login';
      let data = credentials;

      this.http.post(url, data, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  register(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa('admin:123456'));
      let userRegData = {
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: credentials.email,
        phone: credentials.phone,
        date_of_birth: credentials.date_of_birth,
        password: credentials.password,
        confirm_password: credentials.confirm_password,
        user_house_nubmer: credentials.user_house_nubmer,
        user_country: credentials.user_country.id,
        user_city: credentials.user_city.id,
        user_state: credentials.user_state.id,
        user_street: credentials.user_street,
        user_zip: credentials.user_zip,
        user_bank: credentials.user_bank,
        user_bank_accout: credentials.user_bank_accout,
        user_tax_number: credentials.user_tax_number,
        gender: credentials.gender,
        company_name: credentials.company_name,
        company_email: credentials.company_email,
        user_payal: credentials.user_payal
      };
      let url = this.apiUrl + 'user/register';
      let data = userRegData;
      this.http.post(url, data, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}