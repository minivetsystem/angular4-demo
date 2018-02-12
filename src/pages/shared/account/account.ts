import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events, MenuController  } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { CustomerProvider } from '../../../providers/customer/customer';
import { Utils } from '../../utils';
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  dataStore: {};
  loadProgress:number=0;
  i: number;
  options: any;
  loading: any;
  viewdata={
    fname:'',
    lname:'',
    level:'',
    acct_bal:'',
    earning:'',
    profileimg:'',
    referralCode:'',
  };
  showinfi:boolean=true;
  level:number=0;
  currentdate:Date; 
  notification:Array<any>=[];
  color = {
    orange:'#cf6f07',
    orangebdr:'rgb(238, 119, 14)',
    green:'#12b312',
    greenbdr:'rgb(9, 126, 9)',
    red:'#ef4137',
    redbdr:'rgb(243,74,65)',
    purple:'#9f2064',
    purplebdr:'rgb(159,32,100)'
  };
  chartcontainer = {
    'first':true,
    'second':true,
    'third':true,
    'fourth':true
  };
  constructor(public menu: MenuController,public events:Events, public navCtrl: NavController, public navParams: NavParams, public customerprovider: CustomerProvider, public loadingCtrl: LoadingController,  private modal:ModalController) {
    this.events.publish('user:login');
    this.currentdate = new Date();
      this.menu.enable(true);
  }
  ionViewDidLoad() {
    this.getProfile();
    this.showLevel();
    this.getNotification();
   
    // this.loading.dismiss();
    this.startTime(0);
    this.genChart();
    // this.dummychart();
    this.getEarnings();
    
  }
  /*
  Chart Generator with custom data
  */ 
  dummychart(chdata,month,container,chartbg,chartbdr,enablestatus=1,smallheight=0){
    
    var cname=this.customerprovider.data.fname+' '+this.customerprovider.data.lname;
    var acct_bal = parseFloat(this.customerprovider.data.acct_bal);
   
    // console.log('dumdum',acct_bal);
    var nf = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var fullmonthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    HighCharts.chart(container, {
      chart: {
          type: 'areaspline',
          width: 580,
          height: smallheight==1?120:300
      },
      title: {
        text:  (function () { return smallheight==1?'':cname+ ', youve earned it since the last application '+ nf.format(acct_bal) +'.'  }()),
        style: {
          fontSize: '12px'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: -5,
        y: -5,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#dddddd',
        borderColor: chartbdr
      },
      xAxis: {
          categories: (function () {
            var data = [];
            for (let item in chdata) {
              data.push([item]);
            }
            return data;
          }()),
          labels:{
            enabled: enablestatus==0?false:true
          }
          // plotBands: [{ // visualize the weekend
          //     from: 4.5,
          //     to: 6.5,
          //     color: 'rgba(68, 170, 213, .2)'
          // }]
      },
      yAxis: {
          title: {
              text: smallheight==1?null:'Earnings'
          },
          labels:{
            enabled: enablestatus==0?false:true
          }
          
               
      },
      tooltip: {
        valueDecimals: 3,
        formatter: function () {
          return '<b>' + 'Earnings' + '</b><br/>' +
            this.x + '.' + mS[month-1] + ' ' + ': ' + '<b>' + nf.format(this.y) + '</b><br/>';
        },
        valueSuffix: ' €',
        shared: true
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          },
          
      },
      series: [{
        name: smallheight==1? fullmonthname[month-1]:' Earnings' ,
        data: (function () {
          var data = [];
          for (let item in chdata) {
            // pushprice = nf.format(chdata[item]).;
            //console.log(pushprice);
            data.push([
              chdata[item]
            ]);
          }
          return data;
        }()),
        color: chartbg
      }]
  });

  }
  containerEnable(containerid: number) {
    
        switch (containerid) {
          case 1:
          this.chartcontainer.first = true;
          this.chartcontainer.second = false;
          this.chartcontainer.third = false;
          this.chartcontainer.fourth = false;
            break;
          case 2:
          this.chartcontainer.first = true;
          this.chartcontainer.second = true;
          this.chartcontainer.third = false;
          this.chartcontainer.fourth = false;
            break;
          case 3:
          this.chartcontainer.first = true;
          this.chartcontainer.second = true;
          this.chartcontainer.third = true;
          this.chartcontainer.fourth = false;
            break;
          case 4:
          this.chartcontainer.first = true;
          this.chartcontainer.second = true;
          this.chartcontainer.third = true;
          this.chartcontainer.fourth = true;
            break;
        }
        return;
      }
