
const total = 15;
const imgs = document.querySelectorAll('img')
const ps = Array.from(imgs).map(img => {
  let p = img;
  while (p.nodeName !== 'P') {
    p = p.parentNode
  }
  p = p.previousSibling
  while (!p || p.nodeName !== 'P') {
    p = p.previousSibling
  }
  p.style="margin-top:25px;"
  return p
})
for (let img of imgs) {
  img.style="height:300px"; 
}

const quiz = document.querySelector('#quiz')
let currentPosition = 0;
let know = 0;
let dontKnow = 0;


const showImage = index => {
  quiz.appendChild(imgs[index])
}

const showAnswer = index => {
  quiz.appendChild(ps[index])
}

const hideButtons = () => {
  const buttons = document.querySelectorAll(".mainButton")
  for (let btn of buttons) {
    btn.classList.add('hidden')
  }
}

const showButtons = () => {
  const buttons = document.querySelectorAll(".mainButton")
  for (let btn of buttons) {
    btn.classList.remove('hidden')
  }
}

const updateResult = () => {
  const results = document.querySelector("#results")
  const currentDiv = document.createElement('div')
  const knowDiv = document.createElement('div')
  const dontKnowDiv = document.createElement('div')
  currentDiv.innerHTML = `${currentPosition + 1}/${total}`
  knowDiv.innerHTML = `Знаю: ${know}`
  dontKnowDiv.innerHTML = `Не знаю: ${dontKnow}`
  results.innerHTML = ""
  results.appendChild(currentDiv)
  results.appendChild(knowDiv)
  results.appendChild(dontKnowDiv)
}

const initRandom = (count) => {
  const preset = new Set();

  while (preset.size < count) {
    preset.add(Math.floor(Math.random() * imgs.length))
  }

  return Array.from(preset)
}

let preset = initRandom(total)
showImage(preset[currentPosition])
updateResult()

const reset = () => {
  preset = initRandom(total)
  quiz.innerHTML = ""
  currentPosition = 0
  know = 0
  dontKnow = 0
  showButtons()
  showImage(preset[currentPosition])
  updateResult()
}

const handleShowAnswer = () => {
  showAnswer(preset[currentPosition])
}

const handleReset = () => {
  reset()
}

const handleKnow = () => {
  quiz.innerHTML = ""
  know++
  if (currentPosition + 1 < total) {
    currentPosition++
    showImage(preset[currentPosition])
  } else {
    hideButtons()
  }
  updateResult()
}

const handleDontKnow = () => {
  quiz.innerHTML = ""
  dontKnow++
  if (currentPosition + 1 < total) {
    currentPosition++
    showImage(preset[currentPosition])
  } else {
    hideButtons()
  }
  updateResult()
}
