import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
/*Work on delete btn
*back for the text area
* do something interesting withv the cards
*/


const showDetailsForm=  document.querySelector(".plus-con");
const ongoingCon = document.querySelector('.ongoing-card-container');
const ongoingTask = document.querySelector('.ongoing-task');
const getDetails= document.querySelector('.get-details')
const main = document.querySelector('main');
const closeIcon = document.querySelector('.close')
const saveAdd = document.querySelector('.save')
const urgencyLev = document.querySelector('#ugerncy-level');

const eventInput = document.querySelector('.event');
  
const startTime =  document.querySelector('.start-time');
const endTime =  document.querySelector('.end-time');
const date = document.querySelector('.date');
const name1 = document.querySelector('.input-name');
 const saveName = document.querySelector('.name-add');
 const showName = document.querySelector('.name');
 const nameCon = document.querySelector('.name-con');
 const ongoingSee = document.querySelector('.ongoing-see');
 const note = document.querySelector('.note');
 const todaysDate = document.querySelector('.todaysDate');
 
 const today =dayjs()
 const todayFormatted = today.format('ddd MMM D YYYY');
 todaysDate.innerText = todayFormatted;

let userName = JSON.parse(localStorage.getItem('userName')) || addUserName() ;




function saveToStorageName() {

  localStorage.setItem('userName', JSON.stringify(userName));
}
renderName()

function addUserName(){
  main.classList.add('noshow')
  nameCon.classList.remove('noshow')
  name1.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      userName = name1.value;
     
      if (userName !== "") {
        userName.charAt(0).toUpperCase() + userName.slice(1);
      renderName()
      nameCon.classList.add('noshow');
      main.classList.remove('noshow')
      
      saveToStorageName()
      }
     

    }
  })




  saveName.addEventListener("click", () => {
    userName = name1.value;
    
    if (userName !== "") {
       userName.charAt(0).toUpperCase() + userName.slice(1);
     renderName()
      nameCon.classList.add('noshow');
      main.classList.remove('noshow')
      saveToStorageName()
      }
  })
 

}

function renderName() {
   showName.innerHTML = userName;
}




let taskDetails = JSON.parse(localStorage.getItem('taskDetails')) || [] ;

function ongoingSeeFunc() {
  let ongoingShow = ongoingSee;
  if (!Object.keys(taskDetails).length) {
    ongoingShow.innerText = "Add Event";
  } else if (Object.keys(taskDetails).length <= 2) {
     ongoingShow.innerText = "Add More Events";
  } else if (Object.keys(taskDetails).length > 2) {
     ongoingShow.innerText = "See All";
     ongoingShow.classList.add("see-all")
    
    observer()

      if (ongoingShow.innerText === "See All") {
    ongoingShow.addEventListener('click', () => {
       
     window.scrollTo(0, document.body.scrollHeight)
     
  
    })
   
  }
    
  }

 
}
ongoingSeeFunc()

function totalNumberOfTodo() {
  let total = 0;
  taskDetails.forEach(details => {
    total ++
  })
  document.querySelector('.notification').innerHTML= total;

  saveToStorage()
  return total;
}

function notificationDisplay() {
  const listTotal = totalNumberOfTodo();
  if (listTotal === 0) {

    document.querySelector('.reminder-icon').classList.add('noshow')
  }else{
        document.querySelector('.reminder-icon').classList.remove('noshow')
  }
  
}
notificationDisplay();
function saveToStorage() { 
  localStorage.setItem('taskDetails', JSON.stringify(taskDetails)) ;
  
};



showDetailsForm.addEventListener('click', showForm);



function showForm() {
  main.classList.add('noshow');
  getDetails.classList.add('show');
 
}


closeIcon.addEventListener('click', closeForm);

function closeForm() {
  getDetails.classList.remove('show');
  main.classList.remove('noshow')
}



saveAdd.addEventListener('click', saveFunc);





