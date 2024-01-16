import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
//import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "../../../../environments/environment" ;
import { User } from "../../models/user.model";

// ================= only for demo purpose ===========
// const DEMO_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

// const DEMO_USER: User = {
//   id: "5b700c45639d2c0c54b354ba",
//   displayName: "Maximo Carrión",
//   role: "SA",
// };
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User = {};
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  return: string;
  TOKEN = "TOKEN";
  USER = "USER";
  MENU = "MENU"
  menu: any ={};

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  public signin(username, password) {
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/LoginPostulant/authenticate`, { username, password })
      .pipe(
        map((res: any) => {
          
          if (res.stateCode== 200 && res.data.isLoginOk){
             this.setUserAndToken(res.data.token, res.data.user, !!res, null);
          }


          this.signingIn = false;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    
    
    
    if( this.getUser().changedPassword == false){
      this.router.navigateByUrl("/auth/change-password");
    }
    
    

    return of(this.getUser())
      .pipe(
        map((profile: User) => {
          debugger;
          this.setUserAndToken(this.getJwtToken(), profile, true,this.getMenu());
          this.signingIn = false;
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );
    
    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */

    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  public signout() {
    debugger;
    this.setUserAndToken(null, null, false,null);
    //this.router.navigateByUrl("/auth/login");
    localStorage.removeItem('job');
    localStorage.removeItem('USER');
    localStorage.removeItem('TOKEN');
    //this.router.navigateByUrl("/auth/login");
    window.location.href =  `${environment.localhost}#/auth/login`;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.USER);
  }
  getMenu() {
    return this.ls.getItem(this.MENU);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean, menu: any) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.menu = menu;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.TOKEN, token);
    this.ls.setItem(this.USER, user);
    this.ls.setItem(this.MENU, menu);
  }
}
