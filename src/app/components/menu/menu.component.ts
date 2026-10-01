import {Component, inject, OnInit} from '@angular/core';
import {
  IonAvatar,
  IonContent,
  IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle, IonText, IonThumbnail,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {APIcsSkins} from "../../common/interfaces";
import {RouterLink} from "@angular/router";
import {DataService} from "../../services/data-service";
import {ToastService} from "../../services/toast-service";
import {addIcons} from "ionicons";
import {trashOutline} from "ionicons/icons";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    IonText,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonThumbnail
  ]
})
export class MenuComponent  implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly toastService: ToastService = inject(ToastService);



  constructor() {
    addIcons({trashOutline})
  }

  ngOnInit() {

  }

  get favoritosList():APIcsSkins {
    return this.dataService.getFavoritos();
  }

  /*Esta funcion llama a la funcion removeFavorito del dataService */
  borrar(id: string) {
    this.dataService.removeFavorito(id);
    /*Mostramos mensaje*/
    this.toastService.mostrarToast('Arma borrada!', "danger" ,
      900, 'middle')

  };

}
