const inputForm = document.querySelector(".container__form");
const resultsOutput = document.querySelector(".container__results");

let results = "";
let allWords = [];
let uniqueLetters = [];

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();

  uniqueLetters = [];

  if (event.target.valueInput.value.trim() < 1) {
    alert("Please enter text");
  }

  const text = event.target.valueInput.value.trim();

  allWords = text.split(" ").filter((word) => /^[a-zA-Z]+$/.test(word));

  uniqueWordSelect(allWords);
});

function uniqueWordSelect(words) {
  words.forEach((word) => {
    const wordLetters = word.toLowerCase().split("");

    const characterCount = {};

    for (let i = 0; i < wordLetters.length; i++) {
      const letter = wordLetters[i];

      characterCount[letter] = (characterCount[letter] || 0) + 1;
    }

    for (let i = 0; i < wordLetters.length; i++) {
      const letter = wordLetters[i];

      if (characterCount[letter] === 1) {
        uniqueLetters.push(letter);
        return;
      }
    }
  });

  for (let i = 0; i < uniqueLetters.length; i++) {
    const letter = uniqueLetters[i];

    if (uniqueLetters.indexOf(letter, i + 1) === -1) {
      if (letter < 1) {
        results = `<p>Sorry we can't find unique word...</p>`;
        resultsOutput.innerHTML = results;
      }

      results = `<p class="container__results-text"> All words in your text : ${allWords.join(
        ", "
      )} </p>
      <p class="container__results-text"> All unique words in your text : ${uniqueLetters.join(
        ", "
      )} </p>
      <p class="container__main-results-text"> The first unique letter in your text is - ${letter} </p>`;
      resultsOutput.innerHTML = results;
      return;
    }
  }
}
