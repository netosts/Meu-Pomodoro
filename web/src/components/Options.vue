<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';


// Get elements
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const submitError = ref(false);

// Local Storage Pomodoro Config
// retrieve pomodoro config from local storage
let config = null;
try {
  config = JSON.parse(localStorage.getItem('PomodoroConfig'));
} catch (error) {
  // handle parsing errors, fallback to default config if needed
  console.error('Error parsing PomodoroConfig from Local Storage:', error);
  config = {
    mainTime: 25,
    breathTime: 5,
    longBreakTime: 15,
    addTime: 5,
    turns: 8,
  };
}
let { mainTime, breathTime, longBreakTime, addTime, turns } = config;

// update the pomodoro config in local storage after submit
async function updateConfig() {
  isSubmitted.value = false;
  submitError.value = false;
  // get the user input from the screen
  const newConfig = {
    mainTime,
    breathTime,
    longBreakTime,
    addTime,
    turns,
  };
  // handle error occurring during the submission process
  try {
    // interactive submission
    isSubmitting.value = true;
    await delay(1800);
    // after delay, try to submit new localStorage
    localStorage.setItem('PomodoroConfig', JSON.stringify(newConfig));
    isSubmitting.value = false;
    // show success message
    isSubmitted.value = true;
  } catch (error) { // if error occurs
    isSubmitting.value = false;
    // show error message
    submitError.value = true;
  }
}

// reset the pomodoro config to the default
async function resetConfig() {
  isSubmitted.value = false;
  submitError.value = false;
  // set the default configuration
  const defaultConfig = {
    mainTime: 25,
    breathTime: 5,
    longBreakTime: 15,
    addTime: 5,
    turns: 8,
  };
  // handle error occurring during the reset
  try {
    // interactive submission
    isSubmitting.value = true;
    await delay(1800);
    // after delay, try to submit new localStorage
    localStorage.setItem('PomodoroConfig', JSON.stringify(defaultConfig));
    isSubmitting.value = false;
    // update the values on the screen
    mainTime = defaultConfig.mainTime;
    breathTime = defaultConfig.breathTime;
    longBreakTime = defaultConfig.longBreakTime;
    addTime = defaultConfig.addTime;
    turns = defaultConfig.turns;
  } catch (error) { // if error occurs
    isSubmitting.value = false;
    // show error message
    submitError.value = true;
  }
}

// Interactive function
// delaying an execution
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// await delay(3000); // Wait for 3 seconds // Need async function to work
</script>

<template>
  <h1>Personalize o seu Pomodoro</h1>
  <section>
    <form @submit.prevent="updateConfig">
      <div>
        <label for="mainTime">Momento de Foco</label>
        <input type="number" v-model="mainTime" name="mainTime" id="mainTime" min="1" max="50"
          :class="isSubmitted ? 'submitted' : 'unsubmitted'">
      </div>
      <div>
        <label for="breathTime">Hora de Respirar</label>
        <input type="number" v-model="breathTime" name="breathTime" id="breathTime" min="1" max="20"
          :class="isSubmitted ? 'submitted' : 'unsubmitted'">
      </div>
      <div>
        <label for="longBreakTime">Descanso longo</label>
        <input type="number" v-model="longBreakTime" name="longBreakTime" id="longBreakTime" min="1" max="30"
          :class="isSubmitted ? 'submitted' : 'unsubmitted'">
      </div>
      <div>
        <label for="addTime">Adicionar tempo</label>
        <input type="number" v-model="addTime" name="addTime" id="addTime" min="1" max="20"
          :class="isSubmitted ? 'submitted' : 'unsubmitted'">
      </div>
      <div>
        <label for="turns">Rodadas</label>
        <input type="number" v-model="turns" name="turns" id="turns" min="1" max="24"
          :class="isSubmitted ? 'submitted' : 'unsubmitted'">
      </div>
      <div class="submit">
        <input type="submit" value="Confirmar mudança" :class="isSubmitted ? 'submitted' : 'unsubmitted'">
        <button type="button" class="submit__reset" @click="resetConfig">Reset</button>
      </div>
    </form>
  </section>

  <img src="../assets/images/loading-gif.gif" alt="loading gif" class="loading" v-show="isSubmitting">
  <RouterLink to="/" class="return" :class="isSubmitted ? 'submitted' : 'unsubmitted'" v-show="!isSubmitting">
    <font-awesome-icon icon="fa-solid fa-arrow-left" size="xl" />
  </RouterLink>

  <div class="submit__success" v-show="isSubmitted">
    <p>As configurações foram atualizadas!</p>
  </div>

  <div class="submit__error" v-show="submitError">
    <p>Houve algum erro ao salvar. Por favor atualize a página!</p>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables';
@import '../assets/mixins';


* {
  color: #444;
}

h1 {
  font-family: 'Pacifico';
  font-size: 2.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0 30px 0;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 100px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    label {
      font-weight: 500;
    }

    input {
      width: 40px;
      padding: 5px;
      margin-left: auto;
      border: none;
      text-align: center;
      font-size: 16px;
      font-weight: 500;

      &:focus {
        outline: 1px solid rgba(0 0 0 / 0.5);
        box-shadow: 2px 2px 2px rgba(0 0 0 / 0.3);
      }

      &[type="number"]::-webkit-inner-spin-button,
      &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        appearance: none;
        -moz-appearance: textfield;
      }
    }
  }

  .submit {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    border: none;

    input {
      margin-left: 35px;
      width: 200px;
      padding: 12px;
      border: none;
      box-shadow: 2px 2px 4px rgba(0 0 0 / 0.4);
      font-weight: 500;
      font-size: 18px;
      transition: .2s;

      &:hover {
        filter: brightness(0.75);
        cursor: pointer;
      }

      &:active {
        filter: brightness(0.6);
        color: black;
      }

      &:focus {
        outline: none;
      }
    }

    &__reset {
      padding: 12px;
      border: none;
      box-shadow: 2px 2px 4px rgba(0 0 0 / 0.4);
      font-weight: 600;
      font-size: 18px;
      transition: .2s;

      &:hover {
        filter: brightness(0.75);
        cursor: pointer;
      }

      &:active {
        filter: brightness(0.6);
        color: black;
      }
    }
  }
}

.loading {
  width: 30px;
}

.return {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 1px 1px 3px rgba(0 0 0 / 0.8);
  transition: .2s;

  &:hover {
    filter: brightness(0.75);
  }
}

.submitted {
  background-color: $submitted;
}

.unsubmitted {
  background-color: $main-btn;
  color: $bg-color;

  .fa-arrow-left {
    color: $bg-color;
  }
}

.submit__success {
  text-align: center;
  margin-top: 40px;

  p {
    padding: 16px 40px;
    font-size: 20px;
    font-weight: 600;
  }
}

.submit__error {
  text-align: center;
  margin-top: 40px;

  p {
    padding: 16px 40px;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>