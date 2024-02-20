import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ChessComponent } from './chess/chess.component';
import { TicToeComponent } from './tic-toe/tic-toe.component';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResigsterComponent } from './resigster/resigster.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { RandomreportComponent } from './randomreport/randomreport.component';
import { CardreportComponent } from './cardreport/cardreport.component';
import { TicreportComponent } from './ticreport/ticreport.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    ChessComponent,
    TicToeComponent,
    CardComponent,
    LoginComponent,
    ResigsterComponent,
    ProfileComponent,
    ReportComponent,
    RandomreportComponent,
    CardreportComponent,
    TicreportComponent,
    HomepageComponent,
    FooterComponent,
    GamesComponent,
    ContactComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
