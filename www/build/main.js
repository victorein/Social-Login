webpackJsonp([3],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_loading_loading__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegisterPage = /** @class */ (function () {
    function RegisterPage(platform, camera, file, filePath, actionSheetCtrl, toastCtrl, afAuth, fb, navCtrl, navParams, loadingProvider) {
        this.platform = platform;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingProvider = loadingProvider;
        this.lastImage = null;
        this.regData = { name: '', mail: '', pass: '', cnfpass: '' };
        this.passwordtype = 'password';
        this.cnfpasswordtype = 'password';
        this.cnfpasseye = 'eye';
        this.passeye = 'eye';
        this.authForm = this.fb.group({
            'username': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'email': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'cnfpass': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        this.username = this.authForm.controls['username'];
        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
        this.cnfpass = this.authForm.controls['cnfpass'];
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.doRegister = function (regData) {
        var _this = this;
        if (regData.pass == regData.cnfpass) {
            this.loadingProvider.startLoading();
            this.afAuth.auth.createUserWithEmailAndPassword(regData.mail, regData.pass)
                .then(function (result) {
                _this.loadingProvider.stopLoading();
                _this.presentToast('Ragister Successfully..!');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
            }).catch(function (err) {
                _this.loadingProvider.stopLoading();
                console.log('err', err);
                _this.presentToast(err);
            });
        }
        else {
            this.presentToast('Both password are not matched!');
        }
    };
    RegisterPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    RegisterPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            alert('imagePath ' + imagePath);
            _this.cropImagePath = imagePath;
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    RegisterPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    RegisterPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        alert('pathName->>' + namePath + '->currentName-->' + currentName + '->newFileName-->' + newFileName);
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    RegisterPage.prototype.moveToLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
    };
    RegisterPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    RegisterPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    RegisterPage.prototype.managePassword = function () {
        if (this.passwordtype == 'password') {
            this.passwordtype = 'text';
            this.passeye = 'eye-off';
        }
        else {
            this.passwordtype = 'password';
            this.passeye = 'eye';
        }
    };
    RegisterPage.prototype.managecnfPassword = function () {
        if (this.cnfpasswordtype == 'password') {
            this.cnfpasswordtype = 'text';
            this.cnfpasseye = 'eye-off';
        }
        else {
            this.cnfpasswordtype = 'password';
            this.cnfpasseye = 'eye';
        }
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/www/social/src/pages/register/register.html"*/'\n\n<ion-content class="bg-img">\n  <div class="main-content">\n    <div padding text-center class="container-logo">\n      <img src="assets/imgs/logo.png">\n    </div>\n\n    <div padding  style="width: 100%;">\n    <form [formGroup]="authForm">\n      <div class="errormsg">\n        <div *ngIf="username.errors && username.touched">\n          <p>Username is required.</p>\n        </div>\n        <div class="error-box" *ngIf="email.errors && email.touched">\n          <p>Email is required.</p>\n        </div>\n        <div *ngIf="password.errors && password.touched">\n          <p>Password is required.</p>\n        </div>\n        <div *ngIf="cnfpass.errors && cnfpass.touched">\n          <p>Confirm password is required.</p>\n        </div>\n      </div>\n      <ion-list>\n        <ion-item padding-right>\n          <ion-label><ion-icon ios="ios-person" md="md-person"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="regData.name" [formControl]="username" id="username" type="text" required placeholder="Username *"></ion-input>\n        </ion-item>\n\n         <ion-item>\n          <ion-label><ion-icon ios="ios-mail" md="md-mail"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="regData.mail" [formControl]="email" id="email" type="email" required placeholder="Email *"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label><ion-icon ios="ios-unlock" md="md-unlock"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="regData.pass" [formControl]="password" id="password" type="{{passwordtype}}" required placeholder="Password *"></ion-input>\n          <button ion-button clear class="eye-icon-btn" type="button" item-right (click)="managePassword()"><ion-icon name="{{passeye}}"></ion-icon></button>\n        </ion-item>\n\n        <ion-item>\n          <ion-label><ion-icon ios="ios-unlock" md="md-unlock"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="regData.cnfpass" [formControl]="cnfpass" id="cnfpass" type="{{cnfpasswordtype}}" required placeholder="Confirm Password *"></ion-input>\n          <button ion-button clear class="eye-icon-btn" type="button" item-right (click)="managecnfPassword()"><ion-icon name="{{cnfpasseye}}"></ion-icon></button>\n        </ion-item>\n      </ion-list>\n      <button ion-button full color="dark" [disabled]="!authForm.valid" (click)="doRegister(regData)">Sign up</button>\n    </form>\n    <div class="sepretor-or" padding-horizontal> <p>Or</p></div>\n    <div padding text-center class="form-bottom-text">\n        <label>Sign up with </label>\n        </div>\n    <div text-center class="socialLogin" padding>\n      <button ion-button class="google" (click)="socialLogin(\'google\')"><ion-icon name="logo-google" style="margin-right: 12px;"></ion-icon>Google</button>\n      <button ion-button class="facebook" (click)="socialLogin(\'facebook\')"><ion-icon name="logo-facebook" style="margin-right: 12px;"></ion-icon> Facebook</button>\n    </div>\n    <div padding text-center class="form-bottom-text">\n      <label> Already have an Account? <a href="javascript:void(0);" (click)="moveToLogin()"> Sign In </a> </label>\n    </div>\n  </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/www/social/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_loading_loading__["a" /* LoadingProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ForgetPage = /** @class */ (function () {
    function ForgetPage(navCtrl, navParams, fb, afAuth, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.afAuth = afAuth;
        this.toast = toast;
        this.forgetData = { email: '' };
        this.authForm = this.fb.group({
            'email': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
        this.email = this.authForm.controls['email'];
        this.fireAuth = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth();
    }
    ForgetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPage');
    };
    ForgetPage.prototype.forgetPassword = function (email) {
        var _this = this;
        this.resetPassword(email)
            .then(function (result) {
            _this.toast.create({
                message: 'Link was send successfully!',
                duration: 3000,
                position: 'top'
            }).present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }, function (error) {
            _this.toast.create({
                message: error.message,
                duration: 5000,
                position: 'top'
            }).present();
        });
    };
    ForgetPage.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    ForgetPage.prototype.moveToLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    ForgetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forget',template:/*ion-inline-start:"/www/social/src/pages/forget/forget.html"*/'\n\n<ion-content class="bg-img">\n  <div class="main-content">\n    <div padding text-center class="container-logo" margin-bottom >\n      <img src="assets/imgs/logo.png">\n    </div>\n    <div padding text-center class="form-bottom-text">\n      <h3> Reset Password</h3>\n      <label>Enter the email address associated with your account,and review your email.</label>\n    </div>\n    <div text-center class="socialLogin" padding></div>\n      <div padding style="width: 100%;">\n      <form [formGroup]="authForm" (ngSubmit)="forgetPassword(forgetData.email)">\n\n        <div class="errormsg">\n          <div *ngIf="email.errors && email.touched"><p>Email is required.</p></div>\n        </div>\n\n        <ion-list>\n          <ion-item >\n            <ion-label><ion-icon ios="ios-mail" md="md-mail"></ion-icon></ion-label>\n            <ion-input [(ngModel)]="forgetData.email" [formControl]="email" id="email" type="email" required placeholder="Email *"></ion-input>\n          </ion-item>\n        </ion-list>\n        <button type="submit" ion-button full color="dark" [disabled]="!authForm.valid">Send</button>\n      </form>\n\n      <div padding text-center class="form-bottom-text">\n        <label>\n          <a href="javascript:void(0);" (click)="moveToLogin()">Back to Login</a>\n        </label>\n      </div>\n\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/www/social/src/pages/forget/forget.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], ForgetPage);
    return ForgetPage;
}());

//# sourceMappingURL=forget.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 124;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/forget/forget.module": [
		364,
		2
	],
	"../pages/login/login.module": [
		362,
		1
	],
	"../pages/register/register.module": [
		363,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(afAuth, navCtrl, navParam, loadingProvider) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.loadingProvider = loadingProvider;
        this.userData = this.navParam.get('res');
        console.log('userData', this.userData);
    }
    HomePage.prototype.logout = function () {
        this.loadingProvider.startLoading();
        this.afAuth.auth.signOut();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        this.loadingProvider.stopLoading();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/www/social/src/pages/home/home.html"*/'<!-- <ion-header class="header-main">\n  <ion-navbar color="dark">\n    <ion-title>\n    {{userData.email}}\n    </ion-title>\n    <ion-buttons>\n	    <button ion-button clear (click)="logout()">\n	      	<ion-icon name="md-exit"></ion-icon>\n	    </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-header class="header-main">\n  <ion-navbar >\n    <ion-title >\n    <p class="color-txt">{{userData.email}}</p>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only class="header-btn" (click)="logout()">\n        <ion-icon name="md-log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h2></h2><ion-card>\n\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="assets/imgs/_bg.jpg">\n    </ion-avatar>\n    <h2>Lorem Ipsum</h2>\n    <p>November 5, 1955</p>\n  </ion-item>\n\n  <img src="assets/imgs/cam.jpg">\n\n  <ion-card-content>\n    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button icon-left clear small>\n        <ion-icon name="thumbs-up"></ion-icon>\n        <div>12 Likes</div>\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button icon-left clear small>\n        <ion-icon name="text"></ion-icon>\n        <div>4 Comments</div>\n      </button>\n    </ion-col>\n    <ion-col center text-center>\n      <ion-note>\n        11h ago\n      </ion-note>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n\n\n<ion-card>\n\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="assets/imgs/_bg.jpg">\n    </ion-avatar>\n    <h2>John doe</h2>\n    <p>May 12, 1984</p>\n  </ion-item>\n\n  <img src="assets/imgs/glasses.jpg">\n\n  <ion-card-content>\n    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button color="primary" clear small icon-start>\n        <ion-icon name=\'thumbs-up\'></ion-icon>\n        30 Likes\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button color="primary" clear small icon-start>\n        <ion-icon name=\'text\'></ion-icon>\n        64 Comments\n      </button>\n    </ion-col>\n    <ion-col align-self-center text-center>\n      <ion-note>\n        30yr ago\n      </ion-note>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n\n\n<ion-card>\n\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="assets/imgs/_bg.jpg">\n    </ion-avatar>\n    <h2>Dr. Lorem Ipsum</h2>\n    <p>June 28, 1990</p>\n  </ion-item>\n\n  <img src="assets/imgs/guitar.jpg">\n\n  <ion-card-content>\n    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>\n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button color="primary" clear small icon-start>\n        <ion-icon name=\'thumbs-up\'></ion-icon>\n        46 Likes\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button color="primary" clear small icon-start>\n        <ion-icon name=\'text\'></ion-icon>\n        66 Comments\n      </button>\n    </ion-col>\n    <ion-col align-self-center text-center>\n      <ion-note>\n        2d ago\n      </ion-note>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/www/social/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__["a" /* LoadingProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(255);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_register_register__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_forget_forget__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_loading_loading__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















//Angular Firebase Module




var firebaseConfig = {
    apiKey: "AIzaSyAXjl9L_uUGLHYNGX0BvqsUx_VExs8zaeY",
    authDomain: "fir-auth-bdcc0.firebaseapp.com",
    databaseURL: "https://fir-auth-bdcc0.firebaseio.com",
    projectId: "fir-auth-bdcc0",
    storageBucket: "fir-auth-bdcc0.appspot.com",
    messagingSenderId: "544712685938"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_forget_forget__["a" /* ForgetPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forget/forget.module#ForgetPageModule', name: 'ForgetPage', segment: 'forget', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["a" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_forget_forget__["a" /* ForgetPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_loading_loading__["a" /* LoadingProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { HomePage } from '../pages/home/home';

var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/www/social/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/www/social/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forget_forget__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_loading_loading__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(183);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = /** @class */ (function () {
    function LoginPage(toastCtrl, fb, navCtrl, navParams, afAuth, loadingProvider, facebook) {
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.loadingProvider = loadingProvider;
        this.facebook = facebook;
        this.loginData = { email: '', password: '' };
        this.passwordtype = 'password';
        this.passeye = 'eye';
        this.authForm = this.fb.group({
            'email': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    /*------------------
    --------------------*/
    // For User Login
    LoginPage.prototype.userLogin = function (loginData) {
        var _this = this;
        this.loadingProvider.startLoading();
        console.log('loginData', loginData);
        this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(function (result) {
            console.log('result >>', result);
            _this.loadingProvider.stopLoading();
            _this.moveToHome(result);
        }).catch(function (err) {
            _this.loadingProvider.stopLoading();
            console.log('err', err);
            _this.presentToast(err);
        });
    };
    // For Social Login
    LoginPage.prototype.socialLogin = function (isLogin) {
        var _this = this;
        if (isLogin == "facebook") {
            this.loadingProvider.startLoading();
            var provider = new __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth.FacebookAuthProvider();
            __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().signInWithRedirect(provider).then(function () {
                _this.loadingProvider.startLoading();
                __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().getRedirectResult().then(function (result) {
                    console.log('result', result);
                    _this.moveToHome(result.user);
                    _this.loadingProvider.stopLoading();
                }).catch(function (error) {
                    this.loadingProvider.stopLoading();
                    alert(error.message);
                    console.log('error', error);
                });
                _this.loadingProvider.stopLoading();
            }).catch(function (error) {
                this.loadingProvider.stopLoading();
                alert(error.message);
                console.log('error', error);
            });
            this.loadingProvider.stopLoading();
        }
        else if (isLogin == "google") {
            this.loadingProvider.startLoading();
            var provider = new __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth.GoogleAuthProvider();
            __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().signInWithRedirect(provider).then(function () {
                _this.loadingProvider.startLoading();
                __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().getRedirectResult().then(function (result) {
                    console.log('result', result);
                    _this.loadingProvider.stopLoading();
                    _this.moveToHome(result.user);
                }).catch(function (error) {
                    this.loadingProvider.stopLoading();
                    alert(error.message);
                    console.log('error', error);
                });
                _this.loadingProvider.stopLoading();
            }).catch(function (error) {
                this.loadingProvider.stopLoading();
                alert(error.message);
                console.log('error', error);
            });
            this.loadingProvider.stopLoading();
        }
        else if (isLogin == "twitter") {
            // this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
            // 	.then(res => {
            // 		 this.moveToHome(res);
            // 	})
            // 	.catch(err => console.log('err',err));
        }
        else if (isLogin == "github") {
            // this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
            // 	.then(res => {
            // 		 this.moveToHome(res);
            // 	})
            // 	.catch(err => console.log('err',err));
        }
    };
    // Move to register page
    LoginPage.prototype.moveToRegister = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    //Move to Home Page
    LoginPage.prototype.moveToHome = function (res) {
        console.log('res', res);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], { res: res });
    };
    LoginPage.prototype.presentToast = function (err) {
        var toast = this.toastCtrl.create({
            message: err.message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    LoginPage.prototype.presentAlert = function (err) {
    };
    LoginPage.prototype.managePassword = function () {
        if (this.passwordtype == 'password') {
            this.passwordtype = 'text';
            this.passeye = 'eye-off';
        }
        else {
            this.passwordtype = 'password';
            this.passeye = 'eye';
        }
    };
    LoginPage.prototype.forgetpassword = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__forget_forget__["a" /* ForgetPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/www/social/src/pages/login/login.html"*/'<!--\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>\n    <ion-icon name="md-contact"></ion-icon>\n    &nbsp;Sign In</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content class="bg-img">\n\n  <div class="main-content">\n    <div padding text-center class="container-logo">\n      <img src="assets/imgs/logo.png">\n    </div>\n    <div text-center class="socialLogin" padding>\n      <button ion-button full class="google" (click)="socialLogin(\'google\')"><ion-icon name="logo-google" style="margin-right: 12px;"></ion-icon>Sign in with Google</button>\n      <button ion-button full class="facebook" (click)="socialLogin(\'facebook\')"><ion-icon name="logo-facebook" style="margin-right: 12px;"></ion-icon> Sign in with Facebook</button>\n    </div>\n    <div class="sepretor-or" padding-horizontal> <p>Or</p></div>\n\n    <div padding class="container-bottom">\n    <form [formGroup]="authForm" (ngSubmit)="userLogin(loginData)">\n\n      <div class="errormsg">\n        <div *ngIf="email.errors && email.touched">\n            <p>Email is required.</p>\n        </div>\n        <div *ngIf="password.errors && password.touched">\n            <p>Password is required.</p>\n        </div>\n      </div>\n\n        <ion-list>\n          <ion-item padding-right>\n            <ion-label>\n              <ion-icon ios="ios-mail" md="md-mail"></ion-icon>\n            </ion-label>\n            <ion-input [(ngModel)]="loginData.email" [formControl]="email" id="email" type="text" required placeholder="Email *"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label>\n              <ion-icon ios="ios-unlock" md="md-unlock"></ion-icon>\n            </ion-label>\n              <ion-input [(ngModel)]="loginData.password" [formControl]="password" id="password" type="{{passwordtype}}" required placeholder="Password *"></ion-input>\n            <button ion-button clear class="eye-icon-btn" type="button" item-right (click)="managePassword()"><ion-icon name="{{passeye}}"></ion-icon></button>\n          </ion-item>\n        </ion-list>\n        <button type="submit" ion-button full color="dark" [disabled]="!authForm.valid">Sign In</button>\n    </form>\n    <div padding text-center class="form-bottom-text" ><a href="javascript:void(0);" (click)="forgetpassword()"> Forgot password?</a></div>\n        <div padding text-center class="form-bottom-text">\n          <label>Don\'t have an Account? <a href="javascript:void(0);" (click)="moveToRegister()">Sign up</a></label>\n        </div>\n\n  </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/www/social/src/pages/login/login.html"*/,
            providers: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_8__providers_loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoadingProvider = /** @class */ (function () {
    function LoadingProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
    }
    LoadingProvider.prototype.startLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    LoadingProvider.prototype.stopLoading = function () {
        var _this = this;
        setTimeout(function () {
            _this.loading.dismiss();
        }, 100);
    };
    LoadingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoadingProvider);
    return LoadingProvider;
}());

//# sourceMappingURL=loading.js.map

/***/ })

},[235]);
//# sourceMappingURL=main.js.map