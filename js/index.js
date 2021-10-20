const dateNow = new Date();

let data = {};
let cardMd = '';

const containerSm = document.getElementById("container-sm");
const containerMd = document.getElementById("container-md");

//fetch
fetch("/info.json")
    .then(res => res.json())
    .then(json => {

        data = json;
        let cardSm = '';
        
        json.courses.forEach( course => {
            cardSm += `
                <div id="${course.id}" class="card-sm">
                    <div class="card-info">
                        <span class="card-title">${course.title}</span>
                        <div class="card-sm-details align-center">
                            <span class="card-sm-date">${course.date.day} / ${course.date.month} / ${course.date.year}</span>
                            <div class="align-center">
                                <span class="card-sm-state">state:</span>
                                <span class="material-icons">
                                    check_circle_outline
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-sm-btn">
                        <span class="material-icons">
                            control_point
                        </span>
                    </div>
                </div>
            `;

            containerSm.innerHTML = cardSm; 

        });

    });

function calculateDate(day, month, year){
    const countDay = day - dateNow.getDate();
    const countMouth = month -(dateNow.getMonth()+1);
    const countYear = year - dateNow.getFullYear();

    if(countYear > 0){
        if(countYear > 1){
            return {date: countYear, tail: "años"}
        }else{
            return {date: countYear, tail: "año"}
        }
    }
    if(countMouth > 0){
        if(countMouth > 1){
            return {date: countMouth, tail: "meses"}
        }else{
            return {date: countMouth, tail: "mes"}
        }
    }
    if(countDay > 0){
        if(countDay > 1){
            return {date: countDay, tail: "dias"}
        }else{
            return {date: countDay, tail: "dia"}
        }
    }
    return {date:'', tail:"concluido"}

}

function addCourse(id){
    calDate = calculateDate(data.courses[id].date.day, data.courses[id].date.month, data.courses[id].date.year);
    
    cardMd = `
        <div class="card-md">
            <div class="card-info">
                <h3 class="card-title">${data.courses[id].title}</h3>
                <div class="d-flex">
                    <span class="card-md-label f-blod">Duración:</span>            
                    <span class="card-md-date">${data.courses[id].total_hours}</span>
                </div>
                <div class="d-flex align-center">
                    <span class="card-md-label f-blod">Descripción:</span>
                    <p class="card-md-details">${data.courses[id].description}</p>
                </div>
                <div class="d-flex justify-between">
                    <div class="d-flex">
                        <span class="card-md-label f-blod">Fecha de inicio:</span>
                        <span>${data.courses[id].date.day}/${data.courses[id].date.month}/${data.courses[id].date.year}</span>
                    </div>
                    <div class="d-flex">
                        <span class="card-md-label f-blod">Inicia en:</span>
                        <span>${calDate.date} ${calDate.tail}</span>
                    </div>
                </div>
            </div>
            <div class="card-md-btn">
                <span class="material-icons">
                    highlight_off
                </span>
            </div>
        </div>
    ` + cardMd
    containerMd.innerHTML = cardMd; 

}

const card = document.getElementsByClassName("card-sm");

function addEvent(){
    for (i = 0; i < card.length; i++) {
        let id = card[i].getAttribute('id');
        console.log(id);
        card[i].addEventListener("click",function(){addCourse(id-1)});
    }
}

setTimeout(addEvent, 200);