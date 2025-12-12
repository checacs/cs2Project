import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonBackButton, IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardTitle, IonCol,
  IonContent, IonFooter, IonGrid,
  IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent,
  IonItem, IonItemSliding, IonLabel, IonList, IonMenuToggle, IonModal,
  IonRouterLink, IonRow, IonThumbnail,
  IonToolbar,
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data-service";
import {ToastService} from "../../services/toast-service";
import {APIcsSkins} from "../../common/interfaces";
import { RouterModule, ActivatedRoute } from '@angular/router';
import {MenuComponent} from "../../components/menu/menu.component";


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,

  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonRouterLink, RouterModule, IonInfiniteScroll,
    IonInfiniteScrollContent, IonButtons, IonMenuToggle, IonImg,
    IonModal, IonFooter, IonButton, IonItem, IonBackButton, IonItemSliding,
    IonLabel, IonList, IonThumbnail]

})
export class CategoriasPage implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly toastService: ToastService = inject(ToastService);
  skinsList: APIcsSkins = [];
  skinsListAux: APIcsSkins = [];
  /*esta es la variable con la que recogemos el typo de categoria. Luego en el
  app.route.ts  en el path de categorias tenemos que incluirle :type que indica
  el tipo de categoria que tiene que listar
  * */
  type!: string;
//sin esto no podriamos utilizar el snapshot del ngOnInit
  private readonly route = inject(ActivatedRoute);
  data = Array(30);
  constructor() {
  }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
    this.loadCsSkins();

  }

  private loadCsSkins() {
    this.dataService.getCsSkins().subscribe(
      {
        next: data => {
          if (this.type === 'Rifles'){
            this.skinsList = data.filter(skin =>
              skin.category.name ==='Rifles');
          }else if (this.type ==='Pistols'){
            this.skinsList = data.filter(skin =>
            skin.category.name ==='Pistols');
          }else if (this.type ==='Knives'){
            this.skinsList = data.filter(skin =>
            skin.category.name ==='Knives');
          }else if (this.type ==='SMGs'){
            this.skinsList = data.filter(skin =>
            skin.category.name ==='SMGs');
          }else if (this.type ==='Gloves'){
            this.skinsList = data.filter(skin =>
            skin.category.name ==='Gloves');
          }else if (this.type ==='Heavy'){
            this.skinsList = data.filter(skin =>
            skin.category.name ==='Heavy');
          }else{
            this.skinsList = data;
          }

          this.toastService.mostrarToast('skinsList cargada correctamente!', 'primary', 1200, "bottom");
        },
        error:(err) =>{
          console.error(err);
        }
      }
    )
  }
  addFavoritos(id: string){
    this.dataService.addFavorito(id);
    this.toastService.mostrarToast('Arma añadida correctamente a Favoritos!',
      'success', 1200, "bottom");
  }
  protected loadMore(event: any) {
    this.data.push(...Array(30));
    event.target.complete();

  }
}
