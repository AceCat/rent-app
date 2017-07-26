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

// import * as topojson from '../../node_modules/@types/topojson';


const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
  },
  {
  	path: 'view/:id',
  	component: ViewComponent
  }]

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ViewComponent,
 ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})


export class AppModule { }