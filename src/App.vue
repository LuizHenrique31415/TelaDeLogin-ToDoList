<script>
import ToDoList from './components/ToDoList.vue';

export default {
  name: 'App',  // Nome do componente
  components: {
    ToDoList  // Registrando o componente para uso
  }
}
</script>


<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
