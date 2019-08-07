import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService:GroceriesServiceService, public alertController: AlertController) { }


  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please edit item' : 'Please enter item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: data => {
            console.log('Save Clicked', item);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(data);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
