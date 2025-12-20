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
  IonRouterLink, IonRow, IonSearchbar, IonThumbnail,
  IonToolbar,
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data-service";
import {ToastService} from "../../services/toast-service";
import {APIcsSkins, Skins} from "../../common/interfaces";
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
    IonLabel, IonList, IonThumbnail, IonSearchbar, IonAvatar]

})
export class CategoriasPage implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);

  /*Estas dos variables las utilizamos tanto para la funcion de buscar como en loadCsSkins y la funcion
   loadMore del InfScr*/
  skinsList: Skins[] = [];
  skinsListOriginal: Skins[] = [];


  pageSize = 20;
  paginaActual = 0;
  textoBuscar = '';


  constructor() {
  }

  /*esta es la variable con la que recogemos el typo de categoria. Luego en el
  app.route.ts  en el path de categorias tenemos que incluirle :type que indica
  el tipo de categoria que tiene que listar
  * */
  type!: string;
//sin esto no podriamos utilizar el snapshot del ngOnInit


  /*Rescuerda que el ngOnInit es secuencial*/
  ngOnInit() {
    /*Esto viene de app.routes.ts y saca el valor de "type" y dice, por ejemplo, que el valor recogido 'Rifles'
    lo convierte en this.type("this.type = 'Rifles' ") o el valor 'Knives' lo convierte en "this.type = 'Knives' "*/
    this.type = this.route.snapshot.params['type'];
    this.loadCsSkins();

  }

  private loadCsSkins() {
    this.dataService.getCsSkins().subscribe(
      {
        next: data => {
          /*Creamos esta variable estatica para poder actualizar las listas de Skins de la funcion "buscar"
           del search-bar*/
          let filtradas: Skins[] = [];

          /*Estos son los condicionales que dependiendo del valor de this.type lo filtra y carga la categoria.name
           segun el valor filtrado del "this.type"*/
          if (this.type === 'Rifles'){
            filtradas = data.filter(skin =>
              skin.category.name ==='Rifles');
          }else if (this.type ==='Pistols'){
            filtradas = data.filter(skin =>
            skin.category.name ==='Pistols');
          }else if (this.type ==='Knives'){
            filtradas = data.filter(skin =>
            skin.category.name ==='Knives');
          }else if (this.type ==='SMGs'){
            filtradas = data.filter(skin =>
            skin.category.name ==='SMGs');
          }else if (this.type ==='Gloves'){
            filtradas = data.filter(skin =>
            skin.category.name ==='Gloves');
          }else if (this.type ==='Heavy'){
            filtradas = data.filter(skin =>
            skin.category.name ==='Heavy');
          }else if (this.type ==='SMGs'){
            this.skinsList = data;
          }
          /*Aqui actualizamos las listas Skin[] con la info guardada en "filtradas" con el nombre del arma*/
          this.skinsListOriginal = filtradas;
          /*con esto indicamos que muestre los 20 primeros valores, y el resto se guardan, de skinsListOriginal
          y actualizamos en skinsList y que luego utilizaremos en el loadMore para cargar de 20 en 20 elementos*/
          this.skinsList = this.skinsListOriginal.slice(0,this.pageSize);
          /*y aqui decimos que la pagina actual lleva 20 elementos*/
          this.paginaActual = this.pageSize;

                                        //Esto recoge el valor de "this.type" seleccionado y lo muestra
          this.toastService.mostrarToast(`Lista ${this.type} cargada correctamente!`, 'primary',
            1200, "bottom");
        },
        error:(err) =>{
          console.error(err);
        }
      }
    )
  }
  addFavoritos(skin: Skins) {
    this.dataService.addFavorito(skin);
    this.toastService.mostrarToast('Arma añadida correctamente a Favoritos!',
      'success', 1200, "bottom");
  }
  protected loadMore(event: any) {
    /*Aqui estamos diciendo que los elementos a mostrar son del 20 al 40(20 + 20) que son igual a un total de 20*/
    const nextItems = this.skinsListOriginal.slice(this.paginaActual,this.paginaActual + this.pageSize);
    /*Ahora le decimos que ponga los elementos nuevos junto a los que ya habian*/
    this.skinsList = [...this.skinsList, ...nextItems];
    /*ahora le indicamos que la pagina actual lleva 40 elementos*/
    this.paginaActual += 20;

    event.target.complete();
    /*Si ya no quedan mas elementos se deshabilita la función*/
    if (this.paginaActual >= this.skinsListOriginal.length) {
      event.target.disabled = true;
    }

  }
  /*Cada vez que se escribe una letra en el buscador ionic lanza esta funcion*/
  protected buscar(event: any) {
    /*Esto recoge en la palabra texto el evento convertido en minusculas y el "trim" es para evitar espacios*/
    const texto = event.detail.value?.toLowerCase().trim();
    this.textoBuscar = texto;
    /*Esto dice que si no hay nada escrito devuelve la skinsList con la info de skinsListOriginal*/
    if (!texto) {
      this.skinsList = this.skinsListOriginal;
      return;
    }
    /*Pero si hay escrito en el buscador mira dentro de skinsListOriginal el "textoBuscar" y si existe muestra el valor
    guardado en skinList*/
    this.skinsList = this.skinsListOriginal.filter(skin => skin.name.toLowerCase().includes(this.textoBuscar));

  }
}
