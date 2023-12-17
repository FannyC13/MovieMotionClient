<template>
  <body class="center-container">
    <header>
      <div class="headernav">
        <div class="header-container">
          <div class="header-image">
            <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoMovieMotion.png" class="logo-nav-clean" />
          </div>
        </div>
        <div class="Navbar">
          <router-link to="/catalog-page" class="to-page-nav"
            :class="{ 'active-link': $route.path === '/catalog-page' }">Movies</router-link>
          <router-link to="/cinema" class="to-page-nav"
            :class="{ 'active-link': $route.path === '/cinema' }">Cinema</router-link>
          <router-link to="/contact"  class="to-page-nav"
            :class="{ 'active-link': $route.path === '/contact' }">About Us</router-link>
        </div>

        <div class="light">
          <DarkLightMode></DarkLightMode>
        </div>
      </div>
    </header>
    <a id="top"></a>
    <div class="seances-page">
      <div class="seances-container">
        <div class="salles-header">SALLES</div>
        <div class="detail-seances">
          <div class="detail-salles-dates-container">
            <div v-for="(seance, index) in seanceDates.sort((a, b) => a.jourChiffre - b.jourChiffre)" :key="index"
              class="salle-detail-seance-dates" :class="{ 'selected': SelectedIndex === index }"
              @click="selectDate(index)">
              <div class="seances-dates">
                <div class="salle-jour-seance">{{ seance.jour }}</div>
                <div class="salle-jour-chiffre-seance">{{ seance.jourChiffre }}</div>
                <div class="salle-mois-seance">{{ seance.mois }}</div>
              </div>
            </div>
          </div>
          <div class="movie-container">
            <div class="list-salles" v-if="SelectedIndex !== null">
              <div v-for="(salles, sallesIndex) in seanceDates[SelectedIndex].films" class="seances-cinema-details">

                <div class="seances-infos">
                  <div class="seances-films-container">
                    <div class="seances-films-infos" v-if="hasMovieWithTitle(salles.titre)">
                      <img :src="'/src/assets/Affiches/' + displayMovieDetails(salles.titre).image_src" alt="movie_pic"
                        class="seances-movie-cover">
                      <div class="seances-salles-cinema">
                        <div class="seances-cinema-name-age-tous">
                          <div class="seances-cinema-name-age">
                            <div class="seances-salles-cinema-name">{{ salles.titre }} </div>

                            <p v-if="displayMovieDetails(salles.titre).age !== 'Tous Public'" class="seance-detail-age">
                              -{{ displayMovieDetails(salles.titre)["age"] }}</p>

                            <p class="seance-detail-genre">{{ Genres.join('. ') }}</p>
                            <div class="seance-details-date-duration-langue">
                              <p class="seance-detail-genre">{{ displayMovieDetails(salles.titre)["langue"] }}</p>
                              <p class="seance-detail-genre">{{ displayMovieDetails(salles.titre)["duration"] }}</p>
                              <p class="seance-detail-genre">{{
                                displayMovieDetails(salles.titre)["date_sortie"].substring(0, 4) }}</p>
                            </div>

                          </div>
                          <p v-if="displayMovieDetails(salles.titre).age == 'Tous Public'" class="seance-detail-age-tous">
                            {{ displayMovieDetails(salles.titre)["age"] }}
                          </p>



                          <p class="seance-detail-genre">{{ displayMovieDetails(salles.titre)["realisateur"] }}</p>

                          <div class="seance-detail-acteurs">
                            <div v-for="acteurs in Acteurs">
                              <p class="seance-detail-genre">{{ acteurs }}</p>
                            </div>
                          </div>
                        </div>

                        <div class="seance-detail-synopsis" v-if="hasMovieWithTitle(salles.titre)">{{
                          displayMovieDetails(salles.titre)["synopsis"] }}


                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="seances">

                    <div v-for="(seance, seanceIndex) in salles.seances" :key="seanceIndex" class="salles-seance">
                      <div class="seance-heure">{{ seance.heure }}</div>
                      <div class="seance-version">{{ seance.version }}</div>
                    </div>
                  </div>
                </div>

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
import ListePage from "../components/CatalogPage/ListePage.vue";
import axios from "axios";
import { checkAdminToken, setAuthentication, isAuthenticatedUser } from '../router/auth';


