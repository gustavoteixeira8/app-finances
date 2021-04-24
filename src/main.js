// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
import 'bootstrap'
import './assets/css/style.css'
import './modules/modal'

const tbody = document.querySelector('#tbody')

const getId = () => Math.floor(Math.random() * 10000)

const getLocalStorage = JSON.parse(localStorage.getItem('balances'))

let balances = getLocalStorage || []

const createTr = () => {
  const tr = document.createElement('tr')
  tr.classList.add('my-tr')
  return tr
}

const balanceIsNegative = (price) => price < 0 ? '-' : '+'
const clearListDOM = () => tbody.innerHTML = ''
const classNameByBalance = (isNegative) => isNegative === '-' ? 'danger' : 'success'

const addBalanceIntoDOM = (balance) => {
  const tr = createTr()
  const isNegative = balanceIsNegative(balance.price)
  const className = classNameByBalance(isNegative)

  tr.innerHTML += `
    <td>${balance.description}</td>
    <td class="text-${className}">${isNegative} ${Math.abs(balance.price).toFixed(2)}</td>
    <td>${balance.date}</td>
    <td>
      <span class="btn btn-danger float-right" id="del-balance" balance-id="${balance.id}">
        &times;
      </span>
    </td>
  `

  tbody.prepend(tr)
}

const addNewBalance = (description, price, date) => {
  balances.push({
    description: String(description),
    price: Number(price),
    date: new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    id: getId()
  })
}

const setInLocalStorage = () => localStorage.setItem('balances', JSON.stringify(balances))

const addBalancesIntoDOM = (recipe, recipeOut, recipeBalance) => {
  const recipeText = document.querySelector('#recipe-text')
  const recipeOutText = document.querySelector('#recipe-out-text')
  const recipeBalanceText = document.querySelector('#recipe-balance')
  const isNegative = recipeBalance < 0 ? '-' : '+'

  recipeText.innerText = `+ R$ ${Math.abs(recipe).toFixed(2)}`
  recipeOutText.innerText = `- R$ ${Math.abs(recipeOut).toFixed(2)}`
  recipeBalanceText.innerText = `${isNegative} R$ ${Math.abs(recipeBalance).toFixed(2)}`
}

const calcBalance = () => {
  const recipeOut = balances
  .filter(balance => balance.price < 0)
  .reduce((ac, balance) => ac += balance.price, 0)

  const recipe = balances
  .filter(balance => balance.price > 0)
  .reduce((ac, balance) => ac += balance.price, 0)

  const recipeBalance = (recipe - (- recipeOut))

  addBalancesIntoDOM(recipe, recipeOut, recipeBalance)
}

const deleteBalance = (balanceId) => {
  const id = parseInt(balanceId)
  balances = balances.filter(balance => balance.id !== id)
}

const initApp = () => {
  clearListDOM()
  balances.forEach((balance) => addBalanceIntoDOM(balance))
  calcBalance()
}
initApp()

const newError = (msg) => {
  const errors = document.querySelector('.errors')

  errors.innerHTML = `
    <div class="alert alert-danger">
      ${msg}
    </div>
  `
  setTimeout(() => errors.innerHTML = '', 1000)
}

const formAddBalance = document.querySelector('#formAddBalance')

formAddBalance.addEventListener('submit', (e) => {
  e.preventDefault()
  const descriptionBalance = document.querySelector('#descriptionBalance')
  const valueBalance = document.querySelector('#valueBalance')
  const dateBalance = document.querySelector('#dateBalance')

  if (!descriptionBalance.value || !valueBalance.value || !dateBalance.value) {
    newError('Os campos Descrição, Valor e data não podem ficar vazios')
    return
  }

  addNewBalance(descriptionBalance.value, valueBalance.value, dateBalance.value)
  setInLocalStorage()
  initApp()
  calcBalance()

  descriptionBalance.value = ''
  valueBalance.value = ''
  dateBalance.value = ''
})

document.addEventListener('click', (e) => {
  const target = e.target

  if (target.id === 'del-balance') {
    const balanceId = target.getAttribute('balance-id')
    deleteBalance(balanceId)
    setInLocalStorage()
    initApp()
  }
})

// Version 2
