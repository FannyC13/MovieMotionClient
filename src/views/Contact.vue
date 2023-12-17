<template>
    <body>
        <header>
            <div class="headernav">
                <div class="header-container">
                    <div class="header-image">
                        <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoMovieMotion.png"
                            class="logo-nav-clean" />
                    </div>
                </div>
                <div class="Navbar">
                    <router-link to="/catalog-page" class="to-page-nav"
                        :class="{ 'active-link': $route.path === '/catalog-page' }">Movies</router-link>
                    <router-link to="/cinema" class="to-page-nav"
                        :class="{ 'active-link': $route.path === '/cinema' }">Cinema</router-link>
                    <router-link to="/catalog-recs-page" class="to-page-nav"
                        :class="{ 'active-link': $route.path === '/contact' }">About Us</router-link>
                </div>

                <div class="light">
                    <DarkLightMode></DarkLightMode>
                </div>
            </div>
        </header>
        <div class="AboutUs-Page">
            <div class="AboutUs-Container">
                <div class="project-container">
                    <div class="project-description-container">
                        <div class="project-description">
                            Dans ce projet, nous proposons une application Web fournissant des
                            services REST.
                            La projet consiste à présenter les horaires des films dans les différentes salles de cinéma.
                            <br><br>
                            Le premier service (Page Movies) sert à afficher tous les films et pour chaque film, les détails
                            ainsi que les séances
                            sont affichées. Cette page se fait via une page Web en libre accès, aucune connexion n'est
                            requise.
                            <br><br>

                            Le deuxième service (Page Cinema) sert à afficher tous les films, leurs séances ainsi que ses
                            détails
                            pour un cinéma donné par dates.

                            <br><br>
                            Le dernier service nécessite un token qui devra être entré dans l'url (/token). N'importe quel
                            Url peut être pris.
                            Le token amènera à une page administrateur dans lequel ce dernier aura accès aux différentes
                            tables des films et séances.
                            Ainsi, l'administrateur pourra créer, mettre à jour et supprimer des films, des cinémas ou
                            encore des séances.
                            la publication de nouveaux films et leurs horaires. Pour cela, vous

                            <br><br>

                            Chaque film est défini par ces critères :
                            
                            <li>titre ;</li>
                            <li>durée ;</li>
                            <li>langue (sous-titres si besoin) ;</li>
                            <li>réalisateur ;</li>
                            <li>acteurs principaux ;</li>
                            <li>âge minimum requis.</li>
                            
                    </div>
                    </div>
                    <div class="members-projet">
                        <div class="details-membres">
                            <img src="../assets/Membres/Paul.jpeg" class="cover details-membres" />
                            <p class="detail-membre">Paul Machard</p>
                        </div>
                        <div class="details-membres">
                            <img src="../assets/Membres/Leo.jpeg" class="cover details-membres" />
                            <p class="detail-membre">Léo Gonzalez</p>
                        </div>
                        <div class="details-membres">
                            <img src="../assets/Membres/Fanny.jpeg" class="cover details-membres" />
                            <p class="detail-membre">Fanny Chang</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a id="top"></a>
        <footer>
            <div class="content-footer">
                <div class="top">
                    <div class="logo-details">
                        <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoJour1.png" class="logo-nav-clean" />
                        <p class="logo-name">
                            Movie Motion <br />
                            <small>est. 2023</small>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DarkLightMode from "../components/DarkLightMode.vue";
import ListePage from "../components/CatalogPage/ListePage.vue";
import { checkAdminToken, setAuthentication } from '../router/auth'

export default defineComponent({
    name: "CatalogPageAdmin",
    components: {
        DarkLightMode,
        ListePage,

    },
    methods: {
        redirection() {
            const token = this.$route.params.token;
            const cinema = this.$route.params.cinema
            if (token) {
                console.log("This is the token", token)
                checkAdminToken(token).then((isAdmin) => {
                    setAuthentication(isAdmin);
                    if (isAdmin) {
                        this.$router.push({ name: 'Admin' });

                    } else {

                        this.$router.push("/contact");
                    }
                });
            } else {
                this.$router.push("/contact");
            }
        },
    },
    async onMounted() {
        var thisID = document.getElementById("TopBtn")!;
        if (thisID) {
            thisID.className = "fa fa-angle-double-up show";
        }
        var SearchClass = document.getElementById("search-container-fixe");
        var myScrollFunc = function () {
            var y = window.scrollY;
            if (y >= 300) {
                thisID.className = "fa fa-angle-double-up show";
            } else {
                thisID.className = "fa fa-angle-double-up hide";
            }
        };
        window.addEventListener("scroll", myScrollFunc);
        window.addEventListener('resize', this.handleWindowResize);

    },

    async mounted() {
        this.redirection();
        await this.onMounted();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }
})

</script>