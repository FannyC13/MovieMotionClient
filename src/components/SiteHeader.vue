<template>
  <header>
    <div>
        <h1>MOVIE MOTION</h1>
    </div>
    


  
  </header>
</template>

<script lang = "ts">
export default {
    name: 'SiteHeader',
    components: {

    },
    data() {
        return {
          
        };
    },
    beforeMount(){
    
    },
    methods:{
      
    }
}
</script>

<style scoped>
h1{
    color: #DCDCDD;
}
header{
    padding: 1vw;
    display: flex;
    justify-content: space-between;
    background-color: #46494C;
    height: 10vh;
    border-bottom: 2px solid #1985A1;
}
#loginbutton{
    text-decoration: none;
    border-radius: 5px;
    background-color: #1985A1;
    color: white;
    height: 5vh;
    width: 5vw;
}
</style>