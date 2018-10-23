(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/actions.ts":
/*!****************************!*\
  !*** ./src/app/actions.ts ***!
  \****************************/
/*! exports provided: StartUpdate, LoadContacts, DelContact, UpdContact, AddContact, SuccessUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartUpdate", function() { return StartUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadContacts", function() { return LoadContacts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelContact", function() { return DelContact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdContact", function() { return UpdContact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContact", function() { return AddContact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessUpdate", function() { return SuccessUpdate; });
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var StartUpdate = /** @class */ (function () {
    function StartUpdate() {
        this.type = 'StartUpdate';
    }
    StartUpdate.prototype.reducer = function (state) {
        return __assign({}, state, { isUpdating: true, error: null });
    };
    return StartUpdate;
}());

var LoadContacts = /** @class */ (function () {
    function LoadContacts(contacts) {
        this.contacts = contacts;
        this.type = 'LoadContacts';
    }
    LoadContacts.prototype.reducer = function (state) {
        return __assign({}, state, { contacts: this.contacts });
    };
    return LoadContacts;
}());

var DelContact = /** @class */ (function () {
    function DelContact(index) {
        this.index = index;
        this.type = 'DelContact';
    }
    DelContact.prototype.reducer = function (state) {
        var olds = state.contacts;
        var i = this.index;
        var contacts = olds.slice(0, i).concat(olds.slice(i + 1));
        return __assign({}, state, { contacts: contacts });
    };
    return DelContact;
}());

var UpdContact = /** @class */ (function () {
    function UpdContact(index, contact) {
        this.index = index;
        this.contact = contact;
        this.type = 'UpdContact';
    }
    UpdContact.prototype.reducer = function (state) {
        var olds = state.contacts;
        var i = this.index;
        var contacts = olds.slice(0, i).concat([this.contact], olds.slice(i + 1));
        return __assign({}, state, { contacts: contacts });
    };
    return UpdContact;
}());

var AddContact = /** @class */ (function () {
    function AddContact(contact) {
        this.contact = contact;
        this.type = 'AddContact';
    }
    AddContact.prototype.reducer = function (state) {
        var _this = this;
        var olds = state.contacts;
        var i = olds.findIndex(function (contact) {
            return contact.name > _this.contact.name;
        });
        if (i < 0) {
            i = olds.length;
        }
        var contacts = olds.slice(0, i).concat([this.contact], olds.slice(i));
        return __assign({}, state, { contacts: contacts });
    };
    return AddContact;
}());

var SuccessUpdate = /** @class */ (function () {
    function SuccessUpdate() {
        this.type = 'SuccessUpdate';
    }
    SuccessUpdate.prototype.reducer = function (state) {
        return __assign({}, state, { isUpdating: false });
    };
    return SuccessUpdate;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contacts/contacts.component */ "./src/app/contacts/contacts.component.ts");
/* harmony import */ var _contact_detail_contact_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-detail/contact-detail.component */ "./src/app/contact-detail/contact-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: 'detail', component: _contact_detail_contact_detail_component__WEBPACK_IMPORTED_MODULE_3__["ContactDetailComponent"] },
    { path: 'detail/:id', component: _contact_detail_contact_detail_component__WEBPACK_IMPORTED_MODULE_3__["ContactDetailComponent"] },
    { path: 'contacts', component: _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_2__["ContactsComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>{{title}}</h1>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'contact-list';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contacts/contacts.component */ "./src/app/contacts/contacts.component.ts");
/* harmony import */ var _contact_detail_contact_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact-detail/contact-detail.component */ "./src/app/contact-detail/contact-detail.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./reducer */ "./src/app/reducer.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_4__["ContactsComponent"],
                _contact_detail_contact_detail_component__WEBPACK_IMPORTED_MODULE_5__["ContactDetailComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModule"].forRoot(),
                _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["StoreModule"].forRoot({ state: _reducer__WEBPACK_IMPORTED_MODULE_10__["reducer"] })
            ],
            providers: [],
            bootstrap: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/contact-detail/contact-detail.component.css":
/*!*************************************************************!*\
  !*** ./src/app/contact-detail/contact-detail.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/contact-detail/contact-detail.component.html":
/*!**************************************************************!*\
  !*** ./src/app/contact-detail/contact-detail.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2 *ngIf=\"contactId\">\n    Editar Contato\n  </h2>\n  <h2 *ngIf=\"!contactId\">\n    Criar Contato\n  </h2>\n  <form [formGroup]=\"contactForm\">\n    <div class=\"form-group\">\n      <label>\n        Nome\n      </label>\n      <input class=\"form-control\" formControlName=\"name\" placeholder=\"nome\" required>\n    </div>\n    <div formArrayName=\"fields\" *ngFor=\"let field of contactFields.controls; let i=index\">\n      <div class=\"form-row\" [formGroupName]=\"i\">\n        <div class=\"col-md-3\">\n          <input class=\"form-control\" formControlName=\"label\" placeholder=\"Tipo de informação\" required>\n        </div>\n        <div class=\"col-md-8\">\n          <input class=\"form-control\" formControlName=\"value\" placeholder=\"Informação\">\n        </div>\n        <div class=\"col-md-1\">\n          <button type=\"button\" class=\"btn danger\" (click)=\"delField(i)\" ngbTooltip=\"Remover\">\n            <i class=\"fas fa-trash\"></i>\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"col-md-11\"></div>\n      <div class=\"col-md-1\">\n        <button class=\"btn primary\" id=\"addFieldButton\" (click)=\"addField()\" ngbTooltip=\"Adicionar informação\">\n          <i class=\"fas fa-plus-circle\"></i>\n        </button>\n      </div>\n    </div>\n    <div class=\"footer\">\n      <div class=\"float-right\">\n        <button id=\"cancelButton\" class=\"btn btn-primary\" (click)=\"router.navigateByUrl('/contacts')\">\n          CANCELAR\n        </button>\n        &emsp;\n        <button id=\"saveButton\" class=\"btn btn-primary\" (click)=\"save()\" [disabled]=\"!contactForm.valid || !contactForm.dirty\">\n          SALVAR\n        </button>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/contact-detail/contact-detail.component.ts":
/*!************************************************************!*\
  !*** ./src/app/contact-detail/contact-detail.component.ts ***!
  \************************************************************/
/*! exports provided: ContactDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactDetailComponent", function() { return ContactDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _contact_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contact.service */ "./src/app/contact.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./src/app/actions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var ContactDetailComponent = /** @class */ (function () {
    function ContactDetailComponent(fb, router, contactService, route, store) {
        this.fb = fb;
        this.router = router;
        this.contactService = contactService;
        this.route = route;
        this.store = store;
        this.contactForm = this.fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fields: this.fb.array([])
        });
    }
    ContactDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // This code should run once and for all,
        // therefore just sample current state don't subscribe
        this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_4__["select"])('state'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).forEach(function (state) {
            var id = _this.contactId =
                _this.route.snapshot.paramMap.get('id');
            var contacts = state.contacts;
            if (!id || contacts.length === 0) {
                return;
            }
            _this.index = contacts.findIndex(function (c) { return c._id === id; });
            var contact = contacts[_this.index];
            _this.contactForm.get('name').setValue(contact.name);
            var fields = contact.fields;
            for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
                var label = _a[_i];
                _this.contactFields.push(_this.fb.group({
                    label: [label, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                    value: [fields[label], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
                }));
            }
        });
    };
    Object.defineProperty(ContactDetailComponent.prototype, "contactFields", {
        get: function () {
            return this.contactForm.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    ContactDetailComponent.prototype.addField = function () {
        this.contactFields.push(this.fb.group({
            label: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            value: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        }));
    };
    ContactDetailComponent.prototype.delField = function (index) {
        this.contactFields.removeAt(index);
    };
    ContactDetailComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fieldsArray, contact, i, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_5__["StartUpdate"]());
                        fieldsArray = this.contactFields.value;
                        contact = {
                            name: this.contactForm.get('name').value,
                            fields: {}
                        };
                        for (i = 0; i < fieldsArray.length; i++) {
                            contact.fields[fieldsArray[i].label] = fieldsArray[i].value;
                        }
                        id = this.contactId;
                        if (!id) return [3 /*break*/, 2];
                        contact._id = this.contactId;
                        return [4 /*yield*/, this.contactService.updContact(contact)];
                    case 1:
                        contact = _a.sent();
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_5__["UpdContact"](this.index, contact));
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.contactService.addContact(contact)];
                    case 3:
                        contact = _a.sent();
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_5__["AddContact"](contact));
                        _a.label = 4;
                    case 4:
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_5__["SuccessUpdate"]());
                        this.router.navigateByUrl('/contacts');
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact-detail',
            template: __webpack_require__(/*! ./contact-detail.component.html */ "./src/app/contact-detail/contact-detail.component.html"),
            styles: [__webpack_require__(/*! ./contact-detail.component.css */ "./src/app/contact-detail/contact-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _contact_service__WEBPACK_IMPORTED_MODULE_3__["ContactService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"]])
    ], ContactDetailComponent);
    return ContactDetailComponent;
}());



