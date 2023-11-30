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
        <div class="catalog-page">
            <div class="search-and-movie-container">
                
                <div class="search-container">
                    <div class="filter-search">
                    <div class="filter-container">
                            <font-awesome-icon icon="fa-solid fa-bars" @click="showFilterPage()" />
                        </div>

                        <div class="search-bar-container" id="first-searchy-bar">
                            <input type="text" placeholder="Search.." v-model="searchBar" name="search" id="search-bar"
                                @keyup.enter="getFilteredMoviesWithoutAPI()">
                            <div class = "search-icon" @click="getFilteredMoviesWithoutAPI()"><font-awesome-icon
                                    icon="fa-solid fa-magnifying-glass" /></div>
                        </div>
                    </div>
                   
                    <div class="slider-radio">
                        <input type="radio" name="grade" id="featured" checked>
                        <label for="featured">Featured</label>

                        <input type="radio" name="grade" id="popular">
                        <label for="popular" style="">Popular</label>

                        <input type="radio" name="grade" id="newest">
                        <label for="newest" style="">Newest</label>
                    </div>


                </div>

                <div class="movie-counter-container">


                    <div class="movie-catalog-container">

                        <div v-for="(movie) in movies"
                            @click="OpenDetails(movie.titre, movie.genres, movie.synopsis, movie.duration, movie.date_sortie, movie.trailer, movie.langue, movie.age)">

                            <div class="movie">
                                <div>
                                    <img :src="'src/assets/Affiches/' + movie.image_src" alt="movie_pic"
                                        class="movie-cover">
                                </div>
                                <div class="movie-title"> {{ movie.titre }} </div>
                                <div class="movie-specs">{{ movie.date_sortie }}</div>


                            </div>
                        </div>
                    </div>

                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangePage(-1)" />

                        <ListePage class="custom-select" v-model:selected-page="selectedPage" v-model:nb-pages="nbPages" />

                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangePage(+1)" />
                    </div>
                    <div id="myModalFilter" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close" @click='CloseFilterPage'>&times;</span>

                            <div class="filterblock-container">
                                <div class="filter-title-container">
                                    <p class="filter-main-Title">Filters</p>
                                </div>
                                <div class="filter-container">
                                    <div class="filters-list">
                                        <ul>
                                            <li class="filters-list-li">
                                                <div class="filter-title">
                                                    Genre
                                                </div>
                                                <div class="filters">
                                                    <label class="task-container" v-for="genre in genre_list"
                                                        :key="genre">{{ genre }}
                                                        <input type="checkbox" :value=genre v-model="selectedGenres"
                                                            @change="getFilteredMoviesWithoutAPI()" />
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li class="filters-list-li">
                                                <div class="filter-title">
                                                    Language
                                                </div>
                                                <div class="filters">
                                                    <label class="task-container" v-for="langue in langues_list"
                                                        :key="langue">{{ langue }}
                                                        <input type="checkbox" :value="langue" v-model="selectedLanguages"
                                                            @change="getFilteredMoviesWithoutAPI()" />
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            </li>

                                            <li class="filters-list-li">
                                                <div class="filter-title">
                                                    Date
                                                </div>
                                                <div class="filters">
                                                    <label class="task-container" v-for="date in sortie_list" :key="date">{{
                                                        date }}
                                                        <input type="checkbox" :value="date" v-model="selectedDuration"
                                                            @change="getFilteredMoviesWithoutAPI()" />
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-center">


                                <div class="delete-list-button">
                                    <div class="AddTaskInputBox no">
                                        <input type="submit" value="Cancel" name="submit" @click='CloseFilterPage' />
                                    </div>
                                    <div class="AddTaskInputBox no">
                                        <input style="margin-left: 0px;" type="submit" value="Delete" name="submit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div :id="`myModalInfo_${SelectedMovie}`" class="modal" ref="modalDetails">
                        <!-- Modal content -->
                        <div class="modal-content2">

                            <div class="details-block-container">
                                <div class="detail-block-header">
                                    <span class="close" @click="CloseDetails">&times;</span>

                                    <div class="details-image-container">
                                        <img :src="'src/assets/Details/' + SelectedMovie + '.jpg'"
                                            class="cover details-cover" />
                                    </div>

                                    <div class="details-title-container">
                                        <p class="detail-genre">{{ SelectedGenre.join('. ') }}</p>
                                        <p class="details-main-Title">{{ SelectedMovie }}</p>
                                    </div>
                                </div>
                                <div class="details-container">
                                    <div class="details-container-info">
                                        <div class="details-trailer">
                                            <input type="submit" value="Trailer" name="submit" @click="openTrailerPage" />
                                        </div>
                                    </div>

                                    <div class="details-container-info">
                                        <div class="details-info">
                                            <div class="date-duration-langue">
                                                <p v-if="SelectedAge !== 'Tous Public'" class="detail-age"> -{{ SelectedAge
                                                }}</p>
                                                <p v-if="SelectedAge == 'Tous Public'" class="detail-age-tous"> {{
                                                    SelectedAge }}</p>
                                                <p class="detail-langue">{{ SelectedLangue }}</p>
                                                <p class="detail-duration">{{ SelectedDuration }}</p>
                                                <p class="detail-date">{{ SelectedDate }}</p>

                                            </div>
                                            <div class="details-container-synopsis">
                                                <p class="detail-synopsis">{{ SelectedSynopsis }}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="detail-seance-container">
                                    <!--
                                    <div class = "detail-seance-header">
                                        <div class="detail-title-seance"> Séances </div>
                                    </div>
                                    -->
                                    <div class="detail-seance">
                                        <div class="detail-seance-dates-container">
                                            <div v-for="(seance, index) in getSelectedMovieSeances().dates" :key="index"
                                                class="detail-seance-dates" :class="{ 'selected': SelectedIndex === index }"
                                                @click="selectDate(index)">
                                                <div class="detail-dates">
                                                    <div class="jour-seance">{{ seance.jour }}</div>
                                                    <div class="jour-chiffre-seance">{{ seance.jourChiffre }}</div>
                                                    <div class="mois-seance">{{ seance.mois }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-seance" v-if="SelectedIndex !== null">
                                            <div v-for="(cinema, cinemaIndex) in getSelectedMovieSeances().dates[SelectedIndex].cinemas"
                                                :key="cinemaIndex" class="cinema-details">
                                                <div class="cinema-info">
                                                    <div class="cinema-name">{{ cinema.name }}</div>
                                                    <div class="cinema-ville">{{ cinema.ville }}</div>
                                                </div>
                                                <div class="seances">
                                                    <div v-for="(seance, seanceIndex) in cinema.seances" :key="seanceIndex"
                                                        class="seance">
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

export default defineComponent({
    name: "CatalogPageAdmin",
    components: {
        DarkLightMode,
        ListePage,

    },
    data() {
        return {
            nbMoviesPerPage: this.getNbMoviesPerPage(),
            selectedPage: 0,
            nbTotalMovies: 100,
            searchBar: "",
            movies: [] as Array<{ titre: string; date_sortie: string; image_src: string; langue: string; duration: string; genres: { genre: string }[]; synopsis: string; trailer: string; age: string; }>,
            liked: false,
            read: false,
            genres: [],
            SelectedMovie: "",
            SelectedGenre: [] as string[],
            SelectedSynopsis: "",
            SelectedDuration: "",
            SelectedDate: "",
            SelectedLink: "",
            SelectedLangue: "",
            SelectedAge: "",
            langues_list: ["Anglais", "Français"],
            genre_list: ["Action", "Horreur", "Drama", "Romance"],
            sortie_list: ["Aujourd'hui", "Cette semaine", "Ce mois"],
            selectedGenres: [],
            selectedLanguages: [],
            selectedDuration: [],
            selectedDate: [],
            seances: [],
            SelectedIndex: null,

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

        selectDate(index) {

            this.SelectedIndex = index;
        },
        getSelectedMovieSeances() {

            return this.seances.find(movie => movie.titre === this.SelectedMovie) || [];
        },
        OpenDetails(movie: string, genre: { genre: string }[], synopsis: string, duration: string, date_sortie: string, link: string, langue: string, age: string) {

            this.SelectedMovie = movie;
            this.SelectedGenre = Array.isArray(genre) ? genre.map(g => g.genre) : [genre];
            this.SelectedSynopsis = synopsis.toString();
            this.SelectedDuration = duration.toString();
            this.SelectedDate = date_sortie.substring(0, 4).toString();
            this.SelectedLink = link;
            this.SelectedLangue = langue;
            this.SelectedIndex = 0;
            this.SelectedAge = age;
            const modalDetails = this.$refs.modalDetails as HTMLDivElement;
            console.log(this.SelectedGenre)

            if (modalDetails) {
                modalDetails.style.display = "block";
            }
        },
        CloseDetails() {

            const modalDetails = this.$refs.modalDetails as HTMLDivElement;


            if (modalDetails) {
                modalDetails.style.display = "none";
            }
        },
        showFilterPage() {
            const modalFilter = document.getElementById("myModalFilter");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }

        },
        CloseFilterPage() {
            const modalFilter = document.getElementById("myModalFilter");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }

        },
        ChangePage(value: number) {
            this.selectedPage += this.selectedPage += parseInt(value.toString());;
            if (this.selectedPage < 0) {
                this.selectedPage = 0;
            }
            if (this.selectedPage > this.nbPages - 1) {
                this.selectedPage = parseInt((this.nbPages - 1).toString());
            }
        },
        handleWindowResize() {
            let firstBook = this.selectedPage * this.nbMoviesPerPage;
            this.nbMoviesPerPage = this.getNbMoviesPerPage();
            this.selectedPage = Math.floor(firstBook / this.nbMoviesPerPage);
            console.log(window.innerWidth);
        },
        getNbMoviesPerPage() {

            if (window.innerWidth < 1000) {
                return 4;
            } else if (window.innerWidth <= 1100) {
                return 8;
            } else {
                return 16;
            }

        },
        openTrailerPage() {

            this.$router.push({ name: 'TrailerPage', params: { link: this.SelectedLink } });
        },
        async getFilteredMoviesWithoutAPI() {
            var titles = ["Dune", "Interstellar", "Joker", "Scary Movie", "The Maze Runner", "Top Gun", "Uncharted"];
            var trailer_links = ["https://www.youtube.com/embed/n9xhJrPXop4?si=EvseDpFRD2xsmXx1", "https://www.youtube.com/embed/zSWdZVtXT7E?si=nPy0qleUOPzr3H-M", "https://www.youtube.com/embed/t433PEQGErc?si=kh21gk8EDFDchS8C", "https://www.youtube.com/embed/HTLPULt0eJ4?si=y8Q7q2esabbKEYrx", "https://www.youtube.com/embed/AwwbhhjQ9Xk?si=jqKPgPaTllkAZuiR", "https://www.youtube.com/embed/giXco2jaZ_4?si=O7e-0Pmpe5ZBAjXL", "https://www.youtube.com/embed/eHp3MbsCbMg?si=zU9WOo3LeiaDKQBm"]
            var searchBar = this.searchBar;
            var filteredMovies: Array<{
                titre: string;
                age: string;
                date_sortie: string;
                image_src: string;
                langue: string;
                duration: string;
                genres: { genre: string }[];
                synopsis: string;
                trailer: string;
            }> = [];

            titles.map(function (title, index) {
                type Genre = { genre: string };
                var movieData: {
                    titre: string;
                    age: string;
                    date_sortie: string;
                    image_src: string;
                    langue: string;
                    duration: string;
                    genres: Genre[];
                    synopsis: string;
                    trailer: string;
                } = {
                    titre: title,
                    age: '',
                    date_sortie: '',
                    image_src: title.replace(/\s/g, '') + '.jpeg',
                    langue: 'Langue Inconnue',
                    duration: 'Durée Inconnue',
                    genres: [],
                    synopsis: '',
                    trailer: trailer_links[index],
                };

                switch (title) {
                    case "Dune":
                        movieData.age = "12";
                        movieData.date_sortie = '2021-09-03';
                        movieData.genres = [{ genre: 'Science Fiction' }, { genre: 'Adventure' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h46";
                        movieData.synopsis = "In the distant future, Paul Atreides becomes embroiled in political intrigue and must navigate the dangerous desert planet Arrakis to secure the future of his people.";

                        break;
                    case "Interstellar":
                        movieData.age = "Tous Public";
                        movieData.date_sortie = '2014-11-07';
                        movieData.genres = [{ genre: 'Science Fiction' }, { genre: 'Drama' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h20";
                        movieData.synopsis = "A team of astronauts embarks on a perilous journey through a wormhole in search of a new habitable planet for humanity as Earth faces an environmental catastrophe.";
                        break;
                    case "Joker":
                        movieData.age = "16";
                        movieData.date_sortie = '2019-10-04';
                        movieData.genres = [{ genre: 'Crime' }, { genre: 'Drama' }, { genre: 'Thriller' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "1h35";
                        movieData.synopsis = "In Gotham City, failed comedian Arthur Fleck descends into madness, transforming into the iconic and anarchic criminal known as the Joker.";
                        break;
                    case "Scary Movie":
                        movieData.age = "16";
                        movieData.date_sortie = '2000-07-07';
                        movieData.genres = [{ genre: 'Comedy' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h05";
                        movieData.synopsis = "A comedic parody that satirizes popular horror and thriller movies, bringing humor to classic scary movie tropes.";
                        break;
                    case "The Maze Runner":
                        movieData.age = "12";
                        movieData.date_sortie = '2014-09-19';
                        movieData.genres = [{ genre: 'Action' }, { genre: 'Mystery' }, { genre: 'Sci-Fi' }, { genre: 'Thriller' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h00";
                        movieData.synopsis = "A group of young individuals finds themselves trapped in a mysterious maze, with no memory of how they got there, and must navigate its challenges to escape.";
                        break;
                    case "Top Gun":
                        movieData.age = "12";
                        movieData.date_sortie = '1986-05-16';
                        movieData.genres = [{ genre: 'Action' }, { genre: 'Drama' }] as Genre[];
                        movieData.langue = "Anglais Français";
                        movieData.duration = "2h55";
                        movieData.synopsis = "Maverick, a talented fighter pilot, competes at the Top Gun Naval Fighter Weapons School, facing intense competition and forming bonds that will shape his future.";
                        break;
                    case "Uncharted":
                        movieData.age = "14";
                        movieData.date_sortie = '2022-02-11';
                        movieData.genres = [{ genre: 'Action' }, { genre: 'Adventure' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h48";
                        movieData.synopsis = "Nathan Drake, a treasure hunter, embarks on a perilous journey to uncover historical mysteries and face ruthless enemies in this action-adventure film.";
                        break;
                    default:
                        break;
                }
                filteredMovies.push(movieData);
            });

            if (searchBar !== "") {
                this.movies = filteredMovies.filter(function (movie) {
                    return movie.titre.toLowerCase().includes(searchBar.toLowerCase());
                });
            } else {
                this.movies = filteredMovies;
            }
            console.log(this.movies)

            localStorage.setItem('movies', JSON.stringify(this.movies));
        },
        async getSeances() {
            this.seances = [
                { titre: 'Dune', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00', version: 'VO' }, { heure: '18:00', version: 'VF' }] }, { name: 'Pathé Opéra', ville: 'Paris 02', seances: [{ heure: '17:30', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VOSTFR' }, { heure: '19:00', version: 'VOSTFR' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:00', version: 'VO' }, { heure: '19:30', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Halles', ville: 'Paris 01', seances: [{ heure: '14:30', version: 'VO' }, { heure: '17:45', version: 'VO' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
                { titre: 'Interstellar', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00' }, { heure: '18:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] },
                { titre: 'Joker', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '19:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30' }, { heure: '15:00' }, { heure: '20:00' }] }, { name: 'Le Grand Rex', ville: 'Paris 02', seances: [{ heure: '15:00' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Bercy', ville: 'Paris 14', seances: [{ heure: '13:00' }, { heure: '20:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }] },
                { titre: 'Scary Movie', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Montparnasse', ville: 'Paris 06', seances: [{ heure: '18:00' }, { heure: '20:00' }] }, { name: 'Le Luxor', ville: 'Paris 10', seances: [{ heure: '15:30' }, { heure: '18:00' }, { heure: '21:00' }] }, { name: 'Mk2 Nation', ville: 'Paris 12', seances: [{ heure: '16:30' }, { heure: '20:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bibliothèque', ville: 'Paris 13', seances: [{ heure: '17:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] },
                { titre: 'The Maze Runner', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '17:00' }, { heure: '19:00' }] }, { name: 'MK2 Gambetta', ville: 'Paris 20', seances: [{ heure: '14:30' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '16:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Issy-Les-Moulineaux', ville: 'Issy-Les-Moulineaux', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Pathé Boulogne', ville: 'Boulogne', seances: [{ heure: '15:15' }, { heure: '18:30' }] }] }, { jour: 'Mer', jourChiffre: 29, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VO' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '15:15' }, { heure: '17:30' }] }] }] },
                { titre: 'Top Gun', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Pathé Ivry', ville: 'Ivry-Sur-Seine', seances: [{ heure: '16:30' }, { heure: '18:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '18:30' }, { heure: '20:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'Helios', ville: 'Colombes', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] },
                { titre: 'Uncharted', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Royal Palace', ville: 'Nogent-Sur-Marne', seances: [{ heure: '16:00' }, { heure: '18:00' }] }, { name: 'Pathé Thiais', ville: 'Thiais', seances: [{ heure: '15:30' }, { heure: '19:45' }, { heure: '22:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45' }, { heure: '19:00' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45' }, { heure: '20:00' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '16:15' }, { heure: '18:30' }] }] }] }
            ]


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

            await this.getFilteredMoviesWithoutAPI();
            await this.getSeances();

        },
    },

    async mounted() {
        await this.onMounted();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }
});
</script>
