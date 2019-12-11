import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { APIService } from './services/api.service';
import { DependenciesModule } from './dependencies/dependencies.module';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    DependenciesModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, { provide: LOCALE_ID, useValue: "pt-BR" }, AuthGuard, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