/***/ }),

/***/ "./src/app/contact.service.ts":
/*!************************************!*\
  !*** ./src/app/contact.service.ts ***!
  \************************************/
/*! exports provided: ContactService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactService", function() { return ContactService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status */ "./node_modules/http-status/lib/index.js");
/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContactService = /** @class */ (function () {
    function ContactService(http) {
        this.http = http;
        this.contactsUrl = '/api/contacts';
    }
    /** GET contacts from the server */
    ContactService.prototype.getContacts = function () {
        return this.http.get(this.contactsUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('getContacts', [])))
            .toPromise();
    };
    /** DELETE the contact from the server */
    ContactService.prototype.delContact = function (contact) {
        return this.http.delete(this.contactsUrl + "/" + contact._id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('delContact', null)))
            .toPromise();
    };
    /** POST: add a new contact to the server */
    ContactService.prototype.addContact = function (contact) {
        return this.http.post(this.contactsUrl, contact)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('createContact', null)))
            .toPromise();
    };
    /** PUT: update the contact on the server */
    ContactService.prototype.updContact = function (contact) {
        return this.http.put(this.contactsUrl + "/" + contact._id, contact)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('updateContact', null)))
            .toPromise();
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    ContactService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
                if (!navigator.onLine) {
                    alert('Sem conexão com Internet');
                }
                else if (error.status === http_status__WEBPACK_IMPORTED_MODULE_2__["UNAUTHORIZED"]) {
                    alert('Você precisa registrar-se antes no site');
                }
                else {
                    alert(operation + " falhou.\n  mensagem: " + error.error.message + "\n  situa\u00E7\u00E3o: " + error.statusText);
                }
            }
            else {
                alert("erro: " + error);
            }
            console.error('erro:', error);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(result);
        };
    };
    ContactService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ContactService);
    return ContactService;
}());



