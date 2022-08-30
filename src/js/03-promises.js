import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const delayInputRef = document.querySelector('[name="delay"]');
const stepInputRef = document.querySelector('[name="step"]');
const amountInputRef = document.querySelector('[name="amount"]');
console.log(formRef);
console.log(delayInputRef);
console.log(stepInputRef);
console.log(amountInputRef);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return promise = new Promise((resolve, reject) => {
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
  
  console.log(delayInput)
  console.log(stepInput)
  console.log(amountInput)

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInput += stepInput;
  }
  
  event.currentTarget.reset();
}

  formRef.addEventListener("submit", createEvent)