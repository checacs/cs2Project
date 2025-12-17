import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIcsSkins, Skins} from "../common/interfaces";
import {CSMarketAPI, Market, Currency} from "csmarketapi";
import {text} from "ionicons/icons";


@Injectable({
  providedIn: 'root',
})
export class DataService {

  private readonly urlApiInventory =
    "https://www.steamwebapi.com/steam/api/inventory?key=5F3TVMXHP4A2UTOB&steam_id=76561198813449634"


  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase =
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";


  getCsSkins(): Observable<APIcsSkins>{
    return this.http.get<APIcsSkins>(this.urlBase);
  }


  favoritosList: Skins[] = [];


  addFavorito(skin: Skins){
    const existe = this.favoritosList.some(fav => fav.id === skin.id)

    if (!existe)
    {
      this.favoritosList.push(skin);
    }
  }

  removeFavorito(id: string){
    this.favoritosList = this.favoritosList.filter(skin =>
      skin.id !== id);

  }

  getFavoritos(){
    return this.favoritosList;
  }

}
