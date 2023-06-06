<script setup>
import { RouterLink } from 'vue-router';


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
    addTime: 5,
    turns: 4,
  };
}
let { mainTime, breathTime, addTime, turns } = config;

// update the pomodoro config in local storage after submit
function updateConfig() {
  const newConfig = {
    mainTime,
    breathTime,
    addTime,
    turns,
  };
  // handle error occurring during the submission process
  try {
    localStorage.setItem('PomodoroConfig', JSON.stringify(newConfig));
  } catch (error) {
    // show error message
    console.log('ERRO')
  }
}

</script>

<template>
  <!-- FAZER SLIDEBAR -->
  <h1>Personalize o seu Pomodoro</h1>
  <section>
    <form @submit.prevent="updateConfig">
      <div>
        <label for="mainTimer">Momento de Foco</label>
        <input type="number" v-model="mainTime" name="mainTimer" id="mainTimer" min="1">
      </div>
      <div>
        <label for="breathTimer">Hora de Respirar</label>
        <input type="number" v-model="breathTime" name="breathTimer" id="breathTimer" min="1">
      </div>
      <div>
        <label for="addMainTimer">Adicionar tempo</label>
        <input type="number" v-model="addTime" name="addMainTimer" id="addMainTimer" min="1">
      </div>
      <div>
        <label for="turnCount">Rodadas</label>
        <input type="number" v-model="turns" name="turnCount" id="turnCount" min="1">
      </div>
      <div class="submit">
        <input type="submit" value="Confirmar mudança">
      </div>
    </form>
  </section>
  <RouterLink to="/" class="return">
    <font-awesome-icon icon="fa-solid fa-arrow-left" size="2xl" style="color: #444" />
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '../assets/variables';
@import '../assets/mixins';


h1 {
  font-family: 'Pacifico';
  font-size: 2.5rem;
  color: #444444;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 50px;

    input {
      width: 40px;
      padding: 5px;
      margin-left: auto;

      &:focus {
        outline: none;
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

    input {
      margin: auto;
      width: 200px;
      padding: 12px;
      border: none;
      background-color: $main-btn;
      color: white;
      font-weight: 500;
      font-size: 18px;
      transition: .2s;

      &:hover {
        filter: brightness(0.8);
        cursor: pointer;
      }

      &:active {
        transform: translateX(1px) translateY(2px)
      }
    }
  }
}

.return {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $main-btn;
  transition: .35s;

  &:hover {
    filter: brightness(0.75);
  }
}
</style>