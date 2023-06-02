<script setup>
import { ref, watchEffect } from 'vue';
import { setTimeout, setInterval, clearInterval } from 'worker-timers';


// get the main and breath timers
const mainTimer = ref(0);
const breathTimer = ref(0);

// set the main and breath timers remain times
const mainRemainingTime = ref(1500); // 1500 seconds = 25 minutes
const breathRemainingTime = ref(300); // 300 seconds = 5 minutes

// get the timers active booleans for conditional interactions
const isTimerActive = ref(false);
const isMainActive = ref(false);
const isBreathActive = ref(false);

// set an ID for the setInterval function
let intervalId = null;

// get the turn counter
const turnCount = ref(1);


// Notification functions
function askPermission() {
  // check if the browser supports desktop notifications
  if ('Notification' in window) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  } else {
    // if the browser doesn't support desktop notifications, send an alert to the user
    alert('Esse browser não suporta notificações desktop!');
  }
};

function sendNotification() {
  // Notification options and send the notification
  const options = {
    body: `Rodada #${turnCount.value} - ${isMainActive.value ? 'BREATH - Clique para adicionar 5 minutos de FOCUS' : 'FOCUS'}`,
    icon: '/seu-pomodoro-icon.png',
  }
  const notification = new Notification('Seu Pomodoro', options)
  new Audio("/triangle-open.mp3").play();
  // notification closes after 10 seconds
  setTimeout(() => {
    notification.close();
  }, 10 * 1000);
  // add 5 minutes to main timer
  notification.onclick = (event) => {
    event.preventDefault();
    if (mainRemainingTime.value === 0) {
      mainRemainingTime.value = 300;
      isBreathActive.value = false;
    }
  }
};


// Timer functions
function startTimer() {
  // check if user has not granted permission for notification <- IMPORTANT
  // if not, alert the user and ask for permission
  if (Notification.permission !== 'granted') {
    alert('Notificação desativada! Lembre de ativar para ser avisado sobre o pomodoro <-');
    askPermission();
  }
  // this is the timer function with web worker setInterval
  intervalId = setInterval(() => {
    if (mainRemainingTime.value > 1) {
      mainRemainingTime.value--;
      isMainActive.value = true;
    } else if (mainRemainingTime.value === 1) {
      sendNotification(); // notify user that breath time has begun
      mainRemainingTime.value--;
    } else if (breathRemainingTime.value > 0) {
      breathRemainingTime.value--;
      isMainActive.value = false;
      isBreathActive.value = true;
    } else {
      resetTimer();
      sendNotification(); // notify user that focus time has begun
    }
  }, 1000);
  isTimerActive.value = true;
};

function stopTimer() {
  clearInterval(intervalId); // pauses interval
  isTimerActive.value = false;
  isMainActive.value = false;
  isBreathActive.value = false;
};

function resetTimer() { // soft reset for new turn
  mainRemainingTime.value = 1500;
  breathRemainingTime.value = 300;
  isMainActive.value = false;
  isBreathActive.value = false;
  turnCount.value++;
}

function hardResetTimer() { // hard reset to restart timer and turns
  mainRemainingTime.value = 1500;
  breathRemainingTime.value = 300;
  isTimerActive.value = false;
  isMainActive.value = false;
  isBreathActive.value = false;
  turnCount.value = 1;
}

watchEffect(() => {
  // Show main timer on screen
  const mainMinutes = Math.floor(mainRemainingTime.value / 60).toString().padStart(2, '0'); // Show minutes as two numbers always
  const mainSeconds = (mainRemainingTime.value % 60).toString().padStart(2, '0'); // Show seconds as two numbers always
  mainTimer.value = `${mainMinutes}:${mainSeconds}`;

  // Show breath timer on screen
  const breathMinutes = Math.floor(breathRemainingTime.value / 60).toString().padStart(2, '0'); // Show minutes as two numbers always
  const breathSeconds = (breathRemainingTime.value % 60).toString().padStart(2, '0'); // Show seconds as two numbers always
  breathTimer.value = `${breathMinutes}:${breathSeconds}`;
});
</script>

<template>
  <section>
    <h1 class="timer__title">Rodada # {{ turnCount }}</h1>
    <div class="timer">
      <h2 class="timer__main" :id="isMainActive ? 'timer__main--active' : null">
        {{ mainTimer }}
      </h2>
      <h3 class="timer__breath" :id="isBreathActive ? 'timer__breath--active' : null">
        {{ breathTimer }}
      </h3>
    </div>
    <div class="btn">
      <button class="btn__start" v-show="!isTimerActive" @click="startTimer">
        Start <font-awesome-icon icon="fa-solid fa-play" />
      </button>
      <button class="btn__stop" v-show="isTimerActive" @click="stopTimer">
        Pause <font-awesome-icon icon="fa-solid fa-pause" />
      </button>
      <button class="btn__reset" @click="hardResetTimer">
        <font-awesome-icon icon="fa-solid fa-rotate" flip="horizontal" size="2xl" style="color: #333" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/variables';
@import '../assets/mixins';


.timer__title {
  font-family: 'Pacifico';
  font-size: 2rem;
  font-weight: 900;
  padding: 5px 50px;
  color: #444444;
}

.timer {
  display: flex;
  height: 200px;

  &__main {
    @include timerBox(450px, 200px, 200);
    background-color: $main-btn;
    font-size: 120px;
    @include userNone();
    transition: .5s;

    @include mq(s-m) {
      width: 350px;
      height: 180px;
      font-size: 100px;
    }

    @include mq(xs-s) {
      width: 300px;
      height: 170px;
      font-size: 90px;
    }
  }

  &__breath {
    @include timerBox(350px, 200px, 100);
    transition: .5s;

    margin: {
      top: 30px;
      left: -200px;
    }

    background-color: $breath-btn;
    font-size: 100px;
    @include userNone();

    @include mq(s-m) {
      width: 300px;
      height: 180px;
      font-size: 95px;
    }

    @include mq(xs-s) {
      width: 270px;
      height: 160px;
      font-size: 90px;
    }
  }
}

#timer__main--active {
  // box-shadow: 0px 0px 35px $main-btn;
  background-color: $stop-btn;
  box-shadow: 0px 0px 35px $stop-btn;
  z-index: 999;
}

#timer__breath--active {
  // box-shadow: 0px 0px 35px $breath-btn;
  box-shadow: 0px 0px 35px $breath-btn;
  z-index: 999;
}

.btn {
  display: flex;
  align-items: center;
  gap: 15px;

  margin: {
    top: 20px;
    left: 60px;
  }

  &__start {
    @include btnStyle($main-btn);

    &:hover {
      background-color: #734983;
    }
  }

  .fa-play {
    margin-left: 4px;
  }

  &__stop {
    @include btnStyle($stop-btn);

    &:hover {
      background-color: rgb(163, 0, 0);
    }
  }

  .fa-pause {
    margin-left: 4px;
  }

  &__reset {
    border: none;
    background-color: $bg-color;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>