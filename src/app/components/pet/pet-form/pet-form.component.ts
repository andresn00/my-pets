import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from 'src/app/Models/Pet';
import { FormDialogData } from 'src/app/utils';
import * as moment from 'moment'

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  petForm = new FormGroup({
    name: new FormControl('', Validators.required),
    species: new FormControl('', Validators.required),
    race: new FormControl(),
    sex: new FormControl('', Validators.required),
    color: new FormControl(),
    birthday: new FormControl(),
    avatar: new FormControl(),
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Pet>,
    private dialogRef: MatDialogRef<PetFormComponent>,
  ) { }

  ngOnInit(): void {
    const pet = this.data.formData
    if (pet) {
      const birthday = moment(pet.birthday).toDate()
      this.petForm.patchValue({ ...this.data.formData, birthday, })
    }

  }

  closeDialog(){
    if (!this.petForm.valid) return
    this.dialogRef.close(this.petForm.value)
  }

}
