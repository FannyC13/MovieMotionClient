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
                        :class="{ 'active-link': $route.path === '/catalog-recs-page' }">Contacts</router-link>
                </div>

                <div class="light">
                    <DarkLightMode></DarkLightMode>
                </div>
            </div>
        </header>
        <a id="top"></a>
        <div class="cinema-page">
            <div class="seances-container">
                <div class="salles-header">SALLES</div>
                <div class="detail-salles">
                    <div class="list-salles" v-if="SelectedIndex !== null">
                        <div v-for="(salles, sallesIndex) in cinemas" class="salles-cinema-details"
                            @click="openSeancesPage(salles.cinema)">

                            <div class="salles-info">
                                <div class="salles-cinema">
                                    <div class="salles-cinema-name">{{ salles.cinema }} </div>
                                    <span class="arrow"> <font-awesome-icon icon = "fa-solid fa-couch"/> </span>
                                </div>
                                <div class="salles-cinema-ville">{{ salles.ville }} </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
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
import ListePage from "../components/CatalogPage/ListePage.vue"; ListePage
import axios from "axios";

export default defineComponent({
    name: "CinemaPage",
    components: {
        DarkLightMode,
        ListePage,

    },
    data() {
        return {
            seances: [
                { titre: 'Dune', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00', version: 'VO' }, { heure: '18:00', version: 'VF' }] }, { name: 'Pathé Opéra', ville: 'Paris 02', seances: [{ heure: '17:30', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VOSTFR' }, { heure: '19:00', version: 'VOSTFR' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:00', version: 'VO' }, { heure: '19:30', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Halles', ville: 'Paris 01', seances: [{ heure: '14:30', version: 'VO' }, { heure: '17:45', version: 'VO' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
                { titre: 'Interstellar', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00' }, { heure: '18:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] },
                { titre: 'Joker', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '19:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30' }, { heure: '15:00' }, { heure: '20:00' }] }, { name: 'Le Grand Rex', ville: 'Paris 02', seances: [{ heure: '15:00' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Bercy', ville: 'Paris 14', seances: [{ heure: '13:00' }, { heure: '20:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }] },
                { titre: 'Scary Movie', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Montparnasse', ville: 'Paris 06', seances: [{ heure: '18:00' }, { heure: '20:00' }] }, { name: 'Le Luxor', ville: 'Paris 10', seances: [{ heure: '15:30' }, { heure: '18:00' }, { heure: '21:00' }] }, { name: 'Mk2 Nation', ville: 'Paris 12', seances: [{ heure: '16:30' }, { heure: '20:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bibliothèque', ville: 'Paris 13', seances: [{ heure: '17:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] },
                { titre: 'The Maze Runner', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '17:00' }, { heure: '19:00' }] }, { name: 'MK2 Gambetta', ville: 'Paris 20', seances: [{ heure: '14:30' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '16:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Issy-Les-Moulineaux', ville: 'Issy-Les-Moulineaux', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Pathé Boulogne', ville: 'Boulogne', seances: [{ heure: '15:15' }, { heure: '18:30' }] }] }, { jour: 'Mer', jourChiffre: 29, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VO' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '15:15' }, { heure: '17:30' }] }] }] },
                { titre: 'Top Gun', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Pathé Ivry', ville: 'Ivry-Sur-Seine', seances: [{ heure: '16:30' }, { heure: '18:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '18:30' }, { heure: '20:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Helios', ville: 'Colombes', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] },
                { titre: 'Uncharted', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Royal Palace', ville: 'Nogent-Sur-Marne', seances: [{ heure: '16:00' }, { heure: '18:00' }] }, { name: 'Pathé Thiais', ville: 'Thiais', seances: [{ heure: '15:30' }, { heure: '19:45' }, { heure: '22:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] }
            ],
            cinemas: [{ cinema: "UGC Gobelins", ville: "Paris 13" }, { cinema: "Pathé Opéra", ville: "Paris 02" }, { cinema: "Mk2 Bastille", ville: "Paris 11" }, { cinema: "Mk2 Odéon", ville: "Paris 06" }, { cinema: "UGC Halles", ville: "Paris 01" }, { cinema: "UGC Danton", ville: "Paris 06" }, { cinema: "Le Grand Rex", ville: "Paris 02" }, { cinema: "UGC Bercy", ville: "Paris 14" }, { cinema: "UGC Montparnasse", ville: "Paris 06" }, { cinema: "Le Luxor", ville: "Paris 10" }, { cinema: "Mk2 Nation", ville: "Paris 12" }, { cinema: "MK2 Gambetta", ville: "Paris 20" }, { cinema: "UGC Issy-Les-Moulineaux", ville: "Issy-Les-Moulineaux" }, { cinema: "Pathé Boulogne", ville: "Boulogne" }, { cinema: "UGC Creteil", ville: "Créteil" }, { cinema: "UGC Velizy", ville: "Velizy" }, { cinema: "Pathé Ivry", ville: "Ivry-Sur-Seine" }, { cinema: "Helios", ville: "Colombes" }, { cinema: "Royal Palace", ville: "Nogent-Sur-Marne" }, { cinema: "Pathé Thiais", ville: "Thiais" }],
            dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00' }, { heure: '18:00' }] }, { name: 'Pathé Opéra', ville: 'Paris 02', seances: [{ heure: '17:30' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:00' }, { heure: '19:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Halles', ville: 'Paris 01', seances: [{ heure: '14:30' }, { heure: '17:45' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }],
            SelectedIndex: 0,

        };
    },
    computed: {

        nbMovies() {
            return this.filteredMovies.length;
        },
        nbPages() {
            return Math.ceil(this.nbMovies / this.nbMoviesPerPage);
        },
        filteredMovies() {
            let movies = this.movies;
            return movies;
        },
    },
    methods: {
        openSeancesPage(salle) {
            this.$router.push({ name: 'SeancesPage', params: { cinema: salle } });
            window.scrollTo(0, 0);
        },
        selectDate(index) {
            console.log(index)
            this.SelectedIndex = index;
        },
        transformData(inputData) {
            const outputData = [];

            inputData.forEach((movie) => {
                movie.dates.forEach((date) => {
                    date.cinemas.forEach((cinema) => {
                        let cinemaDay = outputData.find(
                            (item) => item.cinema === cinema.name && item.ville === cinema.ville
                        );

                        if (!cinemaDay) {
                            cinemaDay = { cinema: cinema.name, ville: cinema.ville, dates: [] };
                            outputData.push(cinemaDay);
                        }

                        let dateInfo = cinemaDay.dates.find(
                            (d) => d.jourChiffres === date.jourChiffre && d.mois === date.mois
                        );

                        if (!dateInfo) {
                            dateInfo = {
                                jour: date.jour,
                                jourChiffres: date.jourChiffre,
                                mois: date.mois,
                                films: [],
                            };
                            cinemaDay.dates.push(dateInfo);
                        }

                        const filmTitle = movie.titre;
                        const existingFilm = dateInfo.films.find((film) => film.titre === filmTitle);

                        if (!existingFilm) {
                            const seances = cinema.seances.map((seance) => ({
                                heure: seance.heure,
                                version: seance.version || 'VF',
                            }));

                            dateInfo.films.push({ titre: filmTitle, seances });
                        }
                    });
                });
            });

            return outputData;
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



            console.log(this.dates)
        },
    },

    async mounted() {
        await this.onMounted();
        console.log(this.transformData(this.seances))
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

});
</script>
