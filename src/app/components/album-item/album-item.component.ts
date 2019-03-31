import { Component, OnInit, Input } from "@angular/core";
import { Album } from "../../interfaces/album";
import { AlbumsService } from "../../services/albums.service";
import { AlbumsEventsService } from "../../services/albums-events.service";

@Component({
  selector: "app-album-item",
  templateUrl: "./album-item.component.html",
  styleUrls: ["./album-item.component.css"]
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumsEventsService
  ) {}

  ngOnInit() {
    //change data for component when here about addeting:
    // this.albumEvents.albumEditEventObservableSubject.subscribe(
    //   (data: Album) => {}
    // );
  }

  onEditClick() {
    //put data from album card to form
    this.albumEvents.emitEditAlbum(this.item);
  }

  onDeleteClick() {
    this.albumService.deleteAlbum(this.item).subscribe(data => {
      console.log("album-item.component: Delete button was clicked");
      console.log(data);
      this.albumEvents.emitDeleteAlbum(this.item);
    });
  }
}
