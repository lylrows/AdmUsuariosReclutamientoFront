import { ToastModule } from 'primeng/toast';
import { AuthModule } from './views/auth/auth.module';
//import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { HttpErrorInterceptor } from './shared/interceptors/httpErrorInterceptor';
import { InputMaskModule } from '@ngneat/input-mask';
import { DecimalPipe } from '@angular/common';
//import { PreloaderComponent } from './components/common/preloader/preloader.component';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { ErrorHandlerService } from './shared/services/error-handler.service';
// import { TokenInterceptor } from './shared/interceptors/token.interceptor';
//  import { HumanManagementModule } from './modules/human-management/humanmanagement.module';
//  import { SupportModule } from './modules/support/support.module';
//  import { NgxSpinnerModule } from "ngx-spinner";


// AoT requires an exported function for factories
// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    NgxSpinnerModule,
    ToastModule,    
    RecruitmentModule,
    //HumanManagementModule,
    //SupportModule,
    
    //  InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    RouterModule.forRoot(rootRouterConfig, { useHash: true, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' }), ModalModule.forRoot(), InputMaskModule
  ],
  declarations: [AppComponent
    
  ],
  providers: [
    [DecimalPipe],
    // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }