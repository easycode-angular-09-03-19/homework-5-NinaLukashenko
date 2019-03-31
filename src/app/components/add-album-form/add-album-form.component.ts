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
          console.log("Hello ngOnInit");
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
    //this.formTitle = "Add new album";
    if (this.editedAlbum.title !== "") {
      this.editedAlbum.title = this.album.title;
      this.albumService.editAlbum(this.editedAlbum).subscribe((data: Album) => {
        console.log(data);
        this.albumEvents.emitEditAlbum(data);
        this.form.resetForm();
        //console.log("Hello from onFormSubmit");
        this.formTitle = "Add new album";
        this.albumEvents.emitCancelAlbum(data);
        this.alertMessage.emitAlertAdd("The album was edited!");
      });
      return;
    }

    const newAlbum = {
      userId: 5,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      console.log("Get data FormComponent");
      this.formTitle = "Add new album";
      this.albumEvents.emitAddNewAlbum(data);
      this.form.resetForm();
    });
  }
}
