import { Component, OnInit } from "@angular/core";
import { Album } from "../../interfaces/album";
import { AlbumsEventsService } from "../../services/albums-events.service";

@Component({
  selector: "app-alert-message",
  templateUrl: "./alert-message.component.html",
  styleUrls: ["./alert-message.component.css"]
})
export class AlertMessageComponent implements OnInit {
  showAlertMessage = false;
  constructor(public albumEvents: AlbumsEventsService) {}

  ngOnInit() {
    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.showAlertMessage = true;
      }
    });
  }
}
