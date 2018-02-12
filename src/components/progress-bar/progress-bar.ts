import { Component, Input } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
    @Input('progress') progress;
    language: any;
    constructor(public translate: TranslateService, public platform: Platform) {
        let value = localStorage.getItem('language');
        this.language = value == 'en' ? 'en' : 'si';
        this.changeLanguage(this.language);
    }
    changeLanguage(language) {
        console.log(language);
        if (language == 'si') {
            this.translate.use('si');
            this.platform.setDir('ltr', true);
        } else if (language == 'ar') {
            this.platform.setDir('rtl', true);
            this.translate.use('ar');
        }
        else {
            this.translate.use('en');
            this.platform.setDir('ltr', true);
        }

    }

}
