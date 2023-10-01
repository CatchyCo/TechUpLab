import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { CountryService } from 'src/app/service/country-service.service';

function readBase64(file: Blob): Promise<any> {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener(
      'load',
      function () {
        resolve(reader.result);
      },
      false
    );

    reader.addEventListener(
      'error',
      function (event) {
        reject(event);
      },
      false
    );

    reader.readAsDataURL(file);
  });
  return future;
}

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss'],
})
export class CreatePinComponent implements OnInit {
  hasBaseDropZoneOver: any;

  constructor(
    public formBuilder: FormBuilder,
    public countryService: CountryService
  ) {
    this.pinForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [''],
      collaboration: [[], [Validators.required]],
      gender : ['Public',[Validators.required]]
    });
    this.hasBaseDropZoneOver = false;

    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: {
        _file: { name: any; size: any; type: any };
      }) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });
    this.hasBaseDropZoneOver = false;
  }
  ngOnInit(): void {
    let customerList = [];
    if (localStorage.getItem('customerList')) {
      customerList = JSON.parse(localStorage.getItem('customerList') || '[]');
      this.pinForm.get('collaboration')?.patchValue(customerList);
      this.selectItems = customerList;
      console.log(customerList);
    }
  }

  public selectItems = [];
  public pinForm: FormGroup;

  public checkErrors(control: string) {
    return (
      this.pinForm.get(control)?.errors && this.pinForm.get(control)?.touched
    );
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileToUpload: any;
  imageUrl: any;

  public handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];

    console.log(event.target.files[0], 'hangle');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.pinForm.get('image')?.patchValue(reader.result);
    };
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

  submit() {
    const pinForm = {
      id: 0,
      title: this.pinForm.get('title')?.value,
      image: this.pinForm.get('image')?.value,
      collaboration: this.pinForm.get('collaboration')?.value,
      gender: this.pinForm.get('gender')?.value
      
    };

    this.countryService.addPinData(pinForm);
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true,
  });
  public hasAnotherDropZoneOver: boolean = false;

  fileObject: any;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: any) {
    const file: File = event[0];

    console.log(event[0], 'hangledsdsd');

    console.log(file);

    readBase64(file).then((data: any) => {
      this.pinForm.get('image')?.patchValue(data);
    });
  }
}
