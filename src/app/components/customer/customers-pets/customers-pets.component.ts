import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Customer } from 'src/app/Models/Customer';
import { Employee } from 'src/app/Models/Employee';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { User } from 'src/app/Models/User';
import { Vet } from 'src/app/Models/Vet';
import { CustomerService } from 'src/app/services/collections/customer.service';
import { PetService } from 'src/app/services/collections/pet.service';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';
import { PetFormComponent } from '../../pet/pet-form/pet-form.component';

@Component({
  selector: 'app-customers-pets',
  templateUrl: './customers-pets.component.html',
  styleUrls: ['./customers-pets.component.scss']
})
export class CustomersPetsComponent implements OnInit {

  customerId!: string
  customer!: SingleResponse<Customer>
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
          const pets = c.data.attributes.pets as ListResponse<Pet>
          this.pets = this.spreadPetsAttributes(pets)
          this.user = this.customer.data.attributes.user as SingleResponse<User>
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

  openPetDialog(pet?: Pet) {
    const data = {
      title: 'Nueva Mascota',
      pet
    }
    const dialogRef = this.dialog.open(PetFormComponent, { data, minWidth: '50%', maxWidth: '90vw' })
    dialogRef.afterClosed().subscribe((petForm: FormGroup) => {
      if (!petForm) return
      if (!petForm.valid) {
        this.openPetDialog(petForm.value)
        this.uiService.openNotificationSnackBar('Formulario inválido', 'warn')
        return
      }
      this.addPet(petForm.value)
    })
  }
  addPet(pet: Pet) {
    pet.customer = this.customer.data.id
    this.petService.createPet(pet).subscribe({
      next: petRes => {
        this.pets.push({ id: petRes.data.id, ...petRes.data.attributes })
        this.uiService.openNotificationSnackBar('Mascota creada', 'primary')
      },
      error: err => {
        this.openPetDialog(pet)
        this.uiService.openNotificationSnackBar('Error creando mascota', 'warn')
      }
    })
  }

  validateCustomerBelongsToVet() {
    const customersVets = this.customer.data.attributes.vets as ListResponse<Vet>
    const customersVetsIds: number[] = customersVets.data.map(v => v.id)
    const employeeLoged = this.storageService.getCurrentEmployee() as ListResponse<Employee>
    const vet = employeeLoged.data[0].attributes.vet as SingleResponse<Vet>
    if (!customersVetsIds.includes(vet.data.id)) {
      this.router.navigate(['customers']).then(() => {
        this.uiService.openNotificationSnackBar('Cliente inexistente', 'warn')
      })
    }
  }
}