function saveFunc() {


    let task = eventInput.value;
    let urgency = urgencyLev.value;
    let timeStarted = startTime.value;
    let endingTime = endTime.value;
    let end01 = date.value;
    let endingDate = dayjs(end01).format('ddd DD MMM');
  

    
    if ( task !== '' && end01 !=='' ) {
     task.charAt(0).toUpperCase() + task.slice(1);
   taskDetails.unshift({task, urgency,timeStarted,endingTime,endingDate});
  

      
         getDetails.classList.remove('show');
         main.classList.remove('noshow')

          renderTodo();
         
         eventInput.value = '';
        totalNumberOfTodo()
             saveToStorage();
    }else {
      const errorText = document.querySelector('.error');
      errorText.innerText = "You must input an event and date"
      setTimeout(() => {
        errorText.innerText = ""
      },5000)
    }
   
}

renderTodo();

function renderTodo() {

   let detailsGen = '';
 
      taskDetails.forEach((detail, index) => {
    
       const taskDetailsObj = taskDetails[index];
       const {task,urgency,timeStarted,endingTime,endingDate} = taskDetailsObj;
        
      let detailHtml = `
       <div class="ongoing-card ongoing-card-${index}" >
       
       <div class="card card${index}"> 
       <div class="edit-icon"> <i class="fa fa-edit"></i></div>
      <div class="priority-tag flex-1">
      <div class="priority priority${index}"></div>
      <div class="percent">${urgency}%</div>
      </div>
      <div class="task-desc">
      <div class="event">${task}</div>
      <div class="timeframe">
        <div class="starting">
       <i class='fa fa-clock-o'></i> ${timeStarted} - </i> <span class="ending">
         ${endingTime}
         </span>
        </div>
      </div>
      </div>
      <div class="date">
       <span class="clr-trans"> Due Date:</span>  ${endingDate}
      </div>
      </div>
    
       <div class="get-details-edit get-details-edit${index} noshow"> 
  
        <div class="edit-close edit-close${index}"><i class="fa fa-close" required></i></div>

      <div class="input-space input-space${index}">

      <input type="text" name="event" class="edit-event edit-event${index}" value="${task}">
        <label for="ugerncy-level">
        Urgency-level:
      </label>
      <select name="urgency-level" class="edit-urgency-level edit-urgency-level${index}">
        <option value="90">80% -100%</option>
        <option value="70">60% - 75%</option>
        <option value="50">30%-55%</option>
      </select>
      <div class="time-con">
      <label for="start">Start Time
      <input class="edit-start-time edit-start-time${index}" type="time" name="start" placeholder="HH:MM" value="12:15">
      </label>
       <label for="end">End Time
      <input class="edit-end-time edit-end-time${index}" type="time" name="start" value="12:15">
      </label>
      <label for="calendar">Choose date
        <input class="edit-date edit-date${index}" type="date" value="">
      </label>

      <div class="button-con edit-button-con edit-button-con${index} ">
        <button class="save" type="">Save</button>
      </div>
      </div>
    </div>
    </div>
     <div class="delete-container">
      <button class="deleteBtn deleteBtn-${index} noshow" data-index =${index}>Delete</button>
      </div>
    </div>
   
        
        `
       detailsGen += detailHtml;
       
      

      })
      
      ongoingCon.innerHTML = detailsGen;

     document.querySelectorAll('.percent').forEach((percent) => {
      urgencyTag(percent)
     })

     document.querySelectorAll('.edit-icon').forEach((edit,index) => {
      edit.addEventListener('click', ()=> {
        editFunc(index)
      })
     })
    ongoingSeeFunc()
    }     
    
function urgencyTag(percent) {
  const priority1 = document.querySelectorAll('.priority');
  taskDetails.forEach((task, index) => {
    let taskDetailsUrg = taskDetails[index];

    const {urgency} = taskDetailsUrg;
    let priority= priority1[index]
     
      if (urgency === '90') {
       priority.innerText = 'High'
       priority.classList.add('high')
      } else if (urgency === "70") {
         priority.innerText = 'Medium'
        priority.classList.add('medium')
      } else if (urgency === '50') {
         priority.innerText = 'Low'
        priority.classList.add('low')
      }
  })
   
}


 
function editFunc(position) {

 const editBoard = document.querySelector('.get-details-edit');

const editCard = document.querySelector(`.get-details-edit${position}`);
const card = document.querySelector(`.card${position}`);

  if (editCard) {
  editCard.classList.add('show');
  card.classList.add('noshow');

   const editClose = document.querySelector(`.edit-close${position}`).addEventListener('click', () => {
     editCard.classList.remove('show');
     card.classList.remove('noshow');
  })

   document.querySelector(`.edit-button-con${position}`).addEventListener('click',() => editSave(position))
     

  
  }
 
    
}


function editSave(position) {
  const editCard = document.querySelector(`.get-details-edit${position}`);
  const card = document.querySelector(`.card${position}`);
  const editInput = document.querySelector(`.edit-event${position}`);

  const editpriority = document.querySelector(`.edit-urgency-level${position}`);

  const editStartTime = document.querySelector(`.edit-start-time${position}`);
  const editEndTime = document.querySelector(`.edit-end-time${position}`);
  const editEndDate = document.querySelector(`.edit-date${position}`);
  

  let editedInput = editInput.value;
  let editedPriority = editpriority.value;
  let editedStartTime = editStartTime.value;
  let editedEndTime = editEndTime.value;
  let editedEndDate =  editEndDate.value;

 
  const newEdit = taskDetails[position];
  newEdit.task = editedInput;
  newEdit.urgency = editedPriority;
  newEdit.timeStarted = editedStartTime;
  newEdit.endingTime = editedEndTime;
  newEdit.endingDate = editedEndDate;

   saveToStorage()
  renderTodo();
 
   editCard.classList.remove('show');
   card.classList.remove('noshow');
   
}



note.addEventListener('click', () => writeNote());

const noteCon = document.querySelector('.write-con')
const noteArea = document.querySelector('.note-area')

function writeNote() {
  main.classList.add('noshow');
  noteCon.classList.add('show')
  noteArea.focus();
}


 document.querySelectorAll('.ongoing-card').forEach((todoCard,index) => {
   let timerId;
   let setTimeActive= false;
 todoCard.addEventListener('click', () => { 

     document.querySelector(`.deleteBtn-${index}`).classList.remove('noshow');
  
 if (setTimeActive === false) {
   timerId = setTimeout(() => {
    
    document.querySelector(`.deleteBtn-${index}`).classList.add('noshow');
    setTimeActive =true;
  },5000);
 }else {
  clearTimeout(timerId)
  setTimeActive = false;
 }
 }) 
 })

 document.querySelectorAll('.deleteBtn').forEach((button, index) => {
  button.addEventListener('click', () => {
    deleteFromList(button);
   let card = document.querySelector(`.ongoing-card-${index}`)
  card.remove();
  })
 });

function deleteFromList(button) {
   const buttonIndex = button.dataset.index;
   let detailsIndex;
   taskDetails.splice(buttonIndex, 1);
   saveToStorage()
   
}

 
function observer() {


 const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-ongoing-card')
    }else {
      entry.target.classList.remove('show-ongoing-card')
    }
  })
 }, {})

 const todoCards =  document.querySelectorAll('.ongoing-card');

 todoCards.forEach(todo => { 
   todo.classList.add('translate')
  observer.observe(todo)

 }
)

}





 
  const API_ENDPOINT = 'https://api.coingecko.com/api/v3'

async function stock() {
  const coinId = 'bitcoin';
  const currency = 'usd';
try{
  const response = await fetch(`${API_ENDPOINT}/coins/markets?ids=${coinId}&vs_currency=${currency}`);
  const data = await response.json();
  console.log(data)
  const price = data[0].current_price;
   
 console.log(price)
  
  const logo = data[0].image;
  const myLogo = `<img class="one-logo" src="${logo}">
   <div class="card-content cc1"> ${price}
   <p>Today Price</p>
     </div>
  
  
  `
  
  document.querySelector('.one'). innerHTML = myLogo;
  
  
}catch (error) {
console.error('Error fetching data')
throw error;
}

}
stock()
setInterval(stock, 60000)

