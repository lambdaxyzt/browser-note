//variable
const noteList = document.getElementsByClassName('note__list--ul')[0];


//event listeners
// form submit
document.querySelector('form').addEventListener('submit',newNote);
//remove note
document.querySelector('.note__list').addEventListener('click',removeNote)

//get data from local storage on document load
document.addEventListener('DOMContentLoaded', localStorageOnLoad)

//get data from local storage on load
function localStorageOnLoad(){
    const note = getNoteFromLocalStorage();

    //print each item of note array 
    note.forEach ( function(note) {

        //create remove element 
        const removeBtn = document.createElement('a');
        removeBtn.textContent = 'X';
        removeBtn.classList.add('remove-btn');
        
        //create text element
        const spanText = document.createElement('span');
        spanText.textContent=note;
        
        //create li tag for note__list
        const li = document.createElement('li');

        
        //adding removeBtn and spanText to li
        li.appendChild(spanText);
        li.appendChild(removeBtn);

        //add class to li
        li.classList.add('note__list--li');

        //adding li to note list
        noteList.appendChild(li);
    })
}

// adding new note to list
function newNote(e){
    e.preventDefault();
    // access to the value 
    let textarea = document.getElementById('note');
    let value = textarea.value;

    //create remove element 
    const removeBtn = document.createElement('a');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove-btn')
    
    //create text element
    const spanText = document.createElement('span')
    spanText.textContent=value
    
    //create li tag for note__list
    const li = document.createElement('li');

    
    //adding removeBtn and spanText to li
    li.appendChild(spanText);
    li.appendChild(removeBtn);

    //add class to li
    li.classList.add('note__list--li')

    //adding li to note list
    noteList.appendChild(li);
    textarea.value = '';

    //add note to local storage
    addToLocalStorage(value)

}


//remove note from list
function removeNote(e)  {
    if(e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
        let noteContent = e.target.parentElement.textContent;
        noteContent = noteContent.substring(0 ,  noteContent.length - 1); 
        let note = getNoteFromLocalStorage();
        note.forEach((note_item,index) => {
            if(note_item == noteContent) {
                note.splice(index,1) 
            }
        })
        localStorage.setItem('note',JSON.stringify(note));
    }
}

//add note to local storage function
function addToLocalStorage (value) {
    // get note from localStorage
    const note = getNoteFromLocalStorage();

    //add new note to note array
    note.push(value);

    // add new note array to local storage
    localStorage.setItem('note',JSON.stringify(note))
}

//get note from local storage
function getNoteFromLocalStorage() {
    //get previous note from localstorage 
    let note = localStorage.getItem('note');
    if (note == null) {
        //if not exist create empty array
        note = [];
    } else {
        // if exist convert to array
        note = JSON.parse(note)
    }
    return note;
}


