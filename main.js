let word=document.querySelector('.word');
let wrongLettersEl=document.querySelector('#wrong-letters');
let playAgainBtn=document.querySelector('#play-button');
let popup=document.querySelector('.popup-container');
let notification=document.querySelector('.notification-container');
let finalMessage=document.querySelector('#final-message');
let figureparts= document.querySelectorAll('.figure-part');
let words =['application' ,'programming','interface','wizard'];
let selectedWord =words[Math.floor(Math.random() * words.length)];

let correctLetters=[];
let wrongLetters=[];

// show hidden word
function displayword(){
  word.innerHTML =`
  ${selectedWord
  .split('')
  .map(
      letter => `
        <span class="letter" value="">
          ${correctLetters.includes(letter) ? letter : '' }
        </span>
      `
    ).join('')}`;
  let innerword =word.innerText.replace(/\n/g,'');

  if(innerword === selectedWord){
    finalMessage.innerText='Congratulation! You won :D';
    popup.style.display='flex';
  }
}

// updateWrongLettersEl
function updateWrongLettersEl(){
  wrongLettersEl.innerHTML=`
  ${wrongLetters.length >0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  figureparts.forEach((part,index)=>{
    let errors =wrongLetters.length;
    if(index < errors){
      part.style.display='block';
    }else{
      part.style.display='none';
    }
  });
   
  // check if lost
  if(wrongLetters.length === figureparts.length){
    finalMessage.innerText='Unfortunately you lost D:'
    popup.style.display='flex';

  }
}
function showNotification() {
  notification.classList.add('show');
  setTimeout(()=>{
    notification.classList.remove('show');
  },2000);
}
// keydown letter press
window.addEventListener('keydown', e =>{
  console.log(e.keyCode);
  if(e.keyCode >=65 && e.keyCode <=90){
    let letter=e.key;

    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);

        displayword();
      }else{
        showNotification();
      }
    }else{
      if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter);
        updateWrongLettersEl();
      }else{
        showNotification();
      }
    }
  }
});
// Restart game and play agin
playAgainBtn.addEventListener('click',()=>{
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord =words[Math.floor(Math.random()*words.length)];
  displayword();
  updateWrongLettersEl();
  popup.style.display='none';
})
displayword();