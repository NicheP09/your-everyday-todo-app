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
let taskDetails = [];

saveAdd.addEventListener('click', saveFunc);





function saveFunc() {


    const task = eventInput.value;
    const urgency = urgencyLev.value;
    const timeStarted = startTime.value;
    const endingTime = endTime.value;
    const endingDate = date.value;

    

    if (task !== '') {
      
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
      <div class="priority-tag flex-1">
      <div class="priority priority${index}">${urgency}</div>
      <div class="percent">85%</div>
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
       <span class="clr-trans"> Due Date: ${endingDate}</span> August 25
      </div>
    </div>
        
        `
       detailsGen += detailHtml;
 
      

      })
    
      ongoingCon.innerHTML = detailsGen;

     document.querySelectorAll('.priority').forEach((prior) => {
      urgencyTag(prior)
     })



    }     
    
function urgencyTag(prior) {
    if (prior.innerText === 'high') {
        prior.classList.add('high')
      } else if (prior.innerText === 'medium') {
        prior.classList.add('medium')
      } else if (prior.innerText === 'low') {
        prior.classList.add('low')
      }
}