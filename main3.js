
/// initialize pop overs ...function made by bootstrap 

function initPopovers() {
  console.log("init popovers");
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  // console.log('popoverTriggerList :>> ', popoverTriggerList);
  
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}


//////

//TODO - 1 : create a fetch function that : a) fetches the data , and b) call the funtion that creates the cards and send the info to that function



function fetchData() {
  fetch("https://opentdb.com/api.php?amount=50")
  .then(response => response.json()).then(result =>{  
  //  console.log(result.results)

   
  let myData = result.results

  console.log(myData)
  controll(myData);
  
   
})
.catch(error => console.log('error', error));
}
fetchData();




 


// // //TODO - 2 : create a function (for example "createCards") that generates all the cards with a for loop or a .forEach loop

function createCards(myData) {
let myContainer = document.getElementById('row');
myContainer.innerText = ""


myData.forEach(data => {
  let myCard = document.createElement('div');
  
    myCard.setAttribute("class", "card  col-sm-12 col-md-4 col-lg-2  ");
    myCard.setAttribute("style", "width: 40rem");
    myCard.setAttribute("style", "background-color: #00AB81 ");
    myCard.style.color = "black";

//card Title
    let cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = data.category;

//for diffculty
let difficult = document.createElement("p");
    difficult.classList.add("card-text");
    difficult.innerText = `Level:  ${data.difficulty}`

 
// popoverButton for generating answers
 let popoverButton = document.createElement("button");
 popoverButton.innerText="show  answer"

 popoverButton.setAttribute("type", "button");
 popoverButton.setAttribute("class", "btn btn-sm btn-danger");
 popoverButton.setAttribute("data-bs-toggle", "popover");
 popoverButton.setAttribute("data-bs-title", data.category);

 popoverButton.setAttribute("data-bs-content",  data.correct_answer);


//for calling questions

 let myQuestion = document.createElement("p");
    myQuestion.classList.add("card-text");
    myQuestion.innerText = `question: ${data.question}`;


 
 //items appended to myCards from Api
    myCard.appendChild(popoverButton)
    
   myCard.appendChild(cardTitle)
   myCard.appendChild(difficult)
   myCard.appendChild(myQuestion)
    myContainer.appendChild(myCard);
  myCard.appendChild(popoverButton)
 
});
//here I call my popoverButton **(inside myCard function but not * inside the loop)
initPopovers()
  
}


// generating dropDown options

 function createDropDown(myData) {
  const dropDown = document.getElementById('kategory')

const myCategory = myData.map((eachCategory) =>{
  return eachCategory.category
})
  const uniqueNum = [...new Set(myCategory)]
  // console.log(myCategory)

  uniqueNum.forEach((eachCategory) =>{
    let options =document.createElement('option');
    options.value= eachCategory;
    options.innerText = eachCategory;
    // console.log(uniqueNum)
dropDown.appendChild(options)
    
  });

  
 }


 //create my EventListeners
 
 function myEventlister(myData) {
   const myDropdown = document.querySelector('#kategory')
   const pSubmit = document.getElementById('mysubmit') ;
const submitBtn = document.getElementById('submit');


submitBtn.addEventListener('click',()=>{
  
  document.getElementById('mysubmit').innerText ='thanks for your comment, we will work on this.' 

pSubmit.setAttribute('style', 'text-align:center')

})

   myDropdown.addEventListener('change', (event)=>{

      combineFilter(myData)
    });

  

    //adding EventListener for checkboxes

   const checkBoxes = document.querySelectorAll('input[type ="checkbox"]');
  checkBoxes.forEach((checkBox)=> {
    checkBox.addEventListener('click', () =>{
  combineFilter(myData);

  //  filterByCheckbox(myData)
  
    });
   
  
  })

  document.getElementById('searchInput').addEventListener('keyup',()=>{
combineFilter(myData)
  })
  };
    
    
    // create my dropdown filter
    function filterByDropDown(myData) {
     const dropDownValue = document.querySelector('#kategory').value;
    
    
     const filterEachCategory = myData.filter((mycategory) =>{ 
      return mycategory.category === dropDownValue || dropDownValue === 'all'
     })
    
    createCards(filterEachCategory)


     } 
    
//create filter for my Checkboxes
function filterByCheckbox(myData) {
  const checkBoxes = document.querySelectorAll('input[type ="checkbox"]')
  console.log('checkBoxes :>> ', checkBoxes);

  let checkedCheckBoxes = [];
  
 checkBoxes.forEach((checkbox) =>{
 if(checkbox.checked === true){
  checkedCheckBoxes.push(checkbox.value)
}
})

let myCheckedFilter = myData.filter((mylevel)=>{

  return checkedCheckBoxes.includes(mylevel.difficulty) || checkedCheckBoxes.length === 0
})
createCards(myCheckedFilter)
}


// // //combined my filters
 function combineFilter(myData) {
  const dropDownValue = document.querySelector('#kategory').value;
  
  const checkBoxes = document.querySelectorAll('input[type ="checkbox"]:checked')
  // console.log('checkBoxes :>> ', checkBoxes);
const inputValue = document.getElementById('searchInput').value
console.log('inputValue :>> ', inputValue);


const valuesArray=Array.from(checkBoxes).map((checkbox)=>{
  return checkbox.value;
 });
 const filterDifficulty = myData.filter((mycategory) =>{

 return (mycategory.category ===dropDownValue ||dropDownValue ==='all') &&
   (valuesArray.includes(mycategory.difficulty)||valuesArray.length === 0) && 
   (mycategory.category.toLowerCase().includes(inputValue.toLowerCase()))
 })
 console.log('filterDifficulty :>> ', filterDifficulty);
 createCards(filterDifficulty)
}





function controll(myData) {
  createCards(myData)
  createDropDown(myData)
myEventlister(myData)

}























    





