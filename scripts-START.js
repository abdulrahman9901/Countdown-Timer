let countDown;

const displayTimeLeft=document.querySelector('.display__time-left');
const dispEndTime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('.timer__button');
const custom=document.querySelector('#custom');

function timer(seconds){
    const now= Date.now();
    const then=Date.now() + seconds * 1000;
    console.log(seconds);
    displayTime(seconds);
    displayEndTime(then);
    clearInterval(countDown);
    countDown=setInterval(()=>{
        const secondsLeft=Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0)
            clearInterval(countDown);
        else
            displayTime(secondsLeft);

    },1000);
}

function displayTime(seconds){
    const minutes=Math.floor(seconds / 60) ;
    const remainderSeconds =seconds % 60;
    const display=`${minutes}:${remainderSeconds < 10 ? '0':'' }${remainderSeconds}`;
    displayTimeLeft.textContent =display;
    document.title=display;
}

function displayEndTime(timestamp){
    const end= new Date(timestamp);
    const hours=end.getHours();
    const minutes=end.getMinutes();
    dispEndTime.textContent=`Be Back At ${hours}:${minutes < 10 ? '0':''}${minutes}`;
}

function setButtonTime(e){
    const data=this.dataset;
    timer(data.time);
    console.log(data.time);
}
function setCustomTime(e){
    e.preventDefault();
    const seconds=this.minutes.value *60 ;
    timer(seconds)
    console.log(seconds);
    this.reset();
}
buttons.forEach(button => button.addEventListener('click',setButtonTime));
custom.addEventListener('submit',setCustomTime);