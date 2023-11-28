<template>
    <body>
        <div class="Landing-page-container">
            <header>
                <div class="header-container">
                   
                    <div>
                        <router-link to="/catalog-page" class="LogRegBtnLink"
                            style="--shadow: rgb(127, 171, 220); --color: #5c7583; --background: #85b7d4">Catalog</router-link>
                        <router-link to="/register-page" class="LogRegBtnLink"
                            style="--shadow: rgb(138, 103, 177); --color: rgb(162, 85, 255,0.3); --background: #c18cd6">Register</router-link>
                    </div>
                </div>
            </header>

            <a id="top"></a>
            <div class="WelcomePrompt">
                <div class="Landing-banner-container">
                    <div class="Landing-banner">
                        <div class="Landing-banner-text">
                            <h2 class="Slogan">Your Movie Website</h2>
                            <br />
                            <h2 class="TimeToDo">Movie Motion</h2>
                            <br />
                            <h2 class="Slogan">Découvre tous les films actuels</h2>
                        </div>
                     
                    </div>
                </div>
                <p>
                    Always wanted to access directly behind your screen ?<br /><br />This is the place for
                    you
                </p>

                <router-link to="/register-page" class="TryOutBtnLink">Try it out!</router-link>
            </div>
            <div class="SiteContent-container">
                <div class="VocabPrez">
                    <div class="VocabDescription">
                        <h1 class="VocabH1">10 000+ books at your disposition</h1>
                        <p>
                            Browse our endless selection of reads
                            <br /><br />
                            With our curated filters and recommendation algorithm, you're garenteed to find what you seek !
                        </p>
                    </div>
             
                </div>
                <div class="ExoPrez">
         
                    <div class="ExoDescription">
                        <h1>Personalized library</h1>
                        <p>
                            Keep a record of the books you've rented, so that you can read your favorites over and over
                            again...<br /><br />
                            And feed your wishlist to discover your next adventure !
                        </p>
                    </div>
                </div>
                <div class="VocabPrez">
                    <div class="VocabDescription">
                        <h1 class="TestH1">An interactive experience</h1>
                        <p>
                            Can't find a book you've been dying to read ? Notify our team and we'll make sure to upload it
                            ASAP <br /><br />
                            Found the thriller book your best friend's been dreaming of ? Share it to her in one click !
                        </p>
                    </div>
    
                </div>
                <div class="WelcomePrompt WelcomeEnd">
                    <h1> </h1>
                    <router-link to="/register-page" class="TryOutBtnLink">Get started!</router-link>
                </div>
            </div>
            <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                    icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
            <footer>
                <div class="content-footer">
                    <div class="top">
                        <div class="logo-details">
                           
                            <p class="logo-name">
                                MOVIE MOTION <br />
                                <small>est. 2023</small>
                            </p>
                        </div>
                       
                    </div>
                </div>
            </footer>
        </div>
    </body>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: "LandingPage",
  mounted() {
    var thisID = document.getElementById("TopBtn");
    var myScrollFunc = () => {
      var y = window.scrollY;
      if (y >= 300) {
        thisID!.className = "fa fa-angle-double-up show";
      } else {
        thisID!.className = "fa fa-angle-double-up hide";
      }
    };
    window.addEventListener("scroll", myScrollFunc);
  },
});
</script>

<style></style>
