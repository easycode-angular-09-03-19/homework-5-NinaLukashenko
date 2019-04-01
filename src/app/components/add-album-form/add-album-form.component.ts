import { Component, OnInit, ViewChild } from "@angular/core";
import { AlbumsService } from "../../services/albums.service";
import { AlbumsEventsService } from "../../services/albums-events.service";
import { Album } from "../../interfaces/album";
import { NgForm } from "@angular/forms";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: "app-add-album-form",
  templateUrl: "./add-album-form.component.html",
  styleUrls: ["./add-album-form.component.css"]
})
export class AddAlbumFormComponent implements OnInit {
  formTitle = "Add a new album";
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
    public albumEvents: AlbumsEventsService,
    public alertMessage: AlertMessageService
  ) {}

  ngOnInit() {
    this.albumEvents.albumEditEventObservableSubject.subscribe(
      (data: Album) => {
        if (data.id) {
          this.album.title = data.title;
          this.formTitle = `Editing the album with id: ${data.id}`;

          this.editedAlbum = {
            userId: data.userId,
            id: data.id,
            title: data.title
          };
        }
      }
    );

    this.albumEvents.albumCancelEventObservableSubject.subscribe(
      (data: Album) => {
        this.formTitle = "Add a new album";
        this.form.resetForm();
      }
    );
  }

  onFormSubmit() {
    if (this.editedAlbum.title !== "" && this.formTitle !== "Add a new album") {
      this.editedAlbum.title = this.album.title;
      this.albumService.editAlbum(this.editedAlbum).subscribe((data: Album) => {
        this.albumEvents.emitEditAlbum(data);
        this.albumEvents.emitCancelAlbum(data);
        this.alertMessage.emitAlertAdd({
          text: "The album was edited!",
          class: "alert-success"
        });
        this.editedAlbum = {
          userId: 0,
          id: 0,
          title: ""
        };
      });
      return;
    }

    const newAlbum = {
      userId: 5,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      this.formTitle = "Add new album";
      this.albumEvents.emitAddNewAlbum(data);
      this.form.resetForm();
      this.alertMessage.emitAlertAdd({
        text: "The album was added!",
        class: "alert-primary"
      });
    });
  }
}
