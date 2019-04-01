import { Component, OnInit, Input } from "@angular/core";
import { Album } from "../../interfaces/album";
import { AlbumsService } from "../../services/albums.service";
import { AlbumsEventsService } from "../../services/albums-events.service";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: "app-album-item",
  templateUrl: "./album-item.component.html",
  styleUrls: ["./album-item.component.css"]
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumsEventsService,
    public alertMessage: AlertMessageService
  ) {}

  ngOnInit() {}

  onCancelClick() {
    this.albumEvents.emitCancelAlbum(this.item);
  }

  onEditClick() {
    this.albumEvents.emitEditAlbum(this.item);
  }

  onDeleteClick() {
    // request DELETE to server:
    this.albumService.deleteAlbum(this.item).subscribe(data => {
      //response from the server:
      console.log("Res from Server - method DELETE", data);
      this.albumEvents.emitDeleteAlbum(this.item);
      this.alertMessage.emitAlertAdd({
        text: "The album was deleted!",
        class: "alert-danger"
      });
    });
  }
}
