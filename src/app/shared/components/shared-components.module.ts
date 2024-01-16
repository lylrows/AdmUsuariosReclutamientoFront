import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { SharedMaterialModule } from '../shared-material.module';
// import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { SearchModule } from '../search/search.module';
// import { SharedPipesModule } from '../pipes/shared-pipes.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
// import { HeaderSideComponent } from './header-side/header-side.component';
// import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
// import { HeaderTopComponent } from './header-top/header-top.component';
// import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ONLY FOR DEMO
//  import { CustomizerComponent } from './customizer/customizer.component';

// ALWAYS REQUIRED 

//  import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HeaderSideComponent } from './header-side/header-side.component';
import { FooterComponent } from './footer/footer.component';
//  import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';




const components = [
//   HeaderTopComponent,
//   SidebarTopComponent,
//   SidenavComponent,
//   NotificationsComponent,
//   SidebarSideComponent,
   HeaderSideComponent,
  AdminLayoutComponent,
  FooterComponent
//  AuthLayoutComponent,
]

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    RouterModule,
    // TranslateModule,
    // FlexLayoutModule,
    // PerfectScrollbarModule,
    // SearchModule,
    // SharedPipesModule,
    // SharedDirectivesModule,
    // SharedMaterialModule,
    // MatCardModule,
    // MatDividerModule
  ],
  declarations: components,
  // entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent],
  exports: components
})
export class SharedComponentsModule {}