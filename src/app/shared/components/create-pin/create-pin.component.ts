import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
const URL = 'http://localhost:3000/fileupload/';
@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss']
})
export class CreatePinComponent implements OnInit {
  hasBaseDropZoneOver: any;
  uploader:FileUploader;
  response:string | undefined;

  
  constructor(public formBuilder:FormBuilder){
    this.pinForm = this.formBuilder.group({
      title : ['',[Validators.required]]
    })
    this.hasBaseDropZoneOver = false;

    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: { _file: { name: any; size: any; type: any; }; }) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );

  }
  ngOnInit(): void {
    this.uploader.response.subscribe( res => this.response = res );
  }
  public pinForm: FormGroup;

 /*  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']
    }); */
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
    console.log(e);
  }

  public checkErrors(control: string) {
    return (
      this.pinForm.get(control)?.errors &&
      this.pinForm.get(control)?.touched
    );
  }

  showErrorMessage(control: string) {
    let errorMsg = '';
    if (this.pinForm.get(control)?.hasError('required')) {
      errorMsg = this.controlRequiredErrorMessage(control);
    } else if (this.pinForm.get(control)?.hasError('email')) {
      errorMsg = this.controlPatternErrorMessage(control);
    }
    return errorMsg;
  }

  controlRequiredErrorMessage(control: string) {
    switch (control) {
      case 'title': {
        return 'Please enter title';
      }
      case 'email': {
        return 'Please enter email';
      }
      case 'country': {
        return 'Please select country';
      }
      case 'region': {
        return 'Please select region';
      }
      default: {
        return '';
      }
    }
  }

  controlPatternErrorMessage(control: string) {
    switch (control) {
      case 'email': {
        return 'Please enter valid email';
      }
      default: {
        return '';
      }
    }
  }

  submit(){
    console.log(this.uploader);
  }

}
