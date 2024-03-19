class PetStore {
    constructor(id, name, address, city, state, zip, phone) {
        this.petStoreId = id;
        this.petStoreName = name;
        this.petStoreAddress = address
        this.petStoreCity = city;
        this.petStoreState = state;
        this.petStoreZip = zip;
        this.petStorePhone = phone;
        this.employees = [];
    }

    addEmployee(firstName, lastName, phone, title) {
        let id = null;
        this.employees.push(new Employee(id, firstName, lastName, phone, title));
    }
}

class Employee {
    constructor(id, firstName, lastName, phone, title) {
        this.employeeId = id;
        this.employeeFirstName = firstName;
        this.employeeLastName = lastName;
        this.employeePhone = phone;
        this.employeeJobTitle = title;
    }
}

class PetStoreService {
    static url = 'http://localhost:8080/pet_store/pet_store';

    static getAllPetStores() {
        return $.ajax({
            url: this.url,
            dataType: 'json',
            contentType: 'application/json',
            type: 'GET'
        });
    }

    static getPetStore(id) {
        return $.get(this.url + `/${id}`);
    }

    static createPetStore(petStore) {
        return $.ajax({
            url: this.url,
            dataType: 'json',
            data: JSON.stringify(petStore),
            contentType: 'application/json',
            type: 'POST'
        });
    }

    static updatePetStore(petStore) {
        return $.ajax({
            url: this.url + `/${petStore.petStoreId}`,
            dataType: 'json',
            data: JSON.stringify(petStore),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static createEmployee(petStoreId, employee) {
        return $.ajax({
            url: this.url + `/${petStoreId}/employee`,
            dataType: 'json',
            data: JSON.stringify(employee),
            contentType: 'application/json',
            type: 'POST'
        });
    }

    static deletePetStore(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static petStores;

    static getAllPetStores() {
        PetStoreService.getAllPetStores().then(petStores => this.render(petStores));
    }

    static createPetStore(name, address, city, state, zip, phone) {
        let id = null;
        PetStoreService.createPetStore(new PetStore(id, name, address, city, state, zip, phone))
            .then(() => {
                return PetStoreService.getAllPetStores();
            })
            .then((petStores) => this.render(petStores));
    }

    static updatePetStore(id, phone) {
        for (let petStore of this.petStores) {
            if (petStore.petStoreId == id) {
                petStore.petStorePhone = phone;
                PetStoreService.updatePetStore(petStore)
                    .then(() => {
                        return PetStoreService.getAllPetStores();
                    })
                    .then((petStores) => this.render(petStores));
            }
        }
    }

    static deletePetStore(id) {
        PetStoreService.deletePetStore(id)
            .then(() => {
                return PetStoreService.getAllPetStores();
            })
            .then((petStores) => this.render(petStores));
    }

    static addEmployee(id) {
        for (let petStore of this.petStores) {
            if (petStore.petStoreId == id) {
                let employeeId = null;
                let employee = new Employee( employeeId
                                            , $(`#${petStore.petStoreId}-employee-first-name`).val()
                                            , $(`#${petStore.petStoreId}-employee-last-name`).val()
                                            , $(`#${petStore.petStoreId}-employee-phone`).val()
                                            , $(`#${petStore.petStoreId}-employee-title`).val());
                PetStoreService.createEmployee(petStore.petStoreId, employee)
                    .then(() => {
                        return PetStoreService.getAllPetStores();
                    })
                    .then((petStores) => this.render(petStores));
            }
        }
    }

    // static deleteEmployee(petStoreId, employeeId) {
    //     for (let petStore of this.petStores) {
    //         if (petStore.petStoreId == petStoreId) {
    //             for (let employee of petStore.employees) {
    //                 if (employee.employeeId == employeeId) {
    //                     petStore.employees.splice(petStore.employees.indexOf(employee), 1);
    //                     PetStoreService.updatePetStore(petStore)
    //                         .then(() => {
    //                             return PetStoreService.getAllPetStores();
    //                         })
    //                         .then((petStores) => this.render(petStores));
    //                 }
    //             }
    //         }
    //     }
    // }

    static render(petStores) {
        this.petStores = petStores;
        $('#app').empty();
        for (let petStore of petStores) {
            $('#app').prepend(
                `<div id="${petStore.petStoreId}" class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                <h2>${petStore.petStoreName}</h2>
                            </div>
                            <div class="col">
                                <button class="btn btn-danger" onclick="DOMManager.deletePetStore('${petStore.petStoreId}')">Delete</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class = "col">
                                <input type="text" id="change-petstore-phone" class="form-control form-control-sm mt-3" placeholder="Change Phone">
                            </div>
                            <div class = "col">
                                <button class="btn btn-primary" onclick="DOMManager.updatePetStore('${petStore.petStoreId}', document.getElementById('change-petstore-phone').value)">Update</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row>
                                <div class="col-sm">
                                    <input type="text" id="${petStore.petStoreId}-employee-first-name" class="form-control" placeholder="Employee First Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${petStore.petStoreId}-employee-last-name" class="form-control" placeholder="Employee Last Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${petStore.petStoreId}-employee-phone" class="form-control" placeholder="Employee Phone">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${petStore.petStoreId}-employee-title" class="form-control" placeholder="Employee Title">
                                </div>
                            </div>
                            <button id="${petStore.petStoreId}-new-employee" onclick="DOMManager.addEmployee('${petStore.petStoreId}')" class="btn btn-primary form-control btn-sm mt-3 mb-5">Add</button>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Title</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div><br>`                
            );
            for (let employee of petStore.employees) {
                $(`#${petStore.petStoreId}`).find('#table-body').append(
                    `<tr><td id="first-name-${employee.employeeId}">${employee.employeeFirstName}</td>
                     <td id="last-name-${employee.employeeId}">${employee.employeeLastName}</td>
                     <td id="phone-${employee.employeeId}">${employee.employeePhone}</td>
                     <td id="title-${employee.employeeId}">${employee.employeeJobTitle}</td></tr>`
                    //  <td><button class="btn btn-danger" onclick="DOMManager.deleteEmployee('${petStore.petStoreId}', '${employee.employeeId}')">Delete Employee</button></td></tr>`
                    //     <span id="first-name-${employee.employeeId}"><strong>First Name: </strong> ${employee.employeeFirstName}</span>
                    //     <span id="last-name-${employee.employeeId}"><strong>Last Name: </strong> ${employee.employeeLastName}</span>
                    //     <span id="phone-${employee.employeeId}"><strong>Phone: </strong> ${employee.employeePhone}</span>
                    //     <span id="title-${employee.employeeId}"><strong>Title: </strong> ${employee.employeeJobTitle}</span>
                    //     <button class="btn btn-danger" onclick="DOMManager.deleteEmployee('${petStore.petStoreId}', '${employee.employeeId}')">Delete Employee</button>
                    // </p>`
                );
                }
            }
        }
    }

$('#create-new-petstore').on('click', () => {
    DOMManager.createPetStore(   $('#new-petstore-name').val()
                                ,$('#new-petstore-address').val()
                                ,$('#new-petstore-city').val()
                                ,$('#new-petstore-state').val()
                                ,$('#new-petstore-zip').val()
                                ,$('#new-petstore-phone').val());
    $('#new-petstore-name').val('');
    $('#new-petstore-address').val('');
    $('#new-petstore-city').val('');
    $('#new-petstore-state').val('');
    $('#new-petstore-zip').val('');
    $('#new-petstore-phone').val('');
})

DOMManager.getAllPetStores();