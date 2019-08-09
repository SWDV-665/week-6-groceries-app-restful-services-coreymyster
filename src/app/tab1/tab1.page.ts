import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Groceries";

  items = [];
  errorMessage: string;


  constructor(public toastController: ToastController, public alertController: AlertController, public dataService:GroceriesServiceService, public inputDialogService:InputDialogServiceService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

loadItems() {
  this.dataService.getItems()
    .subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error);
}

  async removeItem(item, index) {
    const toast = await this.toastController.create({
      message: `Removing ${item.name}, ${index}`,
      duration: 2000
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  async shareItem(item, index) {
    const toast = await this.toastController.create({
      message: `Sharing ${item.name}, ${index}`,
      duration: 2000
    });
    toast.present();

    let message = `Grocery item - Name: ${item.name} - Quantity: ${item.quantity}`;
    let subject = `Shared via groceries app`;
        // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared succesfully")
    }).catch((error) => {
      // Sharing via email is not possible
      console.log(`Error while sharing`, error)
    });
  }

  async editItem(item, index) {
    const toast = await this.toastController.create({
      message: `Editing ${item.name}, ${index}`,
      duration: 2000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
}