export default defineComponent({
  name: "SeancesPage",
  components: {
    DarkLightMode,
    ListePage,

  },
  data() {
    return {
      seancesList: [
        { titre: 'Dune', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00', version: 'VO' }, { heure: '18:00', version: 'VF' }] }, { name: 'Pathé Opéra', ville: 'Paris 02', seances: [{ heure: '17:30', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VOSTFR' }, { heure: '19:00', version: 'VOSTFR' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:00', version: 'VO' }, { heure: '19:30', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Halles', ville: 'Paris 01', seances: [{ heure: '14:30', version: 'VO' }, { heure: '17:45', version: 'VO' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
        { titre: 'Interstellar', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00' }, { heure: '18:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30', version: 'VO' }, { heure: '16:00', version: 'VF' }, { heure: '20:00', version: 'VOSTFR' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VO' }, { heure: '21:30', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VOSTFR' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
        { titre: 'Joker', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VO' }, { heure: '19:00', version: 'VO' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30', version: 'VO' }, { heure: '15:00', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Le Grand Rex', ville: 'Paris 02', seances: [{ heure: '15:00', version: 'VO' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Bercy', ville: 'Paris 14', seances: [{ heure: '13:00', version: 'VOSTFR' }, { heure: '20:30', version: 'VF' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VF' }, { heure: '19:00', version: 'VO' }] }] }] },
        { titre: 'Scary Movie', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Montparnasse', ville: 'Paris 06', seances: [{ heure: '18:00', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Le Luxor', ville: 'Paris 10', seances: [{ heure: '15:30', version: 'VO' }, { heure: '18:00', version: 'VO' }, { heure: '21:00', version: 'VO' }] }, { name: 'Mk2 Nation', ville: 'Paris 12', seances: [{ heure: '16:30', version: 'VO' }, { heure: '20:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30', version: 'VO' }] }, { name: 'Mk2 Bibliothèque', ville: 'Paris 13', seances: [{ heure: '17:45', version: 'VF' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
        { titre: 'The Maze Runner', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '17:00', version: 'VO' }, { heure: '19:00', version: 'VO' }] }, { name: 'MK2 Gambetta', ville: 'Paris 20', seances: [{ heure: '14:30', version: 'VOSTFR' }, { heure: '16:00', version: 'VOSTFR' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '16:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Issy-Les-Moulineaux', ville: 'Issy-Les-Moulineaux', seances: [{ heure: '16:00', version: 'VF' }, { heure: '21:30', version: 'VOSTFR' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VF' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VF' }] }, { name: 'Pathé Boulogne', ville: 'Boulogne', seances: [{ heure: '15:15', version: 'VF' }, { heure: '18:30', version: 'VO' }] }] }, { jour: 'Mer', jourChiffre: 29, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VO' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '15:15', version: 'VOSTFR' }, { heure: '17:30', version: 'VF' }] }] }] },
        { titre: 'Top Gun', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Pathé Ivry', ville: 'Ivry-Sur-Seine', seances: [{ heure: '16:30', version: 'VO' }, { heure: '18:00', version: 'VO' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30', version: 'VF' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VO' }, { heure: '21:30', version: 'VF' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '18:30', version: 'VF' }, { heure: '20:00', version: 'VO' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VF' }] }, { name: 'Helios', ville: 'Colombes', seances: [{ heure: '16:15', version: 'VF' }, { heure: '18:30', version: 'VF' }] }] }] },
        { titre: 'Uncharted', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Royal Palace', ville: 'Nogent-Sur-Marne', seances: [{ heure: '16:00', version: 'VO' }, { heure: '18:00', version: 'VO' }] }, { name: 'Pathé Thiais', ville: 'Thiais', seances: [{ heure: '15:30', version: 'VO' }, { heure: '19:45', version: 'VOSTFR' }, { heure: '22:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VOSTFR' }, { heure: '21:30', version: 'VF' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VF' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '16:15', version: 'VF' }, { heure: '18:30', version: 'VO' }] }] }] }
      ],
      cinemas: [{ cinema: "UGC Gobelins", ville: "Paris 13" }, { cinema: "Pathé Opéra", ville: "Paris 02" }, { cinema: "Mk2 Bastille", ville: "Paris 11" }, { cinema: "Mk2 Odéon", ville: "Paris 06" }, { cinema: "UGC Halles", ville: "Paris 01" }, { cinema: "UGC Danton", ville: "Paris 06" }, { cinema: "Le Grand Rex", ville: "Paris 02" }, { cinema: "UGC Bercy", ville: "Paris 14" }, { cinema: "UGC Montparnasse", ville: "Paris 06" }, { cinema: "Le Luxor", ville: "Paris 10" }, { cinema: "Mk2 Nation", ville: "Paris 12" }, { cinema: "MK2 Gambetta", ville: "Paris 20" }, { cinema: "UGC Issy-Les-Moulineaux", ville: "Issy-Les-Moulineaux" }, { cinema: "Pathé Boulogne", ville: "Boulogne" }, { cinema: "UGC Creteil", ville: "Créteil" }, { cinema: "UGC Velizy", ville: "Velizy" }, { cinema: "Pathé Ivry", ville: "Ivry-Sur-Seine" }, { cinema: "Helios", ville: "Colombes" }, { cinema: "Royal Palace", ville: "Nogent-Sur-Marne" }, { cinema: "Pathé Thiais", ville: "Thiais" }],
      dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00' }, { heure: '18:00' }] }, { name: 'Pathé Opéra', ville: 'Paris 02', seances: [{ heure: '17:30' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:00' }, { heure: '19:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Halles', ville: 'Paris 01', seances: [{ heure: '14:30' }, { heure: '17:45' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }],
      SelectedIndex: 0,
      cinema: '',
      movies: [],
      Genre: [] as string[],
      seanceData: [] as Array<{ cinema: string; ville: string; dates: Array<{ jour: string; jourChiffre: number; mois: string; films: Array<{ titre: string; seances: Array<{ heure: string; version: string; }>; }>; }>; }>,
      Genres: [],
      Acteurs: [],
      seanceDates: [] as Array<{ jour: string; jourChiffre: number; mois: string; films: Array<{ titre: string; seances: Array<{ heure: string; version: string; }>; }>; }>,
    };
  },
  created() {

    this.cinema = Array.isArray(this.$route.params.cinema) ? this.$route.params.cinema[0] : this.$route.params.cinema || "";
    this.transformedData = this.transformData(this.seancesList);
    this.seanceData = this.transformedData.find(entry => entry.cinema === this.cinema)
    this.seanceDates = this.seanceData.dates;
    const storedMovies = localStorage.getItem('movies');
    const parsedMovies = JSON.parse(storedMovies);
    this.movies = parsedMovies

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
    hasMovieWithTitle(titre) {
      return this.movies.some(movie => movie.titre === titre);
    },
    displayMovieDetails(titre) {

      const movie = this.movies.find(movie => movie.titre === titre);

      this.Genres = movie["genres"].map(function (item) { return item.genre; });
      this.Acteurs = movie["acteurs"].map(function (item) { return item.nom_acteur; });


      return movie

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
              (d) => d.jourChiffre === date.jourChiffre && d.mois === date.mois
            );

            if (!dateInfo) {
              dateInfo = {
                jour: date.jour,
                jourChiffre: date.jourChiffre,
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

            this.$router.push("/seances/" + cinema);
          }
        });
      } else {
        this.$router.push("/seances/" + cinema);
      }
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
  },

  async mounted() {
    this.redirection();
    await this.onMounted();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

});
</script>
