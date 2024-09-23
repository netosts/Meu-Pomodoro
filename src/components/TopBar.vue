<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

const navbar = ref("");

function toggleNavbar() {
  if (navbar.value === "") {
    navbar.value = "navbar--active";
  } else {
    navbar.value = "";
  }
}
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#">Seu Pomodoro</a>
      </div>

      <div class="mobilebox">
        <div class="mobilebar" @click="toggleNavbar">
          <div class="line__1"></div>
          <div class="line__2"></div>
          <div class="line__3"></div>
        </div>
        <a href="#" class="mobilelogo">
          <img src="/seu-pomodoro-icon.png" alt="seu pomodoro icon" />
        </a>
      </div>

      <div class="navbar" :class="navbar">
        <div class="navbar__content">
          <RouterLink
            to="/"
            class="navbar__content__routes"
            @click="toggleNavbar"
            >Home</RouterLink
          >
          <RouterLink
            to="/personalizar"
            class="navbar__content__routes"
            @click="toggleNavbar"
            >Personalizar</RouterLink
          >
          <!-- <RouterLink to="/pomodoro" class="navbar__content__routes" @click="toggleNavbar">Saiba mais</RouterLink>
          <RouterLink to="/sobre" class="navbar__content__routes" @click="toggleNavbar">Quem somos</RouterLink> -->
        </div>
        <div class="navbar__blur" @click="toggleNavbar"></div>
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
@import "../assets/mixins";
@import "../assets/variables";

header {
  height: 80px;
  background-color: #222222;
  border-bottom: 1px solid white;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 30px;

    .logo {
      @include mq(xl) {
        display: none;
      }

      a {
        font-family: "Tsukimi Rounded";
        font-size: 20px;
        font-weight: 500;
        text-transform: uppercase;
        @include textNone(white);
        background: linear-gradient(to right, white, bisque);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .navbar {
      @include mq(xl) {
        display: grid;
        grid-template-columns: 70% 30%;
        position: absolute;
        z-index: 9999;
        top: 80px;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
      }

      &__content {
        display: flex;
        gap: 15px;

        @include mq(xl) {
          flex-direction: column;
          gap: 0;
          background-color: #222222;
        }

        &__routes {
          @include textNone($txt-gray);
          padding: 26px 5px;
          transition: 0.1s;

          border: {
            top: 4px solid #222222;
            bottom: 4px solid #222222;
          }

          @include mq(xl) {
            width: 100%;
            text-align: center;

            border: {
              top: 4px solid #222222;
              bottom: 4px solid #222222;
            }
          }

          &:hover {
            color: white;
            border-bottom: 4px solid bisque;
          }

          @include mq(xl) {
            color: white;
            padding: 30px;

            &:hover {
              color: $txt-gray;
            }
          }
        }
      }
    }

    .navbar--active {
      animation-name: slide-bar;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
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
          @include txtUser(rgb(141, 103, 58));
          border-radius: 8px;
          background-color: bisque;
          padding: 10px;
          transition: 0.35s;

          &:hover {
            background-color: rgb(192, 171, 146);
          }
        }
      }
    }

    .mobilebox {
      display: none;

      @include mq(xl) {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .mobilebar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;

        div {
          width: 26px;
          height: 2px;
          background-color: white;
        }
      }

      .mobilelogo {
        display: flex;
        justify-content: center;

        img {
          width: 50px;
        }
      }
    }
  }
}
</style>
