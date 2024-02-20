import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent {
  randomValues: Array<number[]> = [];
  getvalue = ['', '', '', '', '', '', '', ''];
  //  selectedindex?: string
  activebutton: boolean = false
  findstring?: string
  randomno?: number
  multiselect: Array<string> = []
  count: number = 0
  same_number: number=0
  per?:number
  percentage?:number
  minus_count:number=0
  disabled?:any
 

constructor(private toastr: ToastrService,private authService: AuthService){}  

  clickevent(_index: string, i: number, j: number) {
    if (this.activebutton == true) {
      if (!this.multiselect.includes(_index)) {
        this.multiselect.push(_index)
      if ((this.multiselect.includes(i + '' + j)) && this.randomValues && this.randomValues.length > i && this.randomValues[i].length > j && this.randomValues[i][j] == this.randomno) {
        // console.log(this.multiselect)
        //this.count--;
        this.minus_count--;
        this.same_number++; 
      }
      if ((this.multiselect.includes(i + '' + j)) && this.randomValues && this.randomValues.length > i && this.randomValues[i].length > j && this.randomValues[i][j] != this.randomno) {
        // console.log(this.multiselect)
        // this.count--;
        this.minus_count--;
      }
    }
  }
    // const c=this.multiselect.filter(x=>!x.includes(_index))&&this.multiselect.includes(i + '' + j) && this.randomValues && this.randomValues.length > i && this.randomValues[i].length > j && this.randomValues[i][j] != this.randomno
    // console.log(c)
     // if (this.count==0) {
    //   alert("you are win")
      //   this.randomValues = []
    //   this.findstring = ''
    //   this.randomno = undefined
    //   // this.selectedindex = ''
    //   this.multiselect = [];
    // }
      
    if(this.activebutton==true){
    if(this.minus_count==0){ 
      
    if(this.count==this.same_number){
      this.per=(this.same_number/this.count)*100
      this.percentage=Math.floor(this.per)
      this.toastr.success('YOU ARE'+this.percentage+ '%COMPLETE!');
      
    }else{
      this.per=(this.same_number/this.count)*100
      this.percentage=Math.floor(this.per)
      this.toastr.warning('YOU ARE'+this.percentage+ '%COMPLETE!');

       this.randomValues = []
      this.findstring = ''
      this.randomno = undefined
      // this.selectedindex = ''
      this.multiselect = [];
      this.activebutton=false;
    }
    var chesswin=localStorage.getItem('randomwinner')
    const arr=JSON.parse(chesswin||'[]')||[];
    var current_user=localStorage.getItem('loginuser')
    const loggedInUser=JSON.parse(current_user||'[]')||[];

    const obj={
      message:'YOU ARE'+this.percentage+ '%COMPLETE!',
      userId: loggedInUser.id,    
    }  
    arr.push(obj)
    localStorage.setItem('randomwinner',JSON.stringify(arr) || '')
    this.authService.numbergames(obj).subscribe(x => {
      console.log(obj)
    });

  }  
  }
  
}
  
  fillRandom(asd: any) {
    
    this.findstring = 'find random:'
    this.randomno = Math.floor(Math.random() * 9)
 
    this.randomValues = [];
    for (let i = 0; i < this.getvalue.length; i++) {
      const abc: number[] = [];
      for (let i = 0; i < this.getvalue.length; i++) {
        abc.push(Math.floor(Math.random() * (9 - 0 + 1) + 0));
      }
      this.randomValues.push(abc);
      this.disabled = true;
    }
   
  }
  
  nocount() {
    for (let i = 0; i < this.getvalue.length; i++) {
      for (let j = 0; j < this.getvalue.length; j++) {
        if (this.randomValues && this.randomValues[i] && this.randomValues[i].length > j) {
          const element = this.randomValues[i][j];
          console.log(element)
          if (element == this.randomno) {
            this.count++;
            this.minus_count++;
          }
        }
      }
    }
  }
 reset(){
  this. randomValues= [];
  this.randomno=undefined
  this.findstring=''
  this.multiselect = []
  this. count = 0
  this.same_number=0
  this.per=0
  this.minus_count=0
  this.disabled=false;
  this.activebutton=false
  
 }
}

//  fillRandom(asd: any) {

// this.findstring = 'find random:'
//     this.randomno = Math.floor(Math.random() * 9)
  
//     this.randomValues = [];
//     for (let i = 0; i < this.getvalue.length; i++) {
//         const abc: number[] = [];
//         for (let i = 0; i < this.getvalue.length; i++) {
//             abc.push(Math.floor(Math.random() * (9 - 0 + 1) + 0));
//           }
//           this.randomValues.push(abc);
//         }
//       }
      
      
      // if (this.randomValues[i][j] != this.randomno) {
        //   alert("you are lost!")
    //   this.randomValues = []
    //   this.findstring = ''
    //   this.randomno = undefined
    //   // this.selectedindex = ''
    //   this.multiselect = [];
    // }


    // this.selectedindex = _index
    // if ((this.selectedindex == (i + '' + j)) && this.randomValues && this.randomValues.length > i && this.randomValues[i].length > j && this.randomValues[i][j] == this.randomno) {
    //   console.log(this.multiselect)
    // }

