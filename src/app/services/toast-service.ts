import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastCtrl: ToastController = inject(ToastController);

  async mostrarToast(message: string, color: string, duration: number, position: "middle" | "bottom" | "top" | "left" | "right") {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 1200,
      position: 'bottom'
    });
    await toast.present();
  }
}
