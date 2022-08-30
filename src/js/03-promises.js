import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const delayInputRef = document.querySelector('[name="delay"]');
const stepInputRef = document.querySelector('[name="step"]');
const amountInputRef = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
      reject({ position, delay });
      }
      }, delay
    ) 
  }
  )  
}

function createEvent(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  let delayInput = Number(delay.value);
  const stepInput = Number(step.value);
  const amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInput += stepInput;
  }

  event.currentTarget.reset();
}

  formRef.addEventListener("submit", createEvent)