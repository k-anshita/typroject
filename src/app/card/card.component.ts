import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {
  @ViewChild('backgroundImage') backgroundImage: ElementRef<HTMLElement> | undefined
  cards: any[] = [
    { "card": "./assets/image/c2.png" },
    { "card": "./assets/image/d2.png" },
    { "card": "./assets/image/h2.png" },
    { "card": "./assets/image/s2.png" },
    { "card": "./assets/image/c3.png" },
    { "card": "./assets/image/d3.png" },
    { "card": "./assets/image/h3.png" },
    { "card": "./assets/image/s3.png" },
    { "card": "./assets/image/c4.png" },
    { "card": "./assets/image/d4.png" },
    { "card": "./assets/image/h4.png" },
    { "card": "./assets/image/s4.png" },
    { "card": "./assets/image/c5.png" },
    { "card": "./assets/image/d5.png" },
    { "card": "./assets/image/h5.png" },
    { "card": "./assets/image/s5.png" },
    { "card": "./assets/image/c6.png" },
    { "card": "./assets/image/d6.png" },
    { "card": "./assets/image/h6.png" },
    { "card": "./assets/image/s6.png" },
    { "card": "./assets/image/c7.png" },
    { "card": "./assets/image/d7.png" },
    { "card": "./assets/image/h7.png" },
    { "card": "./assets/image/s7.png" },
    { "card": "./assets/image/c8.png" },
    { "card": "./assets/image/d8.png" },
    { "card": "./assets/image/h8.png" },
    { "card": "./assets/image/s8.png" },
    { "card": "./assets/image/c9.png" },
    { "card": "./assets/image/d9.png" },
    { "card": "./assets/image/h9.png" },
    { "card": "./assets/image/s9.png" },
    { "card": "./assets/image/c10.png" },
    { "card": "./assets/image/d10.png" },
    { "card": "./assets/image/h10.png" },
    { "card": "./assets/image/s10.png" },
    { "card": "./assets/image/ca.png" },
    { "card": "./assets/image/da.png" },
    { "card": "./assets/image/ha.png" },
    { "card": "./assets/image/sa.png" },
    { "card": "./assets/image/cj.png" },
    { "card": "./assets/image/dj.png" },
    { "card": "./assets/image/hj.png" },
    { "card": "./assets/image/sj.png" },
    { "card": "./assets/image/ck.png" },
    { "card": "./assets/image/dk.png" },
    { "card": "./assets/image/hk.png" },
    { "card": "./assets/image/sk.png" },
    { "card": "./assets/image/cq.png" },
    { "card": "./assets/image/dq.png" },
    { "card": "./assets/image/hq.png" },
    { "card": "./assets/image/sq.png" }

  ];





  // random_value: Array<number[]> = [];
  get = ['', '', '', '', '', '']
  random_value: any[] = ['', '', '', '', '', ''];
  winner?: any
  player1?: boolean
  player2?: boolean
  cardwinner?: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.random_cards();
    this.same_color();
  }

  ngAfterViewInit() {
    this.backgroundImageChange();
  }

  random_cards() {
    this.random_value = ['', '', '', '', '', '']
    for (let i = 0; i < this.get.length; i++) {
      const cards = this.cards.filter(x => !this.random_value.includes(x.card));
      let numbers: number[] = [];
      numbers = (cards[(Math.floor(Math.random() * cards.length))].card);
      this.random_value[i] = (numbers);
    }
    const p1Card = this.random_value.filter((x, i) => i < 3).map(x => x[15]);
    const p2Card = this.random_value.filter((x, i) => i >= 3).map(x => x[15]);
    if (p1Card[0] && p1Card[1] && p1Card[2]
      && (p1Card[0] != p1Card[1] || p1Card[1] != p1Card[2] || p1Card[2] != p1Card[0])
      && p2Card[0] && p2Card[1] && p2Card[2]
      && (p2Card[0] != p2Card[1] || p2Card[1] != p2Card[2] || p2Card[2] != p2Card[0])) {
      this.random_cards();
    }
    console.log(this.random_value);
  }


  same_color() {

    let first_char = this.random_value.map(x => x[15])
    console.log(first_char)
    let p_1 = first_char.slice(0, 3)
    let p_2 = first_char.slice(3, 6)

    // if (!p_1.includes("s") && !p_1.includes("c") || !p_1.includes("h") && !p_1.includes("d")) {
    //   this.winner = 'player 1  is win'
    // } else if (!p_2.includes("s") && !p_2.includes("c") || !p_2.includes("h") && !p_2.includes("d")) {
    //   this.winner = "player 2  is win"
    // }

    const p1_allsame = p_1.every(x => x == p_1[0])
    const p2_alleq = p_2.every(x => x == p_2[0])
    if (p1_allsame) {
      this.winner =Swal.fire( 'player 1 is win')
    } else if (p2_alleq) {
      this.winner =Swal.fire( 'player 2 is win')
    }
    if (p1_allsame && p2_alleq) {
      this.winner = Swal.fire('match is draw')
    }
    if (!p1_allsame && !p2_alleq) {
      //  location.reload()
    }
    this.player1 = p1_allsame
    this.player2 = p2_alleq

    var cardwinners = localStorage.getItem('cardwinner')
    const arr = JSON.parse(cardwinners || '[]') || [];
    var current_user = localStorage.getItem('loginuser')
    const loggedInUser = JSON.parse(current_user || '[]') || [];
    const obj = {
      message: this.winner,
      userId: loggedInUser.id,
    }
    arr.push(obj)
    localStorage.setItem('cardwinner', JSON.stringify(arr) || '')
    this.authService.cardgamehistory(obj).subscribe(x => {
      console.log(obj)
    });


  }
  reset() {
    this.random_cards();
    this.same_color();
  }

  backgroundImageChange() {
    if (this.backgroundImage?.nativeElement) {
      this.backgroundImage.nativeElement.style.maxHeight = ((9 * this.backgroundImage?.nativeElement.clientWidth) / 16) + 'px'
    }
  }
}

// combination() {
//   let first_char = this.random_value.map(x => x[15])
//   console.log(first_char)
//   let p_1 = first_char.slice(0, 3)
//   let p_2 = first_char.slice(3, 6)
// }

