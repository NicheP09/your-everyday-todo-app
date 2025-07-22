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


    const task = eventInput.value;
    const urgency = urgencyLev.value;
    const timeStarted = startTime.value;
    const endingTime = endTime.value;
    const endingDate = date.value;
  
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
       <div class="card"> 
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
      
        <div class="close"><i class="fa fa-close" required></i></div>

        <div class="input-space">

      <input type="text" name="event" class="event" value="${task}">
        <label for="ugerncy-level">
        Urgency-level:
      </label>
      <select name="ugerncy-level" id="ugerncy-level">
        <option value="90">80% -100%</option>
        <option value="70">60% - 75%</option>
        <option value="50">30%-55%</option>
      </select>
      <div class="time-con">
      <label for="start">Start Time
      <input class="start-time" type="time" name="start" placeholder="HH:MM" value="12:15">
      </label>
       <label for="end">End Time
      <input class="end-time" type="time" name="start" value="12:15">
      </label>
      <label for="calendar">Choose date
        <input class="date" type="date" value="2025-07-16">
      </label>

      <div class="button-con">
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

     document.querySelectorAll('.edit-icon').forEach((edit
     ) => {
      edit.addEventListener('click', ()=> {
        editFunc()
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

function editFunc() {
  const ongoingCard = document.querySelectorAll('.ongoing-card'); 
  const firstCard = document.querySelector('.card');
  const editBoard = document.querySelector('.get-details-edit');
  firstCard.classList.add('noshow');

  editBoard.classList.add('show');


 
  
}