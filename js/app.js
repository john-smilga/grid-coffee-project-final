

// event listeners

eventListeners()
function eventListeners() {
 const ui = new UI()

 // hide preloader
 // The load event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.
 window.addEventListener('load', function () {
  ui.hidePreloader();
 })
 // show nav
 document.querySelector('.navBtn').addEventListener('click', function () {
  ui.showNav()
 })
 // control the video
 document.querySelector('.video__switch').addEventListener('click', function () {
  ui.videoControls()
 })
 // submit form
 document.querySelector('.drink-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const name = document.querySelector('.input-name').value;
  const lastName = document.querySelector('.input-lastname').value;
  const email = document.querySelector('.input-email').value


  let value = ui.checkEmpty(name, lastName, email);
  if (value) {
   // create a new customer
   const customer = new Customer(name, lastName, email)
   ui.showFeedback('customer added to the list', 'success');
   ui.addCustomer(customer);
   ui.clearFields()
  }
  else {
   ui.showFeedback('some form values empty', 'error');

  }
 })
 // display modal
 const links = document.querySelectorAll('.work-item__icon');
 // console.log(links);

 links.forEach(function (item) {
  item.addEventListener('click', function (event) {

   ui.showModal(event)
  })
 })
 // hide modal
 document.querySelector('.work-modal__close').addEventListener('click', function () {
  ui.closeModal()
 })
 // end of event listners
}




// ui object create a constructor function and then instantiate an object invoking that function in conjunction with the new operator.
function UI() { }
// hide preloader
UI.prototype.hidePreloader = function () {
 document.querySelector('.preloader').style.display = 'none';
}
// show nav
UI.prototype.showNav = function () {
 document.querySelector('.nav').classList.toggle('nav--show')
}
// pause/play video
UI.prototype.videoControls = function () {
 let btn = document.querySelector('.video__switch-btn');
 if (!btn.classList.contains('btnSlide')) {
  document.querySelector('.video__item').pause()
  btn.classList.add('btnSlide')
 }
 else {
  document.querySelector('.video__item').play()
  btn.classList.remove('btnSlide')

 }

}
// check for emtpy values
UI.prototype.checkEmpty = function (name, lastName, email) {
 let result;
 if (name === '' || lastName === '' || email === '') {
  result = false
 }
 else {
  result = true
 }
 return result
}
// display feedback
UI.prototype.showFeedback = function (text, type) {
 if (type === 'success') {
  let feedback = document.querySelector('.drink-form__feedback');
  feedback.classList.add('success')
  feedback.innerText = text;
  this.removeAlert('success')

 }
 else if (type === 'error') {
  let feedback = document.querySelector('.drink-form__feedback');
  feedback.classList.add('error')
  feedback.innerText = text;
  this.removeAlert('error')
 }
}
// remove alert
UI.prototype.removeAlert = function (type) {
 setTimeout(function () {
  document.querySelector('.drink-form__feedback').classList.remove(type)
 }, 2000)
}


// add item tot the list
UI.prototype.addCustomer = function (customer) {
 const images = [1, 2, 3, 4, 5];
 let random = Math.floor((Math.random() * images.length));
 const div = document.createElement('div');
 div.classList.add('person');
 div.innerHTML = `
 <img src="img/person-${random}.jpeg" alt="" class="person__thumbnail">
          <h4 class="person__name">${customer.name}</h4>
          <h4 class="person__last-name">${customer.lastname}</h4>
 `
  ;
 document.querySelector('.drink-card__list').appendChild(div);
}
// clear fields
UI.prototype.clearFields = function () {
 document.querySelector('.input-name').value = ''
 document.querySelector('.input-lastname').value = ''
 document.querySelector('.input-email').value = ''
}
//show modal
UI.prototype.showModal = function (event) {
 if (event.target.parentElement.classList.contains('work-item__icon')) {
  let id = event.target.parentElement.dataset.id;

  const modal = document.querySelector('.work-modal');
  const modalItem = document.querySelector('.work-modal__item');

  modal.classList.add('work-modal--show');
  let result = modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  // console.log(result);
 }
}
// hide modal
UI.prototype.closeModal = function () {
 document.querySelector('.work-modal').classList.remove('work-modal--show')
}
// new customer object
function Customer(name, lastname, email) {
 this.name = name,
  this.lastname = lastname,
  this.email = email
} 