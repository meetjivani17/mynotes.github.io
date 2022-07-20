// console.log("hiiii");
let addbtn = document.getElementById("addBtn");
shownotes();


addbtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    if (addTitle.value == "" || addTxt.value == "") {
        alert("Somthing is empty! Plz..Enter a valid content")
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    if (addTitle.value != "" || addTxt.value != "") {
        notesobj.push(addTitle.value)
        notesobj.push(addTxt.value)
    }
    for (j = 0; j < notesobj.length; j++) {
        if (notesobj[j] != "") {
            localStorage.setItem("notes", JSON.stringify(notesobj))
        }
    }

    addTitle.value = ""
    addTxt.value = ""
    shownotes();
})

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    let html = ''
    for (let i = 0; i < notesobj.length; i += 2) {
        html += `
        <div id= "notecard"; class="noteCard shadow m-3 " style="width: 18rem;">
        <div class="card-body">
          <p class="card-title" style="font-weight: bold;">${notesobj[i]}</p>
          <p class="card-text">${notesobj[i + 1]}</p>
          <a id=${i + 1} type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@mdo" onclick="editNote(this.id)">Edit</a>
          <a id=${i} onclick="deleteNote(this.id)" class="btn btn-dark">Delete</a>
        </div>
      </div>
          `
    }
    let notesEle = document.getElementById("notes")
    if (notesobj.length != 0) {
        notesEle.innerHTML = html
    }
    else {
        notesEle.innerHTML = `Oops! Nothing To show here..Plz add your note!`
    }
    console.log(notesobj)
}

function deleteNote(i) {
    let notes = localStorage.getItem('notes');
    console.log(i)
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(i, 2);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    console.log(notesobj)
    shownotes()
}

var index = 0;
function editNote(i) {
    // console.log(i)
    let editTitle = document.getElementById("editTitle")
    let editTxt = document.getElementById("editTxt")
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    // console.log(notesobj)

    editTitle.value = notesobj[i - 1];
    editTxt.value = notesobj[i];
    index = i
}

let saveNote = document.getElementById("saveNote")
saveNote.addEventListener("click", function () {
    let i = index
    let title = document.getElementById('editTitle');
    let txt = document.getElementById('editTxt');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj[i - 1] = title.value;
    notesobj[i] = txt.value;

    if (title.value == "" || txt.value == "") {
        alert("Somthing is empty! Plz..Enter a valid content")
    }
    else {
        localStorage.setItem("notes", JSON.stringify(notesobj));
        console.log(notes)
        title.innerHTML = '';
        txt.innerHTML = '';
        shownotes()
    }
})


let searchTxt = document.getElementById("searchTxt")
searchTxt.addEventListener("input", function () {

    let inputVal = searchTxt.value.toLowerCase();
    let card = document.getElementsByClassName("noteCard")
    // console.log(inputVal)
    // console.log(card)
    Array.from(card).forEach(function (element) {
        let title = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let txt = element.getElementsByTagName('p')[1].innerText.toLowerCase();

        if (title.includes(inputVal) || txt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }

    })
})

