<script setup>
</script>

<template>
  <header>
    <!-- Menu -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="#">Relaciones binarias</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/operations">Operaciones</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/about">Acerca de</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </header>
</template>
