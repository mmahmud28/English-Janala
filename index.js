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
   <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
   `;
        levelContainer.append(btnDiv);

    }

}

loadLessons();


// Word 

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLavelWord(data.data));

}

const displayLavelWord = (words) => {
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
        return;
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-xl">${word.word ? word: "Mahmud"}</h2>
            <p class="font-semibold">${word.meaning}</p>
            <div class="fontBd text-2xl font-medium">"${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>
        `
        wordConatainer.append(card);
    });


}