/***/ }),

/***/ "./src/app/contacts/contacts.component.css":
/*!*************************************************!*\
  !*** ./src/app/contacts/contacts.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#addButton {\n  font-size: 50px;\n  color: #e91e63;\n}\n"

/***/ }),

/***/ "./src/app/contacts/contacts.component.html":
/*!**************************************************!*\
  !*** ./src/app/contacts/contacts.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>\n  Contatos ({{contacts.length}})\n</h2>\n<h2 *ngIf=\"isUpdating && contacts.length === 0\">\n  Carregando...\n</h2>\n<h2 *ngIf=\"!isUpdating && contacts.length === 0\">\n  Sem contatos.\n</h2>\n<ul class=\"list-group\" [ngStyle]=\"{opacity: isUpdating? 0.5: 1}\">\n  <li class=\"list-group-item\" *ngFor=\"let contact of contacts; index as i\">\n    <div class=\"row\">\n      <div class=\"col-md-3\" (click)=\"router.navigateByUrl('/detail/' + contact._id)\">\n        {{contact.name}}\n      </div>\n      <a class=\"col-md-2\" href=\"mailto:{{contact.fields['E-mail']}}\">\n        {{contact.fields['E-mail']}}\n      </a>\n      <div class=\"col-md-3\" (click)=\"router.navigateByUrl('/detail/' + contact._id)\">\n        {{contact.fields['Telefone']}}\n      </div>\n      <div class=\"col-md-3\" (click)=\"router.navigateByUrl('/detail/' + contact._id)\">\n        {{getCargoEmpresa(contact)}}\n      </div>\n      <div class=\"col-md-1\">\n        <button type=\"button\" class=\"btn danger\" (click)=\"delContact(i)\" ngbTooltip=\"Excluir\">\n          <i class=\"fas fa-trash\"></i>\n        </button>\n      </div>\n    </div>\n  </li>\n</ul>\n<div class=\"footer\">\n  <div class=\"float-right\">\n    <button type=\"button\" class=\"btn\" id=\"addButton\" (click)=\"router.navigateByUrl('/detail')\" ngbTooltip=\"Criar novo contato\">\n      <i class='fas fa-plus-circle'></i>\n    </button>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/contacts/contacts.component.ts":
/*!************************************************!*\
  !*** ./src/app/contacts/contacts.component.ts ***!
  \************************************************/
