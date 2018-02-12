import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import { SingletonService } from '../../../providers/configservice';
declare var cordova: any;
@Component({
  selector: 'editoffer',
  templateUrl: 'editoffer.html'
})
export class EditofferComponent {
  lastImage: string = null;
  first_Image: string = null;
  second_Image: string = null;
  third_Image: string = null;
  fourth_Image: string = null;

  is_uploaded_first_Image: boolean = false;
  is_uploaded_second_Image: boolean = false;
  is_uploaded_third_Image: boolean = false;
  is_uploaded_fourth_Image: boolean = false;

  cur_first_Image: string = null;
  cur_second_Image: string = null;
  cur_third_Image: string = null;
  cur_fourth_Image: string = null;
  loading: Loading;
  addofferForm: any;
  fieldArray: Array<any> = [];
  tempfieldArray: any = {};
  newAttribute: any = {};
  oldAttribute: any = {};
  bonusby: any;
  isanyuploaded: boolean = false;
  maincat: any;
  subcat: any;
  sub_subcat: any;
  brands: any;
  departments: any;
  //edit form field
  offertitle: any;
  productname: any;
  internalcode: any;
  price: any;
  bonus: any;
  mcategory: any;
  category: any;
  subcategory: any;
  brand: any;
  department: any;
  offerstartdate: any;
  offerenddate: any;
  offerdesc: any;
  delwarranty: any;
  offerspecs: any;
  offeraddinfo: any;
  // old images
  oldImgFirst: string = null;
  oldImgSecond: string = null;
  oldImgThird: string = null;
  oldImgFourth: string = null;
  oldImgFirst_id: any;
  oldImgSecond_id: any;
  oldImgThird_id: any;
  oldImgFourth_id: any;
  offerid: any;
  tempimg_array: Array<any> = [];
  constructor(public vendorservice: VendorServiceProvider, public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public navParams: NavParams, private formBuilder: FormBuilder, public endpoint: SingletonService, public alertCtrl: AlertController) {
    this.vendorservice.getCategories().then((result) => {
      // = result;
      this.maincat = result['categories'];
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    this.vendorservice.getBrands().then((result) => {
      // = result;
      this.brands = result['brands'];
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    this.vendorservice.addoffer_dept(localStorage.getItem('company_id'), localStorage.getItem('token')).then((result) => {
      // = result;
      this.departments = result['departments'];

    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    this.bonusby = "dynamic";
    this.addofferForm = this.formBuilder.group({
      'offertitle': ['', Validators.required],
      'productname': ['', Validators.required],
      'internalcode': ['', Validators.required],
      'price': ['', Validators.required],
      'bonus': ['', Validators.required],
      'bonusby': ['', Validators.required],
      'mcategory': ['', Validators.required],
      'category': ['', Validators.required],
      'subcategory': [''],
      'brand': ['', Validators.required],
      'department': ['', Validators.required],
      'offerstartdate': ['', Validators.required],
      'offerenddate': ['', Validators.required],
      'offerdesc': ['', Validators.required],
      'delwarranty': ['', Validators.required],
      'offerspecs': ['', Validators.required],
      'offeraddinfo': ['', Validators.required],
      'newAttribute': ['']
    });
    console.log('offerid', navParams.get('data'));
    this.vendorservice.editOffer(navParams.get('data'), localStorage.getItem('token')).then((offerdata) => {
      console.log('offerdata', offerdetails);
      var offerdetails = offerdata['offer']
      this.offerid = offerdetails['id']
      this.offertitle = offerdetails['offer_title'];
      this.productname = offerdetails['product_name'];
      this.internalcode = offerdetails['internal_code'];
      this.price = offerdetails['offer_price'];
      this.bonus = offerdetails['offer_bonus'];
      this.bonusby = offerdetails['offer_bonus_type'];
      this.mcategory = offerdetails['offer_main_category'];
      this.maincatchange(offerdetails['offer_main_category']);
      this.category = offerdetails['offer_category'];
      this.subcatchange(offerdetails['offer_category']);
      this.subcatchange(offerdetails['offer_category']);
      this.subcategory = offerdetails['category_id'];
      this.brand = offerdetails['brand_id'];
      this.department = offerdetails['department_id'];
      this.offerstartdate = offerdetails['start_date'].replace(" ", "T");
      this.offerenddate = offerdetails['end_date'].replace(" ", "T");
      this.offerdesc = offerdetails['offer_description'];
      this.delwarranty = offerdetails['delivery_and_warranty'];
      this.offerspecs = offerdetails['specifications'];
      this.offeraddinfo = offerdetails['aditional_informations'];
      for (let item in offerdetails['characteristics']) {
        this.oldAttribute.chartics = offerdetails['characteristics'][item].name;
        //  console.log('loop item',offerdetails['characteristics'][item].name);
        this.fieldArray.push(this.oldAttribute);
        this.oldAttribute = {};
        this.oldAttribute.chartics = "";
      }
      for (let offerimg in offerdetails['images']) {

        if (offerimg == '0') {
          this.oldImgFirst = offerdetails['images'][offerimg].paths.small;
          this.oldImgFirst_id = offerdetails['images'][offerimg].id;
          this.is_uploaded_first_Image = true;

        }
        if (offerimg == '1') {
          this.oldImgSecond = offerdetails['images'][offerimg].paths.small;
          this.oldImgSecond_id = offerdetails['images'][offerimg].id;
          this.is_uploaded_second_Image = true;

        }
        if (offerimg == '2') {
          this.oldImgThird = offerdetails['images'][offerimg].paths.small;
          this.oldImgThird_id = offerdetails['images'][offerimg].id;
          this.is_uploaded_third_Image = true;

        }
        if (offerimg == '3') {
          this.oldImgFourth = offerdetails['images'][offerimg].paths.small;
          this.oldImgFourth_id = offerdetails['images'][offerimg].id;
          this.is_uploaded_fourth_Image = true;
        }
      }
      console.log('images01', this.oldImgFirst);
      console.log('images02', this.oldImgSecond);
      console.log('images03', this.oldImgThird);
      console.log('images04', this.oldImgFourth);
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  }

  maincatchange(maincatindex: any) {

    this.showLoadermsg('Loading...');
    this.vendorservice.getSubCategories(maincatindex).then((result) => {

      this.subcat = [];
      this.sub_subcat = [];
      this.subcat = result['categories'];
      // this.loading.dismiss();
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  }
  subcatchange(catindex: any) {

    this.vendorservice.getSubCategories(catindex).then((result) => {
      // = result;
      this.sub_subcat = [];
      this.sub_subcat = result['categories'];
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddofferPage');
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  public presentActionSheet(imgorder) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, imgorder);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, imgorder);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType, imgorder) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgorder);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgorder);
      }
    }, (err) => {
      if (localStorage.getItem("language") == 'en') {
        this.presentToast('Error while selecting image.');
      } else {
        this.presentToast('Napaka pri izbiranju slike.');
      }

    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName, imgorder) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {

      switch (imgorder) {
        case 1: {
          this.first_Image = newFileName;
          this.cur_first_Image = currentName;
          break;
        }

        case 2: {
          this.second_Image = newFileName;
          this.cur_second_Image = currentName;
          break;
        }

        case 3: {
          this.third_Image = newFileName;
          this.cur_third_Image = currentName;
          break;
        }

        case 4: {
          this.fourth_Image = newFileName;
          this.cur_fourth_Image = currentName;
          break;
        }

        default: {
          console.log("Invalid choice");
          break;
        }
      }
      this.lastImage = newFileName;
    }, error => {

      if (localStorage.getItem("language") == 'en') {
        this.presentToast('Error while storing file.');
      } else {
        this.presentToast('Napaka med shranjevanjem datoteke.');
      }
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(imgorder) {
    // selected image upload on click
    var ccimg: string;
    switch (imgorder) {
      case 1: {
        ccimg = this.first_Image;
        this.is_uploaded_first_Image = true;
        break;
      }
      case 2: {
        ccimg = this.second_Image;
        this.is_uploaded_second_Image = true;
        break;
      }
      case 3: {
        ccimg = this.third_Image;
        this.is_uploaded_third_Image = true;
        break;
      }
      case 4: {
        ccimg = this.fourth_Image;
        this.is_uploaded_fourth_Image = true;
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
    // Destination URL
    var url = this.endpoint.apiUrl + "offer/temp_image/upload?token=" + localStorage.getItem('token');
    var uri = encodeURI(url);
    // File for Upload
    var targetPath = this.pathForImage(ccimg);
    // File name only
    var filename = ccimg;
    var options = {
      fileKey: "image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: { 'Authorization': 'Basic YWRtaW46MTIzNDU2' },
      params: { 'type': 'offer', 'device': 'mobile' }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, uri, options).then(data => {
      this.loading.dismissAll();

      // var imageid:Array<any>=[];
      var imageid;
      imageid = JSON.parse(data['response']);
      // for(let item in data){
      // imageid.push(data[item]);
      // }
      this.tempimg_array.push(imageid['image'][0].id);
      // this.presentToast(imageid['image'][0].id);
      if (imageid['status'] == true) {
        if (localStorage.getItem("language") == 'en') {
          this.presentToast('offer image successfully uploaded.');
        } else {
          this.presentToast('ponuditi sliko uspešno naloženo.');
        }
      } else {
        this.presentToast(imageid['message']);
      }

    }, err => {
      this.loading.dismissAll()
      if (localStorage.getItem("language") == 'en') {
        this.presentToast('Error while uploading file.' + err);
      } else {
        this.presentToast('Napaka med shranjevanjem datoteke.' + err);
      }
    });
  }
  delete(imgorder) {
    switch (imgorder) {
      case 1: {
        this.first_Image = null;
        this.cur_first_Image = null;
        this.is_uploaded_first_Image = false;
        break;
      }

      case 2: {
        this.second_Image = null;
        this.cur_second_Image = null;
        this.is_uploaded_second_Image = false;
        break;
      }

      case 3: {
        this.third_Image = null;
        this.cur_third_Image = null;
        this.is_uploaded_third_Image = false;
        break;
      }

      case 4: {
        this.fourth_Image = null;
        this.cur_fourth_Image = null;
        this.is_uploaded_fourth_Image = false;
        break;
      }

      default: {
        console.log("Invalid choice");
        break;
      }
    }
  }
  addFieldValue() {
    console.log(this.newAttribute);
    if (typeof this.newAttribute.chartics !== 'undefined' && this.newAttribute.chartics !== '') {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
      this.newAttribute.chartics = "";
    } else {
      console.log(this.newAttribute.chartics);
    }

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  deleteold(offerid, imageid, imgorder) {
    console.log('offerid', offerid, 'imageid', imageid);
    this.showLoadermsg('Deleting offer image...');
    this.vendorservice.deleteOfferImage(offerid, imageid).then((result) => {
      this.loading.dismiss();
      if (result['status']) {
        this.showAlertstatic(result['message']);
        switch (imgorder) {
          case 1: {
            this.first_Image = null;
            this.cur_first_Image = null;
            this.is_uploaded_first_Image = false;
            this.oldImgFirst = null;
            break;
          }

          case 2: {
            this.second_Image = null;
            this.cur_second_Image = null;
            this.is_uploaded_second_Image = false;
            this.oldImgSecond = null;
            break;
          }

          case 3: {
            this.third_Image = null;
            this.cur_third_Image = null;
            this.is_uploaded_third_Image = false;
            this.oldImgThird = null;
            break;
          }

          case 4: {
            this.fourth_Image = null;
            this.cur_fourth_Image = null;
            this.is_uploaded_fourth_Image = false;
            this.oldImgFourth = null;
            break;
          }

          default: {
            console.log("Invalid choice");
            break;
          }
        }
      } else {
        this.showAlertstatic(result['message']);
      }

    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });

  }
  saveOfferDetails() {

    this.isanyuploaded = this.is_uploaded_first_Image ? false : this.is_uploaded_second_Image ? false : this.is_uploaded_third_Image ? false : this.is_uploaded_fourth_Image ? false : true;

    if (this.addofferForm.dirty && this.addofferForm.valid) {
      if (this.addofferForm.value.newAttribute !== '') {
        this.fieldArray.push(this.addofferForm.value.newAttribute);
      }
      var i = 0;
      for (i = 0; i < this.fieldArray.length; i++) {
        this.tempfieldArray[i] = this.fieldArray[i]['chartics'];
      }
      var offerData = {
        offer_title: this.addofferForm.value.offertitle,
        product_name: this.addofferForm.value.productname,
        internal_code: this.addofferForm.value.internalcode,
        offer_price: this.addofferForm.value.price,
        offer_bonus: this.addofferForm.value.bonus,
        offer_bonus_type: this.addofferForm.value.bonusby,
        offer_main_category: this.addofferForm.value.mcategory,
        offer_category: this.addofferForm.value.category,
        category_id: this.addofferForm.value.subcategory == null ? this.addofferForm.value.category : this.addofferForm.value.subcategory,
        brand_id: this.addofferForm.value.brand,
        department_id: this.addofferForm.value.department,
        start_date: this.addofferForm.value.offerstartdate,
        end_date: this.addofferForm.value.offerenddate,
        characteristics: JSON.stringify(this.tempfieldArray),
        offer_description: this.addofferForm.value.offerdesc,
        delivery_warranty: this.addofferForm.value.delwarranty,
        specification: this.addofferForm.value.offerspecs,
        additional_info: this.addofferForm.value.offeraddinfo,
        temp_images: JSON.parse(JSON.stringify(this.tempimg_array))

      };
      // console.log(offerData);
      this.showLoader();
      this.vendorservice.addNewOffer(offerData).then((result) => {
        this.loading.dismiss();
        if (result['status']) {
          this.showAlert(result['message']);
        } else {
          this.showAlert(result['message']);
        }

      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
      // send data to service
    }
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Submitting...'
    });

    this.loading.present();
  }
  showLoadermsg(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }
  showAlertstatic(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();

          return false;
        }
      }]
    });

    alert.present();
  }

}