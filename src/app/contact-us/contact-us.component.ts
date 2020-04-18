import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  private model: Contact;
  private countries: Array<string>;
  private result: string;
  constructor() { this.resetData(); }

  ngOnInit() {
  }
  saveData() {

    if ((Math.floor((Math.random() * 10) + 1) % 2 === 0)) {
      alert('Server Error');
    }
    else {
      if (confirm('Final Save?')) {
        this.result = (Math.floor((Math.random() * 100) + 1) % 2 === 0) ? "Data Saved Successfully" : "Error occured";
      }
      // else {
      //   alert('Save cancelled');
      // }
    }
  }
  resetData() {
    this.model = new Contact();
    this.model.responsetype = ["email", "phone", "post"];
    this.model.hobbies = [{ selected: false, key: 1, value: "music" }, { selected: false, key: 2, value: "cricket" }, { selected: false, key: 3, value: "cooking" }, { selected: false, key: 4, value: "painting" }, { selected: false, key: 5, value: "travelling" }];
    this.countries = ["", "Australia", "Canada", "Japan", "USA", "Singapore"];
    this.model.connectedto = [{ selected: false, key: 1, value: "FaceBook" }, { selected: false, key: 2, value: "Twitter" }, { selected: false, key: 3, value: "Instagram" }, { selected: false, key: 4, value: "Google" }];

    this.result = "";
  }
  setChoice(obj: any) {
    if (obj.children && obj.children.length) {
      for (let x = 0; x < obj.children.length; x++) {
        this.model.connectedto[x].selected = obj.children[x].selected;
      }
    }
  }
}