/*! exports provided: ContactsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsComponent", function() { return ContactsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _contact_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contact.service */ "./src/app/contact.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./src/app/actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(contactService, router, store) {
        var _this = this;
        this.contactService = contactService;
        this.router = router;
        this.store = store;
        store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])('state')).forEach(function (state) {
            _this.isUpdating = state.isUpdating;
            _this.contacts = state.contacts;
        });
    }
    ContactsComponent.prototype.ngOnInit = function () {
        this.getContacts();
    };
    ContactsComponent.prototype.getContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contacts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_4__["StartUpdate"]());
                        return [4 /*yield*/, this.contactService.getContacts()];
                    case 1:
                        contacts = _a.sent();
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_4__["LoadContacts"](contacts));
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_4__["SuccessUpdate"]());
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactsComponent.prototype.delContact = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_4__["StartUpdate"]());
                        return [4 /*yield*/, this.contactService.delContact(this.contacts[index])];
                    case 1:
                        _a.sent();
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_4__["DelContact"](index));
                        this.store.dispatch(new _actions__WEBPACK_IMPORTED_MODULE_4__["SuccessUpdate"]());
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactsComponent.prototype.getCargoEmpresa = function (contact) {
        var fields = contact.fields;
        var cargo = fields['Cargo'];
        var empresa = fields['Empresa'];
        if (cargo && empresa) {
            return cargo + ', ' + empresa;
        }
        if (cargo) {
            return cargo;
        }
        if (empresa) {
            return empresa;
        }
        return '';
    };
    ContactsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contacts',
            template: __webpack_require__(/*! ./contacts.component.html */ "./src/app/contacts/contacts.component.html"),
            styles: [__webpack_require__(/*! ./contacts.component.css */ "./src/app/contacts/contacts.component.css")]
        }),
        __metadata("design:paramtypes", [_contact_service__WEBPACK_IMPORTED_MODULE_1__["ContactService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], ContactsComponent);
    return ContactsComponent;
}());



/***/ }),

/***/ "./src/app/reducer.ts":
/*!****************************!*\
  !*** ./src/app/reducer.ts ***!
  \****************************/
/*! exports provided: reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
function reducer(state, action) {
    if (state === void 0) { state = { isUpdating: true, error: null, contacts: [] }; }
    if (action.reducer) {
        return action.reducer(state);
    }
    return state;
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/edsonasaga/Contact-List/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map