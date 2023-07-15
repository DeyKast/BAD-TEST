// Ініціалізація змінних, форми та контейнера для виведення результатів

const inputForm = document.querySelector(".container__form");
const resultsOutput = document.querySelector(".container__results");

let results = "";
let allWords = [];
let uniqueLetters = [];

// Додавання читача події підтвердження форми

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // скидання записаних унікальних букв

  uniqueLetters = [];

  // перевірка наявності тексту

  if (event.target.valueInput.value.trim() < 1) {
    alert("Please enter text");
  }

  // Обробка введеного тексту (обрізання пробілів, розбиття тексту на окремі слова та фільтрування зайвих пробілів ) та виклик функції з передаванням масиву слів для знаходження унікальної букви

  const text = event.target.valueInput.value.trim();
  allWords = text.split(" ").filter((word) => word.length > 0);
  uniqueWordSelect(allWords);
});

function uniqueWordSelect(words) {
  // Розбиття кожного слова на букви, переведення їх до нижнього регістру, фільтрація англ. та укр. букв, та подальша обробка кожного слова.

  words.forEach((word) => {
    const wordLetters = word
      .toLowerCase()
      .split("")
      .filter((word) => /^[a-zA-Zа-яА-Я]+$/.test(word));

    const characterCount = {};

    // Цикл для додавання до об'єкту characterCount символів слова та їх кількість у ньому

    for (let i = 0; i < wordLetters.length; i++) {
      const letter = wordLetters[i];

      characterCount[letter] = (characterCount[letter] || 0) + 1;
    }

    // Цикл для перевірки кількості входжень літери у слово та додавання першої унікальної літери до масиву uniqueLetters

    for (let i = 0; i < wordLetters.length; i++) {
      const letter = wordLetters[i];

      if (characterCount[letter] === 1) {
        uniqueLetters.push(letter);
        return;
      }
    }
  });

  // Цикл для знаходження першого унікального символу у масиві uniqueLetters та виведення результатів роботи програми на сторінку

  for (let i = 0; i < uniqueLetters.length; i++) {
    const letter = uniqueLetters[i];

    if (uniqueLetters.indexOf(letter, i + 1) === -1) {
      if (!letter) {
        results = `<p>Sorry we can't find unique word...</p>`;
        resultsOutput.innerHTML = results;
      }

      results = `
      <p class="container__results-text"> All unique words in your text : ${uniqueLetters.join(
        ", "
      )} </p>
      <p class="container__main-results-text"> The first unique letter in your text is - ${letter} </p>`;
      resultsOutput.innerHTML = results;
      return;
    }
  }
}
