<script setup>
import { ref, watchEffect, computed } from 'vue';


const mainTimer = ref(0);
const breathTimer = ref(0);
const mainRemainingTime = ref(10); // 1800 seconds = 30 minutes
const breathRemainingTime = ref(10); // 300 seconds = 5 minutes
let intervalId = null;
const isTimerActive = ref(false);
const isMainActive = ref(false);
const isBreathActive = ref(false);


function startTimer() {
  intervalId = setInterval(() => {
    if (mainRemainingTime.value > 0) {
      mainRemainingTime.value--;
      isMainActive.value = true;
    } else if (breathRemainingTime.value > 0) {
      breathRemainingTime.value--;
      isMainActive.value = false;
      isBreathActive.value = true;
    } else {
      stopTimer();
    }
  }, 1000);
  isTimerActive.value = true;
};

function stopTimer() {
  clearInterval(intervalId);
  isTimerActive.value = false;
  isMainActive.value = false;
  isBreathActive.value = false;
};

function resetTimer() {
  clearInterval(intervalId);
  mainRemainingTime.value = 1500;
  breathRemainingTime.value = 300;
  isTimerActive.value = false;
  isMainActive.value = false;
  isBreathActive.value = false;
}

watchEffect(() => {
  // Show main timer on screen
  const mainMinutes = Math.floor(mainRemainingTime.value / 60);
  const formattedMainMinutes = mainMinutes.toString().padStart(2, '0'); // Show minutes as two numbers always
  const mainSeconds = mainRemainingTime.value % 60;
  const formattedMainSeconds = mainSeconds.toString().padStart(2, '0'); // Show seconds as two numbers always
  mainTimer.value = `${formattedMainMinutes}:${formattedMainSeconds}`;

  // Show breath timer on screen
  const breathMinutes = Math.floor(breathRemainingTime.value / 60);
  const formattedBreathMinutes = breathMinutes.toString().padStart(2, '0'); // Show minutes as two numbers always
  const breathSeconds = breathRemainingTime.value % 60;
  const formattedBreathSeconds = breathSeconds.toString().padStart(2, '0'); // Show seconds as two numbers always
  breathTimer.value = `${formattedBreathMinutes}:${formattedBreathSeconds}`;
});
</script>

<template>
  <section>
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
        Start <font-awesome-icon icon="fa-solid fa-play" size="l" />
      </button>
      <button class="btn__stop" v-show="isTimerActive" @click="stopTimer">
        Pause <font-awesome-icon icon="fa-solid fa-pause" size="l" />
      </button>
      <button class="btn__reset" @click="resetTimer">
        <font-awesome-icon icon="fa-solid fa-rotate" flip="horizontal" size="2xl" style="color: #333" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/variables';
@import '../assets/mixins';

.timer {
  display: flex;
  height: 200px;

  &__main {
    @include timerBox(450px, 200px, 200);
    background-color: $main-btn;
    font-size: 120px;
    @include userNone();
    transition: 6s;
  }

  &__breath {
    @include timerBox(350px, 200px, 100);
    transition: 6s;

    margin: {
      top: 30px;
      left: -200px;
    }

    background-color: $breath-btn;
    font-size: 90px;
    @include userNone();
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