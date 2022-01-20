import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from 'src/app/Models/Pet';

interface PetFormData {
  title: string
  pet?: Pet
}
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
    @Inject(MAT_DIALOG_DATA) public data: PetFormData,
    private dialogRef: MatDialogRef<PetFormComponent>,
  ) { }

  ngOnInit(): void {
    console.log(`this.data`, this.data)
    if(this.data.pet){
      this.petForm.patchValue({
        ...this.data.pet
      })
      this.petForm.markAllAsTouched()
    }
  }

  closeDialog(){
    if (!this.petForm.valid) return
    this.dialogRef.close(this.petForm.value)
  }

}
