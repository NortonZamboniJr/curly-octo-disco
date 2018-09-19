import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
      trigger('quests',[
        transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset:.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
      ]))]), {optional: true}),

      query(':leave', stagger('300ms', [
        animate('.6s ease-in', keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: .5, transform: 'translateY(35px)', offset:.3}),
          style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
    ]))]), {optional: true}),

    ])
    
    	


  ]
})
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string ='Submit';
  questText: string = 'My first quest';
  quests = ['Crushing the Crown','Something is in the Air (and it Aint Love)','Get Them While They Are Young'];

  constructor() { }

  ngOnInit() {
    this.itemCount = this.quests.length;
  }

  mudarSuperNorton(){
    //this.btnText = "Botao do super norton";
  }

  addQuest(){
    this.quests.push(this.questText);
    this.questText = '';
    this.itemCount = this.quests.length;
  }

  deleteQuest(){

      let x = this.quests.length-1;
      let newQuests= this.quests.slice(0,x);
      this.quests = newQuests;
      this.itemCount = this.quests.length;
      
  }

  removeQuest(i){
    this.quests.splice(i,1);
  }
}
