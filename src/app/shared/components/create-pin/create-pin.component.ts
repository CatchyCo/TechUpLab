import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @Output() public closeModal: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(
    public formBuilder: FormBuilder,
    public countryService: CountryService
  ) {
    this.pinForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: ['',[Validators.required]],
      collaboration: [[], [Validators.required]],
      privacy: ['Public', [Validators.required]],
    });
    this.hasBaseDropZoneOver = false;
  }
  ngOnInit(): void {
    this.fetchCustomers();
  }

  public selectItems:any;
  public pinForm: FormGroup;
  public hasAnotherDropZoneOver: boolean = false;
  public dragMessage:string = "Drag/Drop here";

  public checkErrors(control: string) {
    return (
      this.pinForm.get(control)?.invalid && this.pinForm.get(control)?.touched
    );
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e; 
  }

  public fetchCustomers(){
    this.countryService.getAddCustomer().subscribe(customer =>{
      this.selectItems = customer.map((e) => {
        const customer: any = e.payload.doc.data();
        customer.id = e.payload.doc.id;
        return customer;
      });
    })
  }

  showErrorMessage(control: string) {
    let errorMsg = '';
    if (this.pinForm.get(control)?.hasError('required')) {
      errorMsg = this.controlRequiredErrorMessage(control);
    }
    return errorMsg;
  }

  controlRequiredErrorMessage(control: string) {
    switch (control) {
      case 'title': {
        return 'Please enter title';
      }
      case 'image': {
        return 'Please enter email';
      }
      case 'collaboration': {
        return 'Please select country';
      }
      default: {
        return '';
      }
    }
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true,
  });


  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: any) {
    const file: File = event[0];
    readBase64(file).then((data: any) => {
      this.dragMessage= file.name;
      this.pinForm.get('image')?.patchValue(data);
    });
  }

  public submit() {
    const pinForm = {
      id: 0,
      title: this.pinForm.get('title')?.value,
      image: this.pinForm.get('image')?.value,
      collaboration: this.pinForm.get('collaboration')?.value,
      privacy: this.pinForm.get('privacy')?.value,
    };
    this.pinForm.reset();
    this.dragMessage = "Drag/Drop here";
    this.countryService.addPinData(pinForm);
    this.closeModal.emit();
  }
}
