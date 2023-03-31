/*BLOCKS*/
let word                = document.getElementById('word')
let wordContainer       = document.getElementById('container_game')
let timerText           = document.getElementById('timer')
let resultContainer     = document.getElementById('result')
let countCorrectText    = document.getElementById('countCorrectText')
let categoriesGame      = document.getElementById('categories')
let formCategories      = document.getElementById('form_categories')
let formTimers          = document.getElementById('time_ForGame')

/*BUTTONS*/
let btnStart    = document.getElementById('btn_start')
let btnGame     = document.getElementById('btn_game')
let btnCorrect  = document.getElementById('btn_correct')
let btnSkip     = document.getElementById('btn_skip')
let btnRepeat   = document.getElementById('btn_repeatGame')
let title       = document.getElementById('game_title')

/**/
let countCorrect    = 0

let newVal          = 0
let val             = 0
let selectedCateg   = '' 

formTimers.addEventListener('change', ()=> {
    newVal = parseInt(formTimers.value)
    val = newVal
    timerText.innerHTML = val
})



let arrayWord = [
    'Клубника', 
    'Хлеб', 
    'Банан', 
    'Апельсин',
    'Масло',
    'Вода',
    'Сыр',
    'Колбаса',
]

let arrayEnglishWord = [
    'Dog',
    'Cat',
    'Milk',
    'Chees',
    'Water',
    'Mouse',
    'Table',
    'Paper',
]


console.log(categoriesGame.value);

let correctWord     = []
let incorrectWord   = []

let randomValue = (max) => Math.floor(Math.random() * (max - 0) + 0)

categoriesGame.addEventListener('change', () => {

    switch (categoriesGame.value) {
        case 'value_food':
            word.innerHTML = randomWords(arrayWord)
            selectedCateg = arrayWord                   
            break;
        case 'value_english':
            word.innerHTML = randomWords(arrayEnglishWord)
            selectedCateg = arrayEnglishWord
            break;
        default:
            break;
    }
    
})


function randomWords(arr) {
    return arr[randomValue(arr.length)] 
}

function logGame(keyVal) {
    switch (keyVal) {
        case correctWord:
               return `Угадано слов - ${correctWord}`
        case incorrectWord:
               return `Пропущено слов - ${incorrectWord}`
        default:
            break;
    }
}




btnStart.addEventListener('click', ()=> {
    timerText.style.display         = 'block'
    btnStart.style.display          = 'none'
    btnGame.style.display           = 'flex'
    countCorrectText.style.display  = 'block'
    formCategories.style.display    ='none'

    word.style.display = 'block'

    timer = setInterval(function() {
        if(val <= 0) {
            resultContainer.innerHTML       = 'Последнее слово'
            clearInterval(timer)
            resultContainer.style.display   = 'block'
            timerText.style.display         = 'none'
        }
        timerText.innerHTML     = --val
        console.log(val);
    }, 1000)
    btnCorrect.style.display    = 'block'
})

countCorrectText.innerHTML = `Количество угаданных - ${countCorrect}`

btnCorrect.addEventListener('click', () => {
 
    console.log(`Угадал ${word.innerText}`);
    
    correctWord.push(word.innerText)
    
    word.innerHTML = randomWords(selectedCateg)

    countCorrectText.innerHTML = `Количество угаданных - ${++countCorrect}`
    

    if(val < 0) {
        console.log('Конец игры');  
        console.log(logGame(correctWord));
        console.log(logGame(incorrectWord));

        word.style.display          = 'none'  
        btnGame.style.display       = 'none'
        resultContainer.innerHTML   = 'Игра окончена'
        countCorrectText.innerHTML  = ''
        btnRepeat.style.display     = 'block'
        
        val = newVal
    }
    
})


btnSkip.addEventListener('click', ()=> {

    console.log(`Не угадал ${word.innerText}`)
    incorrectWord.push(word.innerHTML)

    word.innerHTML = randomWords(selectedCateg)


    countCorrectText.innerHTML = `Количество угаданных - ${countCorrect}`


    if(val < 0) {
        console.log('Конец игры')
        console.log(logGame(correctWord))
        console.log(logGame(incorrectWord))
        word.style.display          = 'none'
        btnGame.style.display       = 'none'
        resultContainer.innerHTML   = 'Игра окончена'
        countCorrectText.innerHTML  = ''
        btnRepeat.style.display     = 'block'
        val = newVal
        
    }

})

btnRepeat.addEventListener('click', () => {
    
    formCategories.style.display    = 'flex'
    btnStart.style.display          = 'block'
    timerText.innerHTML             = 5
    timerText.style.display         = 'none'
    word.style.display              = 'none'
    resultContainer.innerHTML       = ''
    correctWord                     = []
    countCorrect                    = 0
    incorrectWord                   = []
    btnRepeat.style.display         = 'none'
})