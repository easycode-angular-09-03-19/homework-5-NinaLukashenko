import { Component, OnInit } from "@angular/core";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: "app-alert-message",
  templateUrl: "./alert-message.component.html",
  styleUrls: ["./alert-message.component.css"]
})
export class AlertMessageComponent implements OnInit {
  message = {
    showAlertMessage: false,
    text: ""
  };

  constructor(public alertMessage: AlertMessageService) {}

  ngOnInit() {
    this.alertMessage.alertMessageObservableSubject.subscribe(
      (text: string) => {
        if (text) {
          this.message.text = text;
          this.message.showAlertMessage = true;
        }
      }
    );
  }
}
