import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Alert } from "../interfaces/alert";

@Injectable({
  providedIn: "root"
})
export class AlertMessageService {
  private alertMessageSource = new BehaviorSubject({});
  public alertMessageObservableSubject = this.alertMessageSource.asObservable();

  constructor() {}

  emitAlertAdd(data: Alert) {
    this.alertMessageSource.next(data);
  }
}
