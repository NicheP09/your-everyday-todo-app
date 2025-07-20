const addBtn=  document.querySelector(".plus-con");
const ongoingTask = document.querySelector('.ongoing-task');
const getDetails= document.querySelector('.get-details')
const main = document.querySelector('main')



addBtn.addEventListener('click', addEvent);



function addEvent() {
  main.classList.add('noshow');
  getDetails.classList.add('transform-center');
 
}

