"use strict";

const doc = document.getElementById('tbody');
let contact = document.getElementById('contact');
let contact2 = document.getElementById('contact2');
let searchInput = document.getElementById('search');
let body = document.getElementById('forma');
let modal = document.getElementById('myModal');
let span = document.getElementById("close");
let spans = document.getElementById("closes");
let modal2 = document.getElementById('myModal2');
let modal3 = document.getElementById('myModal3');
let form = document.getElementById('form');

const url = new URL('http://localhost:3000/api/clients');

async function linkFunc() {
  let res = await fetch(url).then((resp) => resp.json());
  return res;
}


let searchUrl = new URL(`http://localhost:3000/api/clients`);



async function linkFuncSearch() {
  const res = await fetch(`${searchUrl}`).then((resp) => resp.json());
  return res;

}
const createTr = function (user) {
  let tr = document.createElement('tr');
  let tdId = document.createElement('td');
  tdId.classList.add('index');
  tdId.textContent = user.id;

  let tdName = document.createElement('td');
  tdName.classList.add('naming');
  tdName.textContent = user.surname + ' ' + user.name + ' ' + user.lastName;

  let age = new Date(user.createdAt);
  let tdAge = document.createElement('td');
  tdAge.classList.add('age');
  let hour = age.getHours() + 1;
  let minute = age.getMinutes();
  minute = (minute < 10) ? '0' + minute : minute;
  hour = (hour < 10) ? '0' + hour : hour;

  let date = age.getDate();
  let month = age.getMonth() + 1;
  date = (date < 10) ? '0' + date : date;
  month = (month < 10) ? '0' + month : month;
  let spanAge = document.createElement('span');
  spanAge.classList.add('time');
  tdAge.textContent = date + '.' + month + '.' + age.getFullYear() + ' ';
  spanAge.textContent = hour + ':' + minute;

  let ages = new Date(user.updatedAt);
  let tdTerm = document.createElement('td');
  tdTerm.classList.add('term');
  let dates = ages.getDate();
  let months = ages.getMonth() + 1;
  dates = (dates < 10) ? '0' + dates : dates;
  months = (months < 10) ? '0' + months : months;
  let spanTerm = document.createElement('span');
  spanTerm.classList.add('time');
  let hours = ages.getHours() + 1;
  let minutes = ages.getMinutes();
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  hours = (hours < 10) ? '0' + hours : hours;

  tdTerm.textContent = dates + '.' + months + '.' + ages.getFullYear() + ' ';
  spanTerm.textContent = hours + ':' + minutes;
  let btn = document.createElement('td');
  btn.classList.add('btn__group');

  let btnChange = document.createElement('button');
  btnChange.classList.add('change');
  btnChange.textContent = 'Изменить';
  let btnDelete = document.createElement('button');
  btnDelete.classList.add('delete');
  btnDelete.textContent = 'Удалить';


  tr.append(tdId, tdName, tdAge, tdTerm);
  tdAge.append(spanAge);
  tdTerm.append(spanTerm);

  let contact = user.contacts;

  let tdContact = document.createElement('td');
  tdContact.classList.add('social');
  let divSoc = document.createElement('div');
  divSoc.classList.add('wrapper');
  tdContact.append(divSoc);

  contact.map(function (user) {
    let contactLink = document.createElement('div');
    let spanLink = document.createElement('a');
    spanLink.classList.add('tooltip');
    contactLink.setAttribute("data-tooltip", user.value);
    contactLink.classList = user.type + ' ' + 'hoverme';

    divSoc.append(contactLink);
    spanLink.textContent = user.value;
  });

  let buttonSocial = document.createElement('button');
  buttonSocial.classList.add('buttonSocial');
  buttonSocial.textContent = "+";

  divSoc.append(buttonSocial);
  tr.append(tdContact, btn);
  btn.append(btnChange, btnDelete);
  doc.append(tr);
};

async function filterSearch() {
  doc.innerHTML = '';
  let searchVall = document.getElementById('search').value;
  searchUrl.searchParams.set('search', searchVall);
  let userSearch = await (await linkFuncSearch());
  return userSearch.map(createTr);

}

searchInput.addEventListener(
  "keyup",
  debounce(filterSearch, 2000),
);

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

async function createTab() {
  doc.innerHTML = '';
  let users = await (await linkFunc());
  return users.map(createTr);

}

createTab();

let fillBtn = document.getElementById('fill');
let fillBtn2 = document.getElementById('fill2');
let deliteBtn = document.getElementById('delite2');
let surname = document.getElementById('surname');
let surname2 = document.getElementById('surname2');
let patronymic = document.getElementById('patronymic');
let patronymic2 = document.getElementById('patronymic2');
let nameing = document.getElementById('name');
let nameing2 = document.getElementById('name2');
let deleteContact = document.getElementById('delite3');
let btnAdd = document.getElementById('myBtn');
let wf = document.getElementById('myModal');
let wf2 = document.getElementById('myModal2');
let box = document.getElementById('box');
let box2 = document.getElementById('box2');
let span3 = document.getElementsByClassName("closess")[0];
let cancellation = document.getElementById('back');



let arr = [{
  value: "tell",
  label: "Телефон",
},

{
  value: "mail",
  label: "Email",
},
{
  value: "Vk",
  label: "Vk",
},
{
  value: "Facebook",
  label: "Facebook",
},
{
  value: "client",
  label: "Другое",
},
];

function createSelectEl(arr, str) {

  let select = document.createElement('select');
  select.classList.add('select');

  arr.forEach(function (el) {
    let option = document.createElement('option');
    option.classList.add('option');
    option.value = el.value;
    option.innerHTML = el.label;

    select.appendChild(option);
    if (option.value === str) {
      option.setAttribute('selected', true);
    }
  });

  return select;
}

function testIks() {
  wf.addEventListener('input', function (event) {
    let ar = event.target.value.length;
    console.log(ar === 0);
    if (event.target.classList.contains("input__contact")) {
      if (event.target.value.length >= 1) {
        event.target.classList.add('oko',);
      }
    }
  });
}

function testIks2() {
  wf2.addEventListener('input', function (event) {
    let ar = event.target.value.length;
    console.log(ar === 0);
    if (event.target.classList.contains("input__contact")) {
      if (event.target.value.length >= 1) {
        event.target.classList.add('oko',);
      }
    }
  });
}

function test() {
  let inputContact = document.getElementsByClassName('input__contact');
  for (let i = 0, length = inputContact.length; i < length; i++) {
    if (inputContact[i].value.length >= 0) {
      let imputParent = inputContact[i];
      imputParent.classList.add('oko');
    } else { imputParent.classList.remowe('oko'); }

  }
}



function myFunction() {
  let myCollection = document.getElementsByClassName('div__contact');
  if (myCollection.length >= 1) {
    body.classList.add('on');
  } else {
    body.classList.remove('on');
  }
  if (myCollection.length >= 10) {
    contact.style.display = "none";
  } else {
    contact.style.display = "inline-block";
  }

}

myFunction();

contact.addEventListener('click', function () {
  let div = document.createElement('div');
  div.classList.add('div__contact');
  let input = document.createElement('input');
  input.classList.add('input__contact');
  input.type = 'text';
  let selectDiv = document.createElement('buton');
  selectDiv.classList.add('selectBtn');
  let btnClouse = document.createElement('buton');
  btnClouse.classList.add('btn__clouse');
  btnClouse.classList.add('btn__clouse', 'hovermes');
  btnClouse.setAttribute("data-tooltip", 'Удалить контакт');

  selectDiv.append(createSelectEl(arr, "Телефон"));
  div.append(selectDiv, input, btnClouse);
  box.append(div);

  testIks();


  div.addEventListener('click', function (event) {
    if (event.target.classList == "btn__clouse hovermes") {
      event.path[1].remove();
    }
  });
  return;
});

btnAdd.addEventListener('click', function () {
  modal.style.display = "flex";
  form.reset();
  box.innerHTML = '';
  removeClass();
});


function removeClass() {
  let formItem = document.getElementsByClassName('form__item');
  for (let i = 0, length = formItem.length; i < length; i++) {
    formItem[i].classList.remove('big');

  }
}


document.addEventListener('DOMContentLoaded', function () {
  wf.addEventListener('focusin', function (event) {
    if (event.target.classList == "form-control") {
      event.path[1].classList.add('big');
    }
  });
});



fillBtn.addEventListener('click', async function () {
  let inputContact = document.getElementsByClassName('input__contact');
  let vseParray = Array.from(inputContact);
  let mapP = vseParray.map(t => t.value);
  let selectContact = document.getElementsByClassName('select');
  let selectParray = Array.from(selectContact);
  let mapselec = selectParray.map(t => t.value);
  let narr = [];
  let ser = {};

  for (let i = 0; i < mapselec.length; i++) {
    ser = { 'type': mapselec[i], 'value': mapP[i] };
    narr.push(ser);
  }

  async function loadObj() {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameing.value,
        surname: surname.value,
        lastName: patronymic.value,
        contacts: narr,
      })
    });
    return await response.json();
  }
  const obj = await loadObj();
  createTr(obj);
  modal.style.display = "none";
  box.innerHTML='';
});

let idNum;
let urlTwo;

function hostIner() {
  const parent = event.path;
  const parents = parent[2];
  const ree = parents.getElementsByClassName('index');
  idNum = ree.item(0).innerHTML;
  modal3.style.display = "flex";
  urlTwo = new URL('http://localhost:3000/api/clients/' + `${idNum}`);
}

function hostInerChange() {
  const parent = event.path;
  const parents = parent[2];
  const ree = parents.getElementsByClassName('index');
  idNum = ree.item(0).innerHTML;
  modal2.style.display = "flex";
  urlTwo = new URL('http://localhost:3000/api/clients/' + `${idNum}`);
}


const usersContacts = function (usersContact) {
  let btnClouse = document.createElement('buton');
  btnClouse.classList.add('btn__clouse');
  let div = document.createElement('div');
  div.classList.add('div__contact');
  let input = document.createElement('input');
  input.classList.add('input__contact');
  let select = document.createElement('select');
  select.classList.add('select');
  let selectDiv = document.createElement('buton');
  selectDiv.classList.add('selectBtn');
  input.value = usersContact.value;
  select.value = usersContact.type;
  btnClouse.classList.add('btn__clouse', 'hovermes');
  btnClouse.setAttribute("data-tooltip", 'Удалить контакт');

  selectDiv.append(createSelectEl(arr, usersContact.type));
  div.append(selectDiv, input, btnClouse);
  box2.append(div);
  test();
  div.addEventListener('click', function (event) {
    if (event.target.classList == "btn__clouse hovermes") {
      event.path[1].remove();
    }
  });

  
};

async function createModal() {
  let user = await (await linkFuncFree());
  let idSpan = document.getElementById('span-id2');
  idSpan.innerHTML = user.id;
  let surname = document.getElementById('surname2');
  surname.value = user.surname;
  let nameing = document.getElementById('name2');
  nameing.value = user.name;
  let patronymic = document.getElementById('patronymic2');
  patronymic.value = user.lastName;
  let usersContact = user.contacts;

  let nameingValue = nameing.value;
  let patronymicValue = patronymic.value;
  let surnameValue = surname.value;
  if (surnameValue.length > 0) {
    surname.parentElement.classList.add('big');
  }
  if (nameingValue.length > 0) {
    nameing.parentElement.classList.add('big');
  }
  if (patronymicValue.length > 0) {
    patronymic.parentElement.classList.add('big');
  }
  return usersContact.map(usersContacts);

}

deliteBtn.addEventListener('click', function () {
  modal3.style.display = "flex";
  modal2.style.display = "none";
});



doc.addEventListener("click", function (event) {
  if (event.target.closest('.delete')) {
    hostIner();
  }
});

function linkFuncFree() {
  let res = fetch(urlTwo).then((resp) => resp.json());
  return res;
}

contact2.addEventListener('click', function () {
  let div = document.createElement('div');
  let box2 = document.getElementById('box2');
  div.classList.add('div__contact');
  let input = document.createElement('input');
  input.classList.add('input__contact');
  input.type = 'text';
  let selectDiv = document.createElement('buton');
  selectDiv.classList.add('selectBtn');

  let btnClouse = document.createElement('buton');
  btnClouse.classList.add('btn__clouse', 'hovermes');
  btnClouse.setAttribute("data-tooltip", 'Удалить контакт');

  selectDiv.append(createSelectEl(arr, "Телефон"));
  div.append(selectDiv, input, btnClouse);
  box2.append(div);
  

  testIks2();
  
  div.addEventListener('click', function (event) {
    if (event.target.classList == "btn__clouse hovermes") {
      event.path[1].remove();
    }
  });
  return;
});




doc.addEventListener("click", function (event) {
  if (event.target.closest('.change')) {
    hostInerChange();
    createModal();
    linkFuncFree();
    box2.innerHTML = '';
  
  }
});

fillBtn2.addEventListener('click', async function () {
  let inputContact = document.getElementsByClassName('input__contact');
  let vseParray = Array.from(inputContact);
  let mapP = vseParray.map(t => t.value);
  let selectContact = document.getElementsByClassName('select');
  let selectParray = Array.from(selectContact);
  let mapselec = selectParray.map(t => t.value);
  let narr = [];
  let ser = {};

  for (let i = 0; i < mapselec.length; i++) {
    ser = { 'type': mapselec[i], 'value': mapP[i] };
    narr.push(ser);
  }
  async function changeContact() {
    console.log(narr);
    const response = await fetch(urlTwo, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameing2.value,
        surname: surname2.value,
        lastName: patronymic2.value,
        contacts: narr,
      })
    });
    return await response.json();
  }

  const object = await changeContact();
  createTr(object);
  doc.innerHTML = '';
  modal2.style.display = "none";
  createTab();
  box2.innerHTML='';
});

deleteContact.addEventListener('click', async function () {
  await fetch(urlTwo, {
    method: 'DELETE',
  });
  modal3.style.display = "none";
  doc.innerHTML = '';
  createTab();
});

span.addEventListener('click', function () {
  modal.style.display = "none";
  modal2.style.display = "none";
});

spans.addEventListener('click', function () {
  modal2.style.display = "none";
});


window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
});

span3.addEventListener('click', function () {
  modal3.style.display = "none";
});



cancellation.addEventListener('click', function () {
  modal3.style.display = "none";

});

let blockTwo = document.getElementById('blockTwo');

window.addEventListener("DOMContentLoaded", function () {
  blockTwo.classList.add('loaded_hiding');
  window.setTimeout(function () {
    blockTwo.classList.add('loaded');
    blockTwo.classList.remove('loaded_hiding');
  }, 100);
});

document.addEventListener('DOMContentLoaded', () => {
  const getSort = ({ target }) => {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    if (index <= 3) {
      const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
      const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
      );
      for (const tBody of target.closest('table').tBodies)
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));

      for (const cell of target.parentNode.cells)
        cell.classList.toggle(cell === target);
    }
  };
  document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});