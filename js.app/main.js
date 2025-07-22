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
let taskDetails = [
];


saveAdd.addEventListener('click', saveFunc);





function saveFunc() {


    let task = eventInput.value;
    let urgency = urgencyLev.value;
    let timeStarted = startTime.value;
    let endingTime = endTime.value;
    let endingDate = date.value;
  
    if (task !== '') {
     task.charAt(0).toUpperCase() + task.slice(1);
   taskDetails.push({task, urgency,timeStarted,endingTime,endingDate});
  

      
         getDetails.classList.remove('show');
         main.classList.remove('noshow')
          renderTodo();
         eventInput.value = '';
       
    }
   
 
}

function renderTodo() {
 

   let detailsGen = '';
 
      taskDetails.forEach((detail, index) => {
    
       const taskDetailsObj = taskDetails[index];
        const {task,urgency,timeStarted,endingTime,endingDate} = taskDetailsObj;
         

      let detailHtml = `
       <div class="ongoing-card ongoing-card${index}">
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
        <input class="edit-date edit-date${index}" type="date" value="2025-07-16">
      </label>

      <div class="button-con edit-button-con edit-button-con${index} ">
        <button class="save" type="">Save</button>
      </div>
      </div>
    </div>
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
  console.log(newEdit)
  renderTodo();
   editCard.classList.remove('show');
   card.classList.remove('noshow');

   
}

/*
  document.querySelectorAll('.edit-button-con').forEach((save, position) => {
    console.log(position)
    save.addEventListener('click', () => {
    let matching = index;
  const editedSave = document.querySelector(`.edit-button-con${index}`);
  
   

   const editInput = document.querySelector(`.edit-event${index}`).value;

  const editpriority = document.querySelector(`.edit-urgency-level${index}`);

  const editStartTime = document.querySelector(`edit-start-time${index}`);
  const editEndTime = document.querySelector(`.edit-end-time${index}`);
  let newEdit = '';
  taskDetails.forEach((details) => {
    newEdit = taskDetails[index];
    console.log(newEdit)
  })
  
  

  })
   
})*/