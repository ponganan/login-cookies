import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({
    declarations: [
        LoginComponent,
        UserInfoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class PageModule { }
