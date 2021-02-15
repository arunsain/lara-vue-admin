<template>
<div>
   <v-container>
   <v-alert type="info">I am vuetify component v alert</v-alert>
     <v-main>
    <v-btn link to="/foo">Foo component</v-btn>
    <v-btn link to="/bar">Foo component</v-btn>
    <v-btn link to="/user/Arun">Foo component</v-btn>
    <router-view></router-view>
    
    </v-main>
    </v-container>
  
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
