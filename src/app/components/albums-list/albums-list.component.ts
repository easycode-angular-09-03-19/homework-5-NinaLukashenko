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
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("complete");
      }
    );

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
      }
    });

    this.albumEvents.albumCancelEventObservableSubject.subscribe(
      (data: Album) => {
        if (data.id) {
          for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].id === data.id) {
              this.albums[i].statusIsEditing = false;
              return;
            }
          }
        }
      }
    );

    //subscribe to edit event
    this.albumEvents.albumEditEventObservableSubject.subscribe(
      (data: Album) => {
        if (data.id) {
          data.statusIsEditing = true;
          for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].id === data.id) {
              this.albums[i].title = data.title;
              return;
            }
          }
        }
      }
    );

    this.albumEvents.albumDeleteEventObservableSubject.subscribe(
      (data: Album) => {
        if (data.id) {
          for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].id === data.id) {
              this.albums.splice(i, 1);
              return;
            }
          }
        }
      }
    );
  }
}
