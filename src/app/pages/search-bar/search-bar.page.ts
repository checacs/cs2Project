import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data-service";
import {APIcsSkins, Skins} from "../../common/interfaces";
import {FiltroPipe} from "../../pipes/filtro-pipe";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.page.html',
  styleUrls: ['./search-bar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonSearchbar, IonList, IonItem, FiltroPipe]
})
export class SearchBarPage implements OnInit {

  private readonly dataService: DataService = inject(DataService);
  skinsList: Skins[] = [];
  textoBuscar = '';


  constructor() { }

  ngOnInit() {
    this.loadSkins();
  }

  private loadSkins() {
    this.dataService.getCsSkins().subscribe(
      {
        next: value => {
          this.skinsList = value;
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }
  //Funcion para buscar los elementos escritos, convirtiendolos en minusculas y con "trim" para evitar espacios
  protected buscar(event: any) {
    this.textoBuscar = event.target.value.toLowerCase().trim();
    if (this.textoBuscar !== '') {
      this.dataService.getCsSkins().subscribe(
        {
          next: value => {
            this.skinsList = value;
          },
          error: error => {
            console.error(error);
          }
        }
      )
    }else this.loadSkins();

  }
}
