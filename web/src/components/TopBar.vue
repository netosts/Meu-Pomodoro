<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#">Meu Pomodoro</a>
      </div>

      <div class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pomodoro">Entenda mais</RouterLink>
        <RouterLink to="/sobre">Quem somos</RouterLink>
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
header {
  height: 80px;
  background-color: #222222;

  nav {
    display: flex;
    align-items: center;
    padding: 0 25px;

    .logo {
      position: absolute;
      top: 30px;

      a {
        font-family: 'Tsukimi Rounded';
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        color: white;
      }
    }
  }
}
</style>