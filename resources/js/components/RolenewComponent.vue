<template>
<v-data-table item-key="name" class="elevation-1" 
:loading = "loading" 
loading-text="Loading... Please wait"
 :headers="headers"
    :items="desserts.data"
    sort-by="calories"
    :items-per-page=5
    :server-items-length="desserts.total"
    @pagination = "paginate"
    :footer-props="{

        itemsPerPageOptions:[5,10,15] ,
        itemsPerPageText:'Roless per page'

    }"
  
>


 <template v-slot:top >
      <v-toolbar flat color="dark">
        <v-toolbar-title>Post</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="error"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >New Post</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.name" label="Role name"></v-text-field>
                  </v-col>
               
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
 






</v-data-table>
</template>


<script>
  export default {
    data: () => ({
      loading:false,
      dialog: false,
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id',
        },
       
        { text: 'Name', value: 'name' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Updated At', value: 'updated_at' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Post' : 'Edit Post'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
        paginate(e){
          console.log(e);
             axios.get(`/api/roleLIst?page=${e.page}`,{ params:{ 'per_page':e.itemsPerPage }})
  .then( (response) => {
     this.desserts = response.data.roles;
    
  })
  .catch( (error)=> {
   
   
    if( error.response.status == 401){
      localStorage.removeItem('token');
      this.$router.push('/login');


    }

  })
  .then( () =>{
    // always executed
  });


        },
      initialize () {
      

       
axios.interceptors.request.use( (config) =>{
  this.loading = true;
    return config;
  },  (error) => {
    this.loading = false;
    return Promise.reject(error);
  });


axios.interceptors.response.use( (response) => {
   this.loading = false;
    return response;
  },(error) => {
    this.loading = false;
    return Promise.reject(error);
  });

 



      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
      const cnf =   confirm('Are you sure you want to delete this item?') ;
        if(cnf){
          axios.delete('/api/roles/'+item.id)
  .then( (response) => {
    
    this.desserts.splice(index, 1)
  })
  .catch(function (error) {
    console.log(error);
  });

        }
      
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
         
        })
      },

      save () {
        if (this.editedIndex > -1) {
          axios.put('/api/roles/'+this.editedItem.id, {
    name: this.editedItem.name
   
  })
  .then( response => {
   
    console.log(this.editedIndex);
     Object.assign(this.desserts[this.editedIndex], response.data.role)
      this.editedIndex = -1
  })
  .catch( (error) =>{
    console.log(error);
  
  });
         
        } else {
          axios.post('/api/roles', {
          name: this.editedItem.name
          
          })
          .then( (response) => {
            this.desserts.push(response.data.role)
         
          })
          .catch( (error) => {
          console.log(error);
          });
          
        }
        this.close()
      },
    },
  }
</script>




