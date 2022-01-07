"use strict";

const doc = document.getElementById('tbody');
let contact = document.getElementById('contact');
let searchInput = document.getElementById('search');
let body = document.getElementById('forma');
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
let win = document.getElementsByClassName('form__change');

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
}

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
let deliteBtn = document.getElementById('delite');
let surname = document.getElementById('surname');
let cancel = document.getElementById('cancel');
let patronymic = document.getElementById('patronymic');
let nameing = document.getElementById('name');
let deleteContact = document.getElementById('delite3');

doc.addEventListener("click", function (event) {
  if (event.target.closest('.delete')) {
    let parent = event.path;
    let parents = parent[2];
    console.log(parents);
    let ree = parents.getElementsByClassName('index');
    let idNum = ree.item(0).innerHTML;
    modal3.style.display = "flex";
    let urlTwo = new URL('http://localhost:3000/api/clients/' + `${idNum}`);

    deleteContact.addEventListener('click', function () {
      function deleteItem() {
        fetch(urlTwo, {
          method: 'DELETE',
        });
      }

      modal3.style.display = "none";
      deleteItem();
      doc.innerHTML = '';
      createTab();
      // document.location.reload();
    });

  }

});


let names = document.getElementById('names');
let patronymics = document.getElementById('patronymics');
let surnames = document.getElementById('surnames');
let header = document.getElementById('header');
let modal3 = document.getElementById('myModal3');
let span3 = document.getElementsByClassName("closess")[0];
let cancellation = document.getElementById('back');
let spanId = document.getElementById('id');

window.addEventListener('click', function (event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }

});

cancellation.addEventListener('click', function () {
  modal3.style.display = "none";

});

cancel.addEventListener('click', function () {
  modal.style.display = "none";
  win.innerHTML = "";
  modal.style.display = "none";
});

span3.addEventListener('click', function () {
  modal3.style.display = "none";

});

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

window.addEventListener("click", function (event) {
  if (event.target.closest('.change')) {
    modal.style.display = "flex";
    header.innerHTML = "Изменить контакт";
    spanId.innerHTML = "ID:";
    cancel.style.display = "none";
    let parent = event.path;
    let parents = parent[2];
    let rees = parents.getElementsByClassName('index');
    let idNum = rees.item(0).innerHTML;
    let urlTwo = new URL('http://localhost:3000/api/clients/' + `${idNum}`);

    function linkFuncFree() {
      let res = fetch(urlTwo).then((resp) => resp.json());
      return res;
    }
    linkFuncFree();



    async function createModal() {
      let user = await (await linkFuncFree());
      let idSpan = document.getElementById('span-id');
      idSpan.innerHTML = user.id;
      let surname = document.getElementById('surname');
      surname.value = user.surname;
      let nameing = document.getElementById('name');
      nameing.value = user.name;
      let patronymic = document.getElementById('patronymic');
      patronymic.value = user.lastName;
      let usersContact = user.contacts;
      let nameingValue = nameing.value;
      let patronymicValue = patronymic.value;
      let surnameValue = surname.value;

      let contact = document.getElementById('contact');

      contact.addEventListener('click', function () {
        let div = document.createElement('div');
        let box = document.getElementById('box');
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
        box.append(div);

        test();
        testIks();

        div.addEventListener('click', function (event) {
          if (event.target.classList == "btn__clouse hovermes") {
            event.path[1].remove();
          }
        });

        return;
      });
      usersContact.map(function (usersContacts) {
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
        input.value = usersContacts.value;
        select.value = usersContacts.type;
        btnClouse.classList.add('btn__clouse', 'hovermes');
        btnClouse.setAttribute("data-tooltip", 'Удалить контакт');

        selectDiv.append(createSelectEl(arr, usersContacts.type));
        div.append(selectDiv, input, btnClouse);
        box.append(div);

        div.addEventListener('click', function (event) {
          if (event.target.classList == "btn__clouse hovermes") {
            event.path[1].remove();
          }
        });
      });

      test();

      if (surnameValue.length > 0) {
        surnames.style.fontSize = '10px';
        surnames.style.lineHeight = '14px';
        surname.style.height = '24px';
      }
      if (nameingValue.length > 0) {
        names.style.fontSize = '10px';
        names.style.lineHeight = '14px';
        nameing.style.height = '24px';
      }
      if (patronymicValue.length > 0) {
        patronymics.style.fontSize = '10px';
        patronymics.style.lineHeight = '14px';
        patronymic.style.height = '24px';
      }
      return;
    }


    createModal();


    let urlFree = new URL('http://localhost:3000/api/clients/' + `${idNum}`);
    deleteContact.addEventListener('click', function () {
      function deleteItems() {
        fetch(urlFree, {
          method: 'DELETE',
        });
      }

      modal3.style.display = "none";
      deleteItems();
      doc.innerHTML = '';
      createTab();
      //document.location.reload();
    });
    fillBtn.addEventListener('click', function () {
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
      function changeContact() {
        fetch(urlFree, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameing.value,
            surname: surname.value,
            lastName: patronymic.value,
            contacts: narr,
          })
        });

      }
      changeContact();
      doc.innerHTML = '';
      // createTab();

      //document.location.reload();
    });
    deliteBtn.addEventListener('click', function () {
      modal3.style.display = "flex";
      modal.style.display = "none";
    });
  }

  if (event.target.closest('.btn_click')) {
    modal.style.display = "flex";
    header.innerHTML = "Новый контакт";
    deliteBtn.style.display = "none";
    spanId.innerHTML = "";
    let idSpan = document.getElementById('span-id');
    idSpan.innerHTML = "";
    surname.value = "";
    nameing.value = "";
    patronymic.value = "";
    let headerForm = document.getElementsByClassName('header__form ');

    for (let i = 0, length = headerForm.length; i < length; i++) {
      headerForm[i].style.fontSize = '14px';
      headerForm[i].style.lineHeight = '19px';
    }
    let formControl = document.getElementsByClassName('form-control');
    for (let i = 0, length = formControl.length; i < length; i++) {
      formControl[i].style.height = '4px';

    }
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

       function loadObj() {
        return fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameing.value,
            surname: surname.value,
            lastName: patronymic.value,
            contacts: narr,
          })
        }).then(response => response.json());

      }

      const obj = await loadObj();
      createTr(obj)
      modal.style.display = "none";
      //doc.innerHTML = '';
      //createTab();
      //document.location.reload();
    });
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

  } myFunction();
});

window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = "none";

    doc.innerHTML = '';
    createTab();
    //document.location.reload();
  }
});

span.addEventListener('click', function () {  
  modal.style.display = "none";
  doc.innerHTML = '';
  createTab();
  //document.location.reload();
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

let wf = document.getElementById('myModal');

document.addEventListener('DOMContentLoaded', function () {
  wf.addEventListener('focusin', function (event) {
    if (event.target.classList == "form-control") {
      event.path[1].classList.add('big');
      console.log(event.path[1]);
    }
  });
});

function test() {
  let inputContact = document.getElementsByClassName('input__contact');
  for (let i = 0, length = inputContact.length; i < length; i++) {
    console.log(inputContact[i].value);
    if (inputContact[i].value.length >= 0) {
      let imputParent = inputContact[i];
      imputParent.classList.add('oko');
    } else { imputParent.classList.remowe('oko'); }

  }
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


let blockTwo = document.getElementById('blockTwo');
window.addEventListener("DOMContentLoaded",function () {
  blockTwo.classList.add('loaded_hiding');
  window.setTimeout(function () {
    blockTwo.classList.add('loaded');
    blockTwo.classList.remove('loaded_hiding');
  }, 100);
});



