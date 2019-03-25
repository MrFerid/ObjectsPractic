'use strict'

function Academy(name,address){
     this.name = name,
     this.address = address,
     this.students = [],
     this.teachers = [],
     this.rooms = [],
     this.groups = [],
     this.addStudent = function(student){
        this.students.push(student);
    },
    this.addTeacher = function(teacher){
        this.teachers.push(teacher);
    },
    this.addRoom = function(room){
        this.rooms.push(room);
    },
    this.addGroup = function(group){
        this.groups.push(group);
    }
}


function Address(street,city,country){
    this.street = street,
    this.city = city,
    this.country = country
}

function Room(id,name,capacity){
    this.id = id,
    this.name = name,
    this.capacity = capacity
}

function Group(id,name,room){
    this.id = id,
    this.name = name,
    this.room = room // object room
}

function Teacher(id,name,surname,email){
    this.id = id,
    this.name = name,
    this.surname = surname,
    this.email = email,
    this.groups = [],
    this.addGroup = function(group){
        this.groups.push(group);
        }
}

function Student(id,name,surname,email,address){
    this.id = id,
    this.name = name,
    this.surname = surname,
    this.email = email,
    this.address = address,
    this.username = function(){
        return name + ' ' + surname;
    }
} 

function Address(street,city,country){
    this.street = street,
    this.city = city,
    this.country = country
}

   // ---------------------------- Begin function runs on page load

function init(){
    let academyAddress = new Address("Nizami street", "Baku", "Azerbaijan"); 
    window.myAcademy = new Academy('Code Academy',academyAddress);  
}



                // Students --------------------------------------------------
let studentID = 0;
function saveStudent(){
    event.preventDefault(); // - bu a-ya basanda sehifenin basha tullanmamagi ucundu
    studentID++;

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let street = document.getElementById("street").value;
    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;
    let ul = document.querySelector('.studentList');

    let address = new Address(street,city,country);
    let student = new Student(studentID,name,surname,email,address);
 
    myAcademy.addStudent(student);

        let li = "";
        for(let i=0; i<myAcademy.students.length; i++){
            li += '<li class="list-group-item ">';
            li += myAcademy.students[i].id + '. ' + myAcademy.students[i].name + ' ' + myAcademy.students[i].surname + ' - ' + myAcademy.students[i].address.city;
            li += '</li>'
        }
        ul.innerHTML = li;
        statistic();
        reset('student');
}


            // ROOMS --------------------------------------------------

let roomID = 0;
function saveRoom(){
    event.preventDefault();
    roomID++;

    let name = document.getElementById("r-name").value;
    let capacity = document.getElementById("capacity").value;
    let ul = document.querySelector('.roomList');

    let room = new Room(roomID,name,capacity);
    
    myAcademy.addRoom(room);


    let li = "";
    for(let i=0; i<myAcademy.rooms.length; i++){
        li += '<li class="list-group-item ">';
        li += myAcademy.rooms[i].id + '. ' + myAcademy.rooms[i].name + ' - ' + myAcademy.rooms[i].capacity;
        li += '</li>'
    }
    ul.innerHTML = li;

                   // Sendings room name to selectbox options of groups
    let select = document.getElementById("g-room");
    let opt = "";
    for(let i=0; i<myAcademy.rooms.length; i++){
        opt += '<option value="'+ roomID +'">';
        opt += myAcademy.rooms[i].name;
        opt += '</option>'
    }
    select.innerHTML = opt;
    statistic();
    reset('room');
}



                        // Group --------------------------------------------------
