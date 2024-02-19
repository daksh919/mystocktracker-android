import { Routes } from '@angular/router';
import { ContactDetailsComponent } from './contact/contact-details/contact-details.component';
import { UserLoginModalComponent } from './user-register/user-login-modal/user-login-modal.component';
import { UserForgotpasswordModalComponent } from './user-register/user-forgotpassword-modal/user-forgotpassword-modal.component';
import { UserLoginGuard } from './UserAuthorization/user-login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePage } from './home/home.page';
import { LoadTabelComponent } from './dashboard/load-tabel/load-tabel.component';
import { SettingComponent } from './setting/setting.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full'},
  { path: 'register',loadComponent: () => import('./user-register/user-register-modal/user-register-modal.component').then((m) => m.UserRegisterModalComponent)},
  { path: 'login', component: UserLoginModalComponent},
  { path: 'forgotpassword', component: UserForgotpasswordModalComponent},

  { path: 'home', component: HomePage},
  { path: 'contactMe', component: ContactDetailsComponent},
  { path: 'settings', component: SettingComponent},
  { path: 'loadTabel', component: LoadTabelComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserLoginGuard]},
  { path: 'dashboardDirectAccess', component: DashboardComponent}
];