getNotification(){
  localStorage.setItem('lastrecordid',  '0');
  this.customerprovider.getFirstNotification(localStorage.getItem('user_id')).then((result) => {
    if(Utils.notifications(result['notifications']) !== undefined) {
      this.notification.push(Utils.notifications(result['notifications']));
    }
    
    console.log('first',this.notification);
    // console.log('tt',this.notification);
  }, (err) => {
    this.loading.dismiss();
    console.log("Observable Instance error :", err)
  });
}

// doInfinite() {

//   this.customerprovider.getLastNotification(localStorage.getItem('user_id')).then((result) => {
//     console.log('lazyload',result['notifications']);
//     this.notification.push(Utils.notifications(result['notifications']));
//     // infiniteScroll.complete();
//     // console.log('tt',this.notification);

//     if (parseInt(localStorage.getItem('stopInfinite')) {
//       // infiniteScroll.enable(false);
//     }
//   }, (err) => {
//     this.loading.dismiss();
//     console.log("Observable Instance error :", err)
//   });

// }
// ionInfinite(){

// }



doInfinite(): Promise<any> {
  console.log('Begin async operation');

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('infi',localStorage.getItem('lastrecordid'));
      this.customerprovider.getLastNotification(localStorage.getItem('user_id')).then((result) => {
        if(Utils.notifications(result['notifications']) !== undefined) {
        this.notification.push(Utils.notifications(result['notifications']));
        } else {
            this.showinfi = false;
        }
        console.log('lazyload',this.notification);
        // infiniteScroll.complete();
        // console.log('tt',this.notification);
      }, (err) => {
        this.loading.dismiss();
        console.log("Observable Instance error :", err)
      });
      console.log('Async operation has ended');
      resolve();
    }, 500);
  })
}
getEarnings(){
  this.customerprovider.getEarnings(localStorage.getItem('user_id')).then((result) => {
    var nf = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
    this.viewdata.acct_bal = nf.format(parseFloat(result['rewards'].un_withdrawn_rewards_of_current_month ));
    this.viewdata.earning = nf.format(parseFloat(result['rewards'].vendor_paid_reward ) - parseFloat(result['rewards'].withdrawn_rewards_of_current_month ));
  }, (err) => {
    this.loading.dismiss();
    console.log("Observable Instance error :", err)
  });
}
getProfile() {
  /* Service */
  this.showLoader();
  this.customerprovider.getProfile(localStorage.getItem('user_id')).then((result) => {
    this.viewdata['fname']= result['user'].user.first_name;
    this.viewdata['lname'] = result['user'].user.last_name;
    this.viewdata['profileimg'] =result['user'].images.medium;
    this.viewdata['referralCode']= result['user'].user.referral_code;
  }, (err) => {
    this.loading.dismiss();
    console.log("Observable Instance error :", err)
  });
}
  showLevel() {
    /* Service */
    this.customerprovider.getLevel(localStorage.getItem('user_id')).then((result) => {
      this.level = parseFloat(this.customerprovider.data.level);
      this.loading.dismiss(); 
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });
  }
  genChart() {
    /* Service */
    this.customerprovider.getMonthlyEarnings(localStorage.getItem('user_id')).then((result) => {
      var chardata_arr:Array<any>=[];
      var month_arr:Array<any>=[];
      for(let item in result['monthly_earnings']){
        chardata_arr.push(result['monthly_earnings'][item].earnings);
        month_arr.push(result['monthly_earnings'][item].month)
        // this.charcontainer.first=item;
      }
      // console.log('chartdata_arr',chardata_arr);
      // console.log('month_arr',month_arr);
      console.log('Chardata_arrLength',chardata_arr.length);
      // var chdata= result['monthly_earnings'][0].earnings;
      // var month =result['monthly_earnings'][0].month
      // result['monthly_earnings'][0].earnings, result['monthly_earnings'][0].month
      this.containerEnable(chardata_arr.length);
      chardata_arr.length == 1 ?
      this.dummychart(chardata_arr[0], month_arr[0], 'container1', this.color.orange, this.color.orangebdr, 1, 0) :
      chardata_arr.length == 2 ?
        (this.dummychart(chardata_arr[0], month_arr[0], 'container1', this.color.orange, this.color.orangebdr, 1, 0),
          this.dummychart(chardata_arr[1], month_arr[1], 'container2', this.color.green, this.color.greenbdr, 0, 1)) :
        chardata_arr.length == 3 ?
          (this.dummychart(chardata_arr[0], month_arr[0], 'container1', this.color.orange, this.color.orangebdr, 1, 0),
            this.dummychart(chardata_arr[1], month_arr[1], 'container2', this.color.green, this.color.greenbdr, 0, 1),
            this.dummychart(chardata_arr[2], month_arr[2], 'container3', this.color.red, this.color.redbdr, 0, 1)) :
          chardata_arr.length == 4 ?
            (this.dummychart(chardata_arr[0], month_arr[0], 'container1', this.color.orange, this.color.orangebdr, 1, 0),
              this.dummychart(chardata_arr[1], month_arr[1], 'container2', this.color.green, this.color.greenbdr, 0, 1),
              this.dummychart(chardata_arr[2], month_arr[2], 'container3', this.color.red, this.color.redbdr, 0, 1),
              this.dummychart(chardata_arr[3], month_arr[3], 'container4', this.color.purple, this.color.purplebdr, 0, 1)) : '';
      // nechart( chdata,month);
    }, (err) => {
      this.loading.dismiss();
      console.log("Observable Instance error :", err)
    });

  }
  // var func = (x, y) => { return x + y; };
  // this.nechart = (chdata, month) => {
  //   /* Chart Start*/
  //   var cname=this.customerprovider.data.fname+' '+this.customerprovider.data.lname;
  //   var acct_bal = parseFloat(this.customerprovider.data.acct_bal);
  //   var nf = Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
  //   var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
  //   this.options = {
 
  //     chart: {
  //       type: 'areaspline',
  //       width: 580,
  //       height: 300
  //     },
  //     title: {
  //       text:  (function () { return cname+ ', youve earned it since the last application '+ nf.format(acct_bal) +'.'  }()),
  //       style: {
  //         fontSize: '12px'
  //       }
  //     },
  //     legend: {
  //       layout: 'vertical',
  //       align: 'left',
  //       verticalAlign: 'top',
  //       x: -5,
  //       y: -5,
  //       floating: true,
  //       borderWidth: 1,
  //       backgroundColor: '#dddddd',
  //       borderColor: 'rgb(238, 119, 14)',
  //       fontSize: '10px'
  //     },
  //     xAxis: {
  //       categories: (function () {
  //         var data = [];
  //         for (let item in chdata) {
  //           data.push([item]);
  //         }
  //         return data;
  //       }())
  //       ,
  //       // plotBands: [{ // visualize the weekend
  //       //     from: 4.5,
  //       //     to: 6.5,
  //       //     color: 'rgba(68, 170, 213, .2)'
  //       // }]
  //     },
  //     yAxis: {
  //       title: {
  //         text: 'Earnings'
  //       }
  //     },
  //     tooltip: {
  //       valueDecimals: 3,
  //       formatter: function () {
  //         return '<b>' + 'Earnings' + '</b><br/>' +
  //           this.x + '.' + mS[month] + ' ' + ': ' + '<b>' + nf.format(this.y) + '</b><br/>';
  //       },
  //       valueSuffix: ' €',
  //       shared: true
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     plotOptions: {
  //       areaspline: {
  //         fillOpacity: 0.5
  //       },
  //       series: {
  //         fillColor: {
  //           linearGradient: [0, 0, 0, 300],
  //           stops: [
  //             [0, 'rgba(300, 80, 30,1)'],
  //             [1, 'rgba(238, 119, 14,0.2)']
  //           ]
  //         },
  //         borderColor: 'rgba(238, 119, 14,0.2)'
  //       }
  //     },
  //     series: [{
  //       name: 'Earnings',
  //       data: (function () {
  //         var data = [];
  //         for (let item in chdata) {
  //           // pushprice = nf.format(chdata[item]).;
  //           //console.log(pushprice);
  //           data.push([
  //             chdata[item]
  //           ]);
  //         }
  //         return data;
  //       }()),
  //       color: '#cf6f07'
  //     }],
  //     responsive: {
  //       rules: [{
  //         condition: {
  //           maxWidth: 700
  //         }
  //       }]
  //     }
  //   }
  //   /* Chart End */
  // }
  startTime(counter?:number) {
    var t;
    
    t = setTimeout(() => {

      if (counter > this.level)  { clearTimeout(t); }
      else {
        counter++;  
        this.loadProgress = counter * 10;
       
       this.startTime(counter);
      }
    }, 100);
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }
  transtobankModal(){
    const transtobank = this.modal.create('TanstobankmodalPage');
    transtobank.present();
  }
  openbusiness(){
    const openbusiness = this.modal.create('OpenbusinessmodalPage');
    openbusiness.present();
  }
  invitefriendmodal(){
    const invitefriend = this.modal.create('InvitefriendmodalPage');
    invitefriend.present();
  }
  searchfriendmodal(){
    const searchfriend = this.modal.create('SearchfriendmodalPage');
    searchfriend.present();
  }
  doRefresh(refresher) {
    this.notification.length=0;
    this.getProfile();
    this.genChart();
    this.getEarnings();
    this.getNotification();
    this.showLevel();
    localStorage.setItem('stopInfinite', '0');
    this.showinfi =true;

    setTimeout(() => {
      
      this.loading.dismiss();
  
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
