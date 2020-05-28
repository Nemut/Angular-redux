import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        SidebarComponent,
        FooterComponent,
        NavbarComponent        
    ],
    exports: [
        SidebarComponent,
        FooterComponent,
        NavbarComponent
    ]
})
export class SharedModule { }