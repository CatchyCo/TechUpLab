import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FileUploader } from 'ng2-file-upload';
import { getCustomerData } from 'src/app/state/Country/Customer/customer.actions';
import { AppState } from 'src/app/store/app.store';
import { Customer } from '../../customer.service';
import { PinService } from '../../pin.service';

/* 
Third party function to load files
*/

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
  constructor(
    public formBuilder: FormBuilder,
    public pinService: PinService,
    public store: Store<AppState>
  ) {
    this.pinForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      collaboration: [[], [Validators.required]],
      privacy: ['Public', [Validators.required]],
    });
    this.hasBaseDropZoneOver = false;
  }
  ngOnInit(): void {
    this.fetchCustomers();
  }

  public selectItems: Customer[] | any;
  public pinForm: FormGroup;
  public hasAnotherDropZoneOver: boolean = false;
  public dragMessage: string = 'Drag/Drop here';
  public hasBaseDropZoneOver: boolean;

  @Output() public closeModal: EventEmitter<Event> = new EventEmitter<Event>();

  /* 
  Checks the form control has error or not.
  */
  public checkErrors(control: string) {
    return (
      this.pinForm.get(control)?.invalid && this.pinForm.get(control)?.touched
    );
  }

  /* Check the dragged files is hover the drop input/div  */
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /* Use to fetch all the customers from Database */
  public fetchCustomers() {
    this.store.dispatch(getCustomerData());
    this.store.select('customer').subscribe((data) => {
      const pinList: Customer[] | any = data.customer;
      if (pinList[0]) {
        this.selectItems = pinList[0];
      }
    });
  }

  /* 
  Return the Error message for form controls as per type
  */
  showErrorMessage(control: string) {
    let errorMsg = '';
    if (this.pinForm.get(control)?.hasError('required')) {
      errorMsg = this.controlRequiredErrorMessage(control);
    }
    return errorMsg;
  }

  /* 
  Return the Error message for form-controls as per control
  */
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

  /* 
Third party function to load files
*/
  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true,
  });

  /* Check the dragged files is hover the drop input/div  */
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  /* 
Third party function to load files
*/
  public onFileSelected(event: any) {
    const file: File = event[0];
    readBase64(file).then((data: any) => {
      this.dragMessage = file.name;
      this.pinForm.get('image')?.patchValue(data);
    });
  }

  /* 
  Final Sumbit form functions
  */
  public submit() {
    const pinForm = {
      id: 0,
      title: this.pinForm.get('title')?.value,
      image: this.pinForm.get('image')?.value,
      collaboration: this.pinForm.get('collaboration')?.value,
      privacy: this.pinForm.get('privacy')?.value,
    };
    this.pinForm.reset();
    this.dragMessage = 'Drag/Drop here';
    this.pinService.addPinData(pinForm);
    this.closeModal.emit();
  }
}
