import { Component, OnInit } from "@angular/core";
import { AlertMessageService } from "../../services/alert-message.service";
import { Alert } from "../../interfaces/alert";

@Component({
  selector: "app-alert-message",
  templateUrl: "./alert-message.component.html",
  styleUrls: ["./alert-message.component.css"]
})
export class AlertMessageComponent implements OnInit {
  message: Alert = {
    showAlertMessage: false,
    text: "",
    class: ""
  };

  constructor(public alertMessage: AlertMessageService) {}

  ngOnInit() {
    this.alertMessage.alertMessageObservableSubject.subscribe((data: Alert) => {
      if (data.text) {
        this.message.text = data.text;
        this.message.class = data.class;
        this.message.showAlertMessage = true;
        setTimeout(() => {
          this.message.showAlertMessage = false;
        }, 3000);
      }
    });
  }
}