let groupID = 0;
function saveGroup(){
    event.preventDefault();
    groupID++;

    let name = document.getElementById("g-name").value;
    let g_roomId = document.getElementById("g-room").value;
    let ul = document.querySelector('.gList');
    let roomObj = {};
                                    // Getting this room object from myAcademy object
    for(let i=0; i<myAcademy.rooms.length;i++){
        if(myAcademy.rooms[i].id == g_roomId){
            roomObj = myAcademy.rooms[i];
        }
    }

    let myGroup = new Group(groupID,name,roomObj);

    myAcademy.addGroup(myGroup);
        let li = "";
        for(let i=0; i<myAcademy.groups.length; i++){
            li += '<li class="list-group-item ">';
            li += myAcademy.groups[i].id + '. ' + myAcademy.groups[i].name + ' ' + myAcademy.groups[i].room.name;
            li += '</li>'
        }
        ul.innerHTML = li;
        statistic();


         // Sendings group name to selectbox options of teachers
         let select = document.getElementById('t-groups');
         let opt = "";
         for(let i=0; i<myAcademy.groups.length; i++){
             opt += '<option value="'+ groupID +'">';
             opt += myAcademy.groups[i].name;
             opt += '</option>'
         }
         select.innerHTML = opt;
         statistic();
         reset('group');

}


                                        // Teachers --------------------------------------------------
let teacherID = 0;
function saveTeacher(event){
    event.preventDefault();
    teacherID++;

    let name = document.getElementById("t-name").value;
    let surname = document.getElementById("t-surname").value;
    let email = document.getElementById("t-email").value;
    let select = document.getElementById("t-groups");
    let div = document.querySelector('.teacherList');

    let options = select && select.options;

    let teacher = new Teacher(teacherID,name,surname,email);
    
    // getting only selected options between all options
    for (let i=0; i<options.length; i++) {
        if (options[i].selected) {
            teacher.addGroup(options[i].value || options[i].text);
        }
    }
 
    myAcademy.addTeacher(teacher);

        let li = "";
        for(let i=0; i<myAcademy.teachers.length; i++){

            li += '<li class="list-group-item ">'+ myAcademy.teachers[i].id + '. ' + 
                                                   myAcademy.teachers[i].name  + ' ' + 
                                                   myAcademy.teachers[i].surname  + ' - ' + 
                                                   myAcademy.teachers[i].email + '<br> Groups: </li>';

                for(let y =0; y < myAcademy.teachers[i].groups.length; y++){

                        let gr = myAcademy.teachers[i].groups[y];
                        
                        li += '<li class="list-group-item ">'+ myAcademy.teachers[i].groups[y] + ' - ' + myAcademy.groups[y].room.name +
                                '<div class="badge badge-info">' + myAcademy.groups[y].room.capacity + '</div></li>';
                }
        }
        
        let ul = '<ul class="list-group">' + li + '</ul>';
        div.innerHTML = ul;
        statistic();
        reset('teacher');
}


// -------------------- General counter function for header

function statistic(){
    let students = document.querySelector('.studentCount');
    let teachers = document.querySelector('.teacherCount');
    let groups = document.querySelector('.groupCount');
    let rooms = document.querySelector('.roomCount');

    students.innerHTML = myAcademy.students.length || 0;
    teachers.innerHTML = myAcademy.teachers.length || 0;
    groups.innerHTML = myAcademy.groups.length || 0;
    rooms.innerHTML = myAcademy.rooms.length || 0;

    console.log(myAcademy.teachers.length);
}


// -------------------- delete data from inputs

function reset(form){
    
    switch(form){
        case 'student':
        document.getElementById("name").value = '';
        document.getElementById("surname").value = '';
        document.getElementById("email").value = '';
        document.getElementById("street").value = '';
        document.getElementById("city").value = '';
        document.getElementById("country").value = '';
      break;
      case 'room':
        document.getElementById("r-name").value = '';
        document.getElementById("capacity").value = '';
      break;
      case 'group':
        document.getElementById("g-name").value = '';
        //let g_roomId = document.getElementById("g-room").value = '';
      break;
      case 'teacher':
        document.getElementById("t-name").value = '';
        document.getElementById("t-surname").value = '';
        document.getElementById("t-email").value = '';
        //let select = document.getElementById("t-groups") = '';
     break;
    }
}