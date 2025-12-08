import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonIcon,
  IonImg, IonList, IonRouterLink, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data-service";
import {ToastService} from "../../services/toast-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,
    IonRouterLink, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardContent, IonCardTitle, IonButton, IonCardSubtitle]
})
export class InicioPage implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly toastService: ToastService = inject(ToastService);


  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private router: Router) { }

  ngOnInit() {


  }

  /*Esto recoge la categoria del boton del html, ejemplo "rifles" o "pistolas"*/
  protected abrirCategoria(type: string) {
    this.router.navigate(['/categorias', type]);
  }
}
