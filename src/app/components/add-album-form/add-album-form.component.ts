import { Component, OnInit, ViewChild } from "@angular/core";
import { AlbumsService } from "../../services/albums.service";
import { AlbumsEventsService } from "../../services/albums-events.service";
import { Album } from "../../interfaces/album";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-album-form",
  templateUrl: "./add-album-form.component.html",
  styleUrls: ["./add-album-form.component.css"]
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: ""
  };

  editedAlbum = {
    userId: 0,
    id: 0,
    title: ""
  };

  @ViewChild("addAlbumForm") form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumsEventsService
  ) {}

  ngOnInit() {
    this.albumEvents.albumEditEventObservableSubject.subscribe(
      (data: Album) => {
        if (data.id) {
          this.album.title = data.title;

          this.editedAlbum = {
            userId: data.userId,
            id: data.id,
            title: data.title
          };
        }
      }
    );
  }

  onFormSubmit() {
    if (this.editedAlbum.title !== "") {
      this.editedAlbum.title = this.album.title;
      this.albumService.editAlbum(this.editedAlbum).subscribe((data: Album) => {
        console.log(data);
        this.albumEvents.emitEditAlbum(data);
        this.form.resetForm();
      });
      return;
    }

    const newAlbum = {
      userId: 5,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      console.log("Get data FormComponent");
      this.albumEvents.emitAddNewAlbum(data);
      this.form.resetForm();
    });
  }
}
