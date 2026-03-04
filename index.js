// Button 
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data));
};

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `;
        levelContainer.append(btnDiv);

    }

}

loadLessons();


// Word 

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn=>btn.classList.remove('active'));

}

function textToVoice (word){
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang= "en-EN";
    window.speechSynthesis.speak(utterance);
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const clickbtn = document.getElementById(`lesson-btn-${id}`);
            removeActive();
            clickbtn.classList.add("active")
            displayLavelWord(data.data)
        });

}

const displayLavelWord = (words) => {
    manageSpinner(true);
    const wordConatainer = document.getElementById("word-conatainer");
    wordConatainer.innerHTML = "";

    if (words.length == 0) {
        wordConatainer.innerHTML = `
          <div class="text-center col-span-full rounded-xl py-10 space-y-6">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl fontBd">নেক্সট Lesson এ যান</h2>
        </div>
         `
         manageSpinner(false)
        return;
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-xl">${word.word ? word.word : "No Word"}</h2>
            <p class="font-semibold">${word.pronunciation ? word.pronunciation : "No Pronunciation"}</p>
            <div class="fontBd text-2xl font-medium">${word.meaning ? word.meaning : "No Word Meaning"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="textToVoice('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>
        `
        wordConatainer.append(card);
        manageSpinner(false)
    });

}

const manageSpinner =(status)=>{
    if(status==true){    
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-conatainer").classList.add("hidden");
    } else if(status==false){
         document.getElementById("spinner").classList.add("hidden");
         document.getElementById("word-conatainer").classList.remove("hidden");
    }
}


const loadWordDetail=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details =await res.json();
    displayWordDetails(details.data)
}

const createElements = (arr) =>{
    const htmlElemet = arr.map(el=>`<span class="btn">${el}</span>`);
    return htmlElemet.join(" ");
}

const displayWordDetails=(word)=>{
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML=`
     <div>
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-bold mb-2">Synonym</h2>
                   <div class="">${createElements(word.synonyms)}</div>
                </div>
    `;
    document.getElementById("my_modal_5").showModal();
}

document.getElementById("btn-search").addEventListener("click",()=>{
    removeActive();
    const inputsearch = document.getElementById("input-search");
    const searchValue =inputsearch.value;
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res=>res.json())
    .then(date=>{
        const allWords= date.data;
        const filterwords = allWords.filter(word=>word.word.includes(searchValue));
        displayLavelWord(filterwords);
        inputsearch.value="";
    });
});