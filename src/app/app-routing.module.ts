import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ChessComponent } from './chess/chess.component';
import { TicToeComponent } from './tic-toe/tic-toe.component';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { ResigsterComponent } from './resigster/resigster.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { RandomreportComponent } from './randomreport/randomreport.component';
import { TicreportComponent } from './ticreport/ticreport.component';
import { CardreportComponent } from './cardreport/cardreport.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GamesComponent } from './games/games.component';
import { ContactComponent } from './contact/contact.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';
import { RPSComponent } from './rps/rps.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { WhackAMoleComponent } from './whack-a-mole/whack-a-mole.component';
import { WordSearchComponent } from './word-search/word-search.component';
import { PaymentguardGuard } from './paymentguard.guard';
import { KillthebirdsComponent } from './killthebirds/killthebirds.component';
import { TowerofhanoiComponent } from './towerofhanoi/towerofhanoi.component';
import { StackcubeComponent } from './stackcube/stackcube.component';
import { ConnectfourComponent } from './connectfour/connectfour.component';
import { PlaypageComponent } from './playpage/playpage.component';
import { PaymentComponent } from './payment/payment.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'res', component: ResigsterComponent },
  { path: 'games', component: GamesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'main', component: MainpageComponent, canActivate: [AuthGuard] },
  { path: 'chess', component: ChessComponent },
  { path: 'tic-toe', component: TicToeComponent, },
  { path: 'card', component: CardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cardreport', component: CardreportComponent, canActivate: [AuthGuard] },
  { path: 'randomreport', component: RandomreportComponent, canActivate: [AuthGuard] },
  { path: 'ticreport', component: TicreportComponent },
  { path: 'memorygame', component: MemoryGameComponent, canActivate: [AuthGuard,PaymentguardGuard] },
  { path: 'RPS', component: RPSComponent },
  { path: 'sudoku', component: SudokuComponent,},
  { path: 'whack-a-mole', component: WhackAMoleComponent, canActivate: [AuthGuard] },
  { path: 'wordsearch', component: WordSearchComponent, canActivate: [AuthGuard] },
  { path: 'killthebirds', component: KillthebirdsComponent, canActivate: [AuthGuard] },
  { path: 'towerofhanoi', component: TowerofhanoiComponent, canActivate: [PaymentguardGuard,AuthGuard] },
  { path: 'stackcube', component: StackcubeComponent, canActivate: [PaymentguardGuard,AuthGuard] },
  { path: 'connectfour', component: ConnectfourComponent, canActivate: [AuthGuard] },
  { path: 'playpage', component: PlaypageComponent },
  {path:'payment',component:PaymentComponent,canActivate:[AuthGuard]},
  {path:'otp',component:OtpComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
