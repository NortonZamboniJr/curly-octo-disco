import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Ser1Service } from 'src/app/ser1.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('quests', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))]), { optional: true }),

      ])




    ]
    )]
})
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = 'Submit';
  questText: string = 'Character here.';
  //quests = ['Crushing the Crown', 'Something is in the Air (and it Aint Love)', 'Get Them While They Are Young'];
  quests = [];
  tableContent = '';
  searchOnGoing = false;
  searchDone = false;
  resultsArray = [];
  search = '';
  error = ''; 
  character;


  constructor(private service: Ser1Service) { }

  ngOnInit() {
    this.itemCount = this.quests.length;
  }

  mudarSuperNorton() {
    //this.btnText = "Botao do super norton";
  }

 /*  addQuest() {
    this.quests.push(this.questText);
    this.questText = '';
    this.itemCount = this.quests.length;
  } */

  deleteQuest() {

    let x = this.quests.length - 1;
    let newQuests = this.quests.slice(0, x);
    this.quests = newQuests;
    this.itemCount = this.quests.length;

  }

   searchCharacter(){
    //this.searchOnGoing = true;
    //this.searchDone = false;
  
    this.service.getCharacter(this.questText).subscribe( 
      res => { 
        //if (!res) {
          //this.error = 'Personagem não encontrado.';
          //return;
        //}
       // this.error = '';
        this.character = res;
        //this.searchOnGoing = false;
        //this.searchDone = true;

      },
     // err => this.error = 'Erro de conexão.'
    ); 
    this.quests.push("Nome: " + this.character.name +  " | Level: " + this.character.level + " | Achievment Points: "  + this.character.achievementPoints + " | Battlegroup: " + this.character.battlegroup);
    this.questText = '';
    this.itemCount = this.quests.length;
    //  alert("Level: " + this.character.level + " Achievment Points: "  + this.character.achievementPoints);
    } 


  removeQuest(i) {
    this.quests.splice(i, 1);
  }
}
