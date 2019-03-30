import { Component, OnInit } from "@angular/core";
import { AlbumsService } from "../../services/albums.service";
import { Album } from "../../interfaces/album";
import { AlbumsEventsService } from "../../services/albums-events.service";

@Component({
  selector: "app-albums-list",
  templateUrl: "./albums-list.component.html",
  styleUrls: ["./albums-list.component.css"]
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumsEventsService
  ) {}

  ngOnInit() {
    this.albumService.getAlbums().subscribe(
      (data: Album[]) => {
        this.albums = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("complete");
      }
    );

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      console.log("Albums-list component", data);
      if (data.title) {
        this.albums.unshift(data);
      }
    });
  }
}
