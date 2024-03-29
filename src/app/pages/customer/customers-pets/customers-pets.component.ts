import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EditCustomerDialogComponent } from 'src/app/components/customer/edit-customer-dialog/edit-customer-dialog.component';
import { Customer } from 'src/app/Models/Customer';
import { Employee } from 'src/app/Models/Employee';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { User } from 'src/app/Models/User';
import { Vet } from 'src/app/Models/Vet';
import { CustomerService } from 'src/app/services/collections/customer.service';
import { PetService } from 'src/app/services/collections/pet.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { ConfirmationDialogData, FormDialogData } from 'src/app/utils';
import { PetFormComponent } from '../../../components/pet/pet-form/pet-form.component';
import { ConfirmationDialogComponent } from '../../../components/utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customers-pets',
  templateUrl: './customers-pets.component.html',
  styleUrls: ['./customers-pets.component.scss']
})
export class CustomersPetsComponent implements OnInit {

  customerId!: string
  customer!: Customer
  user!: SingleResponse<User>
  pets!: Pet[]

  constructor(
    private customerService: CustomerService,
    private petService: PetService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private uiService: UiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('customerId') as string
    this.getCustomer()
  }

  getCustomer() {
    this.customerService.fetchCustomerById(this.customerId)
      .subscribe({
        next: c => {
          this.customer = c
          const pets = c.pets as ListResponse<Pet>
          this.pets = this.spreadPetsAttributes(pets)
          this.user = this.customer.user as SingleResponse<User>
          this.validateCustomerBelongsToVet()
        },
        error: e => {
          this.router.navigate(['customers']).then(() => {
            this.uiService.openNotificationSnackBar('Cliente inexistente', 'warn')
          })
        }
      })
  }

  spreadPetsAttributes(pets: ListResponse<Pet>): Pet[] {
    return pets.data.map((p) => {
      return { id: p.id, ...p.attributes }
    })

  }

  openPetDialog(title: string, pet?: Pet) {
    const data = {
      title,
      formData: pet
    }
    const dialogRef = this.dialog.open(PetFormComponent, { data, minWidth: '50%', maxWidth: '90vw' })
    return dialogRef
  }
  addPet() {
    const dialogRef = this.openPetDialog('Nueva Mascota')
    dialogRef.afterClosed().subscribe((pet: Pet | null) => {
      if (!pet) return
      pet.customer = this.customer.id
      this.petService.createPet(pet).subscribe({
        next: petRes => {
          this.pets.push(petRes)
          this.uiService.openNotificationSnackBar('Mascota creada', 'primary')
        },
        error: err => {
          this.openPetDialog('Nueva Mascota', pet)
          this.uiService.openNotificationSnackBar('Error creando mascota', 'warn')
        }
      })
    })
  }

  editPet(pet: Pet) {
    const dialogRef = this.openPetDialog('Editar Mascota', pet)
    dialogRef.afterClosed().subscribe((petFormValue: Pet | null) => {
      if (!petFormValue) return
      this.petService.updatePet(pet.id as number, petFormValue).subscribe({
        next: petRes => {
          this.pets = this.pets.filter(p => p.id != pet.id)
          this.pets.push(petRes)
          this.uiService.openNotificationSnackBar('Mascota editada', 'primary')
        },
        error: err => {
          this.openPetDialog('Editar Mascota', petFormValue)
          this.uiService.openNotificationSnackBar('Error editando mascota', 'warn')
        }
      })
    })
  }

  deletePet(pet: Pet) {
    const data: ConfirmationDialogData = {
      title: 'Eliminar Mascota',
      message: `¿Está seguro que desea eliminar la mascota <strong>${pet.name}</strong>?`,
      actionName: 'Eliminar',
      actionColor: 'warn'
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data })
    dialogRef.afterClosed().subscribe((resp: boolean) => {
      console.log('resp', resp);
      if (!resp) return
      const petId: number = pet.id as number
      this.petService.deletePet(petId).subscribe({
        next: petRes => {
          this.pets = this.pets.filter(p => p.id != pet.id)
          this.uiService.openNotificationSnackBar('Mascota eliminada', 'primary')
        },
        error: err => {
          this.uiService.openNotificationSnackBar('Error eliminando mascota', 'warn')
        }
      })
    })
  }

  validateCustomerBelongsToVet() {
    const customersVets = this.customer.vets as ListResponse<Vet>
    const customersVetsIds: number[] = customersVets.data.map(v => v.id)
    const employeeLogged = this.storageService.getCurrentEmployee() as Employee
    if (!employeeLogged) return
    const vet = employeeLogged.vet as SingleResponse<Vet>
    if (!customersVetsIds.includes(vet.data.id)) {
      this.router.navigate(['customers']).then(() => {
        this.uiService.openNotificationSnackBar('Cliente inexistente', 'warn')
      })
    }
  }

  onCustomerEdit() {
    const data: FormDialogData<Customer> = {
      formData: this.customer
    }
    this.dialog.open(EditCustomerDialogComponent, { data, minWidth: '50%', maxWidth: '90vw' })
      .afterClosed().subscribe((res: Customer) => {
        this.customer = { ...this.customer, ...res }
      })
  }
}
