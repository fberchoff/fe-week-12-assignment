

# Front End week 12 - Pet Store Application

This is a Pet Store application for the front end week #12 coding assignment.


## Features

- Add a new pet store.
- Add an employee to a pet store.
- Update the phone number of a pet store.
- Delete a pet store.



## Features

- Create and delete students
- Record classes that students are registered to. Each class includes the class name, section, professor, and grade.


## Installation

- This application uses the Pet Store API that was created as part of Promineo Tech's Back End Java course.  You must clone the GitHub repository to your IDE and run it as a Java application before using the front-end piece.  The back-end API repository can be found at https://github.com/fberchoff/pet-store-api.git .
```
    
## Usage/Examples

The back-end Pet Store API uses an H2 in-memory database. After making changes to the data via the front-end application, you can verify the data in the following ways.

- Use the following endpoint to view all of the database's underlying data. If you do this using the Microsoft Edge browser, the data will be formatted for easy reading.

http://localhost:8080/pet_store/pet_store

- Use the H2 console. In a web browser, you can bring up the following URL to use the console:

http://localhost:8080/h2-console

- You can leave most of the settings to their default values. However, the JDBC URL should be set to: 

jdbc:h2:mem:pet_store;MODE=MYSQL

- Once connected, you can query the PET_STORE and EMPLOYEE tables to view the data.
