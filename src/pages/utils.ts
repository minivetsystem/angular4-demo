import * as role from './role.constants';
import * as notify from './Facade';
import * as notifywhen from './notify';
import { NavController } from 'ionic-angular';
export class Utils {
    /**
     * Rolewise Dashboard Redirection
    */
    public static redirectrolewise(roleid, page:NavController) {
        switch (roleid) {
            case role.SITEADMIN:
                page.setRoot('SiteadminPage');
                break;
            case role.ADMIN_STAFF:
                page.setRoot('AdminstaffPage');
                break;
            case role.VENDOR:
                page.setRoot('VendorPage');
                break;
            case role.COMPANYSTAFF:
                if(localStorage.getItem('company_role_id') == roleid) {
                    page.setRoot('SellerpagePage')
                } else {
                    page.setRoot('CompanystaffPage');
                }
                break;
            case role.CUSTOMER:
            
                page.setRoot('CustomerPage');
                break;
        }
    }
    public static isVendor(){
        var roleid: number = parseInt(localStorage.getItem('role_id'));
        return role.VENDOR == roleid? true: false;
    }
    public static isCompanyStaff(){
        var roleid: number = parseInt(localStorage.getItem('role_id'));
        return role.COMPANYSTAFF == roleid? true: false;
    }

    public static toHome(apiToken:any,page:NavController){
        if(apiToken != localStorage.getItem('token')){
            page.setRoot('LoginPage');
        }
    }
    /**
     * UserMenu
     */
    public static getUserMenu() {
        var pages: any;
        var token: string = localStorage.getItem('token');
        var roleid: number = parseInt(localStorage.getItem('role_id'));
        console.log('roleidstat',roleid);
        if (token !== null || typeof token !== "undefined" || token !== "undefined") {
            switch (roleid) {
                case role.SITEADMIN:
                    pages = [
                        { title: 'Home', component: 'HomePage' },
                        { title: 'Community', component: 'CommunityPage' },
                        
                    ];
                    break;
                case role.ADMIN_STAFF:
                    pages = [
                        { title: 'Home', component: 'HomePage' },
                        { title: 'Community', component: 'CommunityPage' },
                    ];
                    break;
                case role.VENDOR:
                    pages = [
                        { title: 'Company', component: 'VendorPage' },
                    ];
                    break;
                case role.COMPANYSTAFF:
                    pages = [
                        { title: 'Home', component: 'HomePage' },
                        { title: 'Company', component: 'CompanystaffPage' },
                        
                    ];
                    break;
                case role.CUSTOMER:
                    pages = [
                        { title: 'Home', component: 'HomePage' },
                        { title: 'Community', component: 'CommunityPage' },
                        { title: 'Offers', component: 'OffersearchPage' },
                        { title: 'Help', component: 'HelpPage' },
                    ];
                    break;
            }
        } 
       
        
        console.log('statmenu',pages);
        return pages;
    }
    /**
     * Notification generator
     */
    public static notifications(jsonData) {
        console.log('jsondatajas');
        console.log('jsondatajas',jsonData);
        if (jsonData.length == 0 || typeof jsonData === undefined || jsonData === '' || jsonData === 'undefined' || jsonData === null) {
            localStorage.setItem('stopInfinite', '1');
        } else {
            var userid = localStorage.getItem('user_id');

            var counter: number = 0;
            if (notifyrows === undefined || typeof notifyrows === undefined) {
                var notifyrows = [];
            }
            var activity:number;
            var modifier:any;
            // var suffix:any;
            var verb:any;
            var avatarsrc:any;
          
            for (let item in jsonData) {
                var nobj = { notify: '', avatarsrc: '', modif: '' };
                 activity = parseInt(jsonData[item].activity);
                 modifier = (userid == jsonData[item].user_id) ? "You " : jsonData[item].user.first_name;
                 verb = (userid == jsonData[item].user_id) ? " have " : " has ";
                var suffix = jsonData[item].comment !== null
                    ? jsonData[item].comment.offer.offer_title :
                        jsonData[item].offer !== null ?
                         jsonData[item].offer.offer_title :
                        jsonData[item].friend !== null ? jsonData[item].friend.first_name : ".";
                avatarsrc = jsonData[item].user.images !== null ? jsonData[item].user.images.medium : "";
                switch (activity) {
                    case notifywhen.NewRegistration:
                        notify.setMsg.msgfor = notifywhen.NewRegistration;
                        nobj.modif = '1';
                        nobj.notify = jsonData[item].user.first_name;
                        nobj.avatarsrc = '';
                        break;
                    case notifywhen.NewFriend:
                        notify.setMsg.msgfor = notifywhen.NewFriend;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.NewFriendOfFriend:
                        notify.setMsg.msgfor = notifywhen.NewFriendOfFriend;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.UserOrFriendGotNewLevel:
                        notify.setMsg.msgfor = notifywhen.UserOrFriendGotNewLevel;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.NewPost:
                        notify.setMsg.msgfor = notifywhen.NewPost;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.ProfileUpdate:
                        notify.setMsg.msgfor = notifywhen.ProfileUpdate;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.ProfilePictureUpdate:
                        notify.setMsg.msgfor = notifywhen.ProfilePictureUpdate;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.CommentOnOffer:
                        notify.setMsg.msgfor = notifywhen.CommentOnOffer;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.VendorPostOffer:
                        notify.setMsg.msgfor = notifywhen.VendorPostOffer;
                        nobj.modif = modifier;
                        nobj.notify = verb + notify.getMsg.print() + " " + suffix;
                        nobj.avatarsrc = avatarsrc;
                        break;
                    case notifywhen.AdminAddedTip:
                        nobj.modif = jsonData[item].tip != null ?jsonData[item].tip.name:'' ;
                        nobj.notify =  jsonData[item].tip != null ?jsonData[item].tip.description:'';
                        nobj.avatarsrc = '';
                        break;
                }
                notifyrows.push(nobj);
                counter++;
            }

            if (jsonData[counter - 1].id !== localStorage.getItem('lastrecordid')) {
                localStorage.setItem('lastrecordid', jsonData[counter - 1].id);
                counter = 0;
                return notifyrows;
            }
        }

        return;

    }
  
}