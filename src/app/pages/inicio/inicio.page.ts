import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonFab, IonFabButton, IonFabList, IonGrid,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonList, IonMenuToggle, IonRouterLink, IonRow, IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data-service";
import {ToastService} from "../../services/toast-service";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {add, addCircle, logoInstagram, logoTiktok, logoTwitter, logoX, logoYoutube} from "ionicons/icons";


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,
    IonRouterLink, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardContent, IonCardTitle, IonButton, IonItem, IonButtons, IonFab, IonFabButton, IonFabList, IonIcon, IonAvatar, IonMenuToggle]
})
export class InicioPage implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly toastService: ToastService = inject(ToastService);

  /*Esta variable es la que sirve de puente entre la funcion abrirCategoria y el app.router.es*/
  private readonly router: Router = inject(Router);


  constructor() {addIcons({logoInstagram, logoYoutube, logoTwitter, logoTiktok, logoX, add, addCircle}) };

  ngOnInit() {


  }

  /*Esta funcion recoje la palabra(type) y la envia mediante el 'router.navigate' al app.route.ts(ver la ruta)
   a la direccion "/categoria/'TipoArma'"  */
  protected abrirCategoria(type: string) {
    this.router.navigate(['/categorias', type]);
  }


}


