import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {MainPageComponent} from "./main-page/main-page.component"; //TODO: Create app.routing

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [AppComponent,
        MainPageComponent],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule {}
