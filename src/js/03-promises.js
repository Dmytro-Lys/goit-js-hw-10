import Notiflix from 'notiflix';
import "notiflix/src/notiflix.css";


const form = document.querySelector(".form");
const fields = form.querySelectorAll("label");
const btnForm = form.querySelector("button");

// styles
form.classList.add("timer");
fields.forEach(elem => elem.classList.add("field-promises"));
btnForm.classList.add("btn-form-promises");

// Functions

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay)
  });
  return promise;
}

const createPromises = ({ currentDelay, amount, step }) => {
  for (let i = 1; i <= amount; i += 1){
      createPromise(i, currentDelay)
       .then(({ position, delay }) => {
           Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
       .catch(({ position, delay }) => {
           Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      currentDelay += step;
    }
}

const toNumberArgs = ({ delay, step, amount}) => {
   return {
      currentDelay: Number(delay.value),
      amount: Number(amount.value),
      step: Number(step.value)
    }
}

const checkArgs = ({ currentDelay, amount, step }) => {
  if (currentDelay < 0) return Notiflix.Notify.failure("The First delay must be greater than or equal to 0");
  if (step < 0) return Notiflix.Notify.failure("The Delay step must be greater than or equal to 0");
  if (amount <= 0) return Notiflix.Notify.failure("The Amount must be greater than 0");
  return true;
}

const submitForm = (e) => {
    e.preventDefault();
    const args = toNumberArgs(e.currentTarget.elements);
    if (!checkArgs(args)) return;
    createPromises(args);
    e.currentTarget.reset();
}

form.addEventListener("submit", submitForm);