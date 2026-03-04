const synonyms=["fdf","fdfd"];

const createElements = (arr) =>{
    const htmlElemet = arr.map(el=>`<span class="btn">${el}</span>`)
    return htmlElemet.join(" ");
}

createElements(synonyms);