const addBtn=  document.querySelector(".plus-con");
const ongoingTask = document.querySelector('.ongoing-task');
const getDetails= document.querySelector('.get-details')
const main = document.querySelector('main');
const closeIcon = document.querySelector('.close')




addBtn.addEventListener('click', addEvent);



function addEvent() {
  main.classList.add('noshow');
  getDetails.classList.add('show');
 
}


closeIcon.addEventListener('click', close);

function close() {
  getDetails.classList.remove('show');
  main.classList.remove('noshow')
}
