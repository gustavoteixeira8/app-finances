const bgModal = document.querySelector('.bg-modal')
const modal = document.querySelector('.modal')

document.addEventListener('click', (e) => {
  const target = e.target

  if (target.id === 'addBalance') {
    bgModal.style.display = 'block'
    modal.style.display = 'block'
  }

  if (target.id === 'close') {
    bgModal.style.display = 'none'
    modal.style.display = 'none'
  }
})

document.addEventListener('keydown', (e) => {

  if(e.keyCode === 27 && e.key === "Escape") {
    bgModal.style.display = 'none'
    modal.style.display = 'none'
  }
})
