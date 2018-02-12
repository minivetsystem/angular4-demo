import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { CompanyProvider } from '../../../providers/company/company';

@Component({
  selector: 'departments',
  templateUrl: 'departments.html'
})
export class DepartmentsComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController, private addpeopletodept: ModalController) {
    this.showLoader();
    this.companyprovider.company_dept(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
      this.loading.dismiss();
      this.information = result;
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
    if (this.information[i].open) { this.showLoader(); }
    this.companyprovider.company_dept_employee(this.information[i].company_id, this.information[i].id, localStorage.getItem('token')).then((result) => {
      this.information[i].employees = result['employees'];
      this.information[i].cofferlength = isset(() => Object.keys(result['employees'].length)) ? 1 : 0;
      this.loading.dismiss();
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  }

  // if there are further children toggle data
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() { }
  ionViewWillLeave() { this.loading.dismiss(); }
  ionViewWillEnter() {
    if (!this.alreadyLoaded) {
      this.showLoader();
      this.alreadyLoaded = true;
    } else {
      this.loading.dismiss();
    }

  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }
  edit(empuserid) {

    var empdata = { empid: empuserid, company_id: localStorage.getItem('company_id') };
    const editpeopledetails = this.addpeopletodept.create('EditPeopleModalPage', { userdata: empdata });
    editpeopledetails.present();
  }

  //  call  modal add people to department
  add_people_dept(departid) {
    const add_peopletodept = this.addpeopletodept.create('AddppldeptmodalPage', { deptid: departid });
    add_peopletodept.present();
  }

}
/*
UDF : Check Object has property
*/
function isset(fn: () => any) {
  let result;

  try {
    result = fn();
  } catch (ex) {
    result = undefined;
  } finally {
    return result !== undefined;
  }

}
