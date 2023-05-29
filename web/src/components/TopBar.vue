<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'


const navbar = ref('')

function toggleNavbar() {
  if (navbar.value === '') {
    navbar.value = 'navbar--active'
  } else {
    navbar.value = ''
  }
}
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#">Meu Pomodoro</a>
      </div>

      <div class="mobilebar" @click="toggleNavbar">
        <div class="line__1"></div>
        <div class="line__2"></div>
        <div class="line__3"></div>
      </div>

      <div class="navbar" :class="navbar">
        <RouterLink to="/" class="navbar__routes">Home</RouterLink>
        <RouterLink to="/pomodoro" class="navbar__routes">Entenda mais</RouterLink>
        <RouterLink to="/sobre" class="navbar__routes">Quem somos</RouterLink>
      </div>

      <div class="user">
        <div class="user__login">
          <RouterLink to="/entrar">Entrar</RouterLink>
        </div>
        <div class="user__signup">
          <RouterLink to="/cadastro">Criar conta</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/mixins';
@import '../assets/variables';

header {
  height: 80px;
  background-color: #222222;
  border-bottom: 1px solid $txt-gray;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 30px;

    .logo {
      @include mq(m) {
        display: none;
      }

      a {
        font-family: 'Tsukimi Rounded';
        font-size: 20px;
        font-weight: 500;
        text-transform: uppercase;
        @include textNone(white);
      }
    }

    .navbar {
      display: flex;
      gap: 20px;

      @include mq(m) {
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 0;
        position: absolute;
        top: 80px;
        left: 0;
        background-color: #333333;
        width: 400px;
        height: 500px;
        transform: translateX(-100%)
      }

      &__routes {
        @include textNone($txt-gray);

        @include mq(m) {
          color: white;
          padding: 30px;

          &:hover {
            color: $txt-gray;
          }
        }
      }
    }

    .navbar--active {
      transform: translateX(0);
    }

    .user {
      display: flex;
      align-items: center;
      gap: 20px;

      &__login {
        a {
          @include txtUser(white);
        }
      }

      &__signup {

        a {
          @include txtUser(rgb(141, 93, 38));
          border-radius: 8px;
          background-color: bisque;
          padding: 10px;
          transition: .35s;

          &:hover {
            background-color: rgb(192, 171, 146);
          }
        }
      }
    }

    .mobilebar {
      display: none;

      @include mq(m) {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      div {
        width: 26px;
        height: 2px;
        background-color: white;
      }
    }
  }
}
</style>