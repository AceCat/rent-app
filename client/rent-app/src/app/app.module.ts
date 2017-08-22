import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { D3Service } from 'd3-ng2-service';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import * as topojson from '@types/topojson';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdTabsModule, MdInputModule, MdButtonModule, MdSelectModule, MdOptionModule} from '@angular/material';


// import * as topojson from '../../node_modules/@types/topojson';


const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
  },
  {
  	path: 'view/:id',
  	component: ViewComponent
  },
  {
  	path: '**',
  	redirectTo: '/login',
  	pathMatch: 'full'
  },
  {
  	path: 'login',
  	component: LoginComponent
  }]

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ViewComponent,
    LoginComponent
 ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MdTabsModule,
    MdInputModule,
    MdOptionModule,
    MdButtonModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})


export class AppModule { }