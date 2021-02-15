<template>

<v-app id="inspire">
    <v-app id="inspire">
      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-snackbar
      v-model="snackbar"
      top
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
          <v-row
            align="center"
            justify="center"
          >
        
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                   
                    <span>Source</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                 <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="white accent-4"
      ></v-progress-linear>
                  <v-form

                  ref="form"
      v-model="valid"
                  
                  
                  >
                    <v-text-field
                      label="Login"
                      name="login"
                      v-model="email"
                      :rules="emailRules"
                      required
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
  
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      v-model="password"
                       :rules="passwordRules"
                      
                      prepend-icon="mdi-lock"
                      required
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  :disabled="!valid" color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-app>
</template>



<script>
    export default {
       data(){

           return {
              valid: true,
               source:"arun",
               email : "",
               emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
               password: "",
               passwordRules: [
        v => !!v || 'E-mail is required',
       
      ],
               loading: false,
                snackbar: false,
      text: '',
           }
       },
       methods:{
         login :function (){


                      
            axios.interceptors.request.use( (config) => {

                this.loading = true;
              
                return config;
              },  (error) => {
                this.loading = false;
              
                return Promise.reject(error);
              });


            axios.interceptors.response.use( (response) => {
              this.loading = false;
                
                return response;
              },  (error)=> {
                this.loading = false;
                
                return Promise.reject(error);
              });

              axios.post('api/login',{ 'email' :this.email , 'password' : this.password })
            .then(res => {
            console.dir(res.data.token);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('loginAlert',true);
            this.$router.push('/admin')
            .then(res=> console.log('logged in')).catch(err => console.log('failed'));

            })
            .catch(err =>{
              this.snackbar = true;
              this.text = err.response.data.status;
              console.dir(err);
            })





         
         }
       },
       created () {
    this.$vuetify.theme.dark = false
    
  },
    }
</script>