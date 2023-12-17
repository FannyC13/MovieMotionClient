<template>
    <body>
        <header>
            <div v-show="false" class="light">
                <DarkLightMode></DarkLightMode>
            </div>
        </header>


        <div class="admin-page">
            <div class="sidebar">
                <div class="back-catalog">
                    <router-link to="/catalog-page">
                        <div class="header-image-trailer">
                            <font-awesome-icon icon="fa-solid fa-house" class="arrow-return-admin" />
                        </div>
                    </router-link>
                </div>
                <div class="side-content">
                    <div class="side-menu">
                        <input type="radio" name="grade" id="Films" :checked="SelectedTab === 'Films'"
                            @change="updateTab('Films')">
                        <label for="Films">Films</label>

                        <input type="radio" name="grade" id="Seances" :checked="SelectedTab === 'Seances'"
                            @change="updateTab('Seances')">
                        <label for="Seances">Seances</label>

                        <input type="radio" name="grade" id="Cinemas" :checked="SelectedTab === 'Cinemas'"
                            @change="updateTab('Cinemas')">
                        <label for="Cinemas">Cinemas</label>
                    </div>
                </div>
            </div>

            <div class="main-content">

                <div class="page-header">
                    <h1>Films</h1>
                    <small>Home / Films</small>
                </div>

                <div class="page-content" v-if="SelectedTab === 'Films'">
                    <div class="analytics">
                        <div class="card">
                            <div class="card-head">
                                <h2>12</h2>
                                <span class="las la-user-friends"></span>
                            </div>
                            <div class="card-progress">
                                <small>Number Movies</small>
                            </div>
                        </div>
                    </div>

                    <div class="records table-responsive">
                        <div class="record-header">
                            <div class="AddMovie">
                                <input style="margin-left: 0px;" type="submit" value="Add Movie" name="submit"
                                    @click="showAddMovie()" />
                            </div>
                        </div>

                        <div>
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th><span class="las la-sort"></span> Titre</th>
                                        <th><span class="las la-sort"></span> Date</th>
                                        <th><span class="las la-sort"></span> Duration</th>
                                        <th><span class="las la-sort"></span> Langue</th>
                                        <th><span class="las la-sort"></span> Age</th>
                                        <th><span class="las la-sort"></span> Synopsis</th>
                                        <th><span class="las la-sort"></span> Genre</th>
                                        <th><span class="las la-sort"></span> Realisateur</th>
                                        <th><span class="las la-sort"></span> Acteurs</th>
                                        <th><span class="las la-sort"></span> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Use v-for to loop through movies -->
                                    <tr v-for="movie in movies" :key="movie.titre">
                                        <td>
                                            <div class="admin-movies-titre">
                                                <div class="admin-movies-titre-info">
                                                    <p>{{ movie.titre }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ movie.date_sortie }}</td>
                                        <td>{{ movie.duration }}</td>
                                        <td>{{ movie.langue }}</td>
                                        <td>{{ movie.age }}</td>
                                        <td>{{ movie.synopsis }}</td>
                                        <td>{{ movie.genres.map(item => item.genre).join(', ') }}</td>
                                        <td>{{ movie.acteurs.map(item => item.nom_acteur).join(', ') }}</td>
                                        <td>{{ movie.realisateur }}</td>
                                        <td>
                                            <div class="actions">
                                                <font-awesome-icon class="admin-icon" icon="fa-solid fa-pen"
                                                    @click="OpenUpdateMovieModal(movie.titre, movie.date_sortie, movie.duration, movie.langue, movie.age, movie.synopsis, movie.genres.map(item => item.genre).join(', '), movie.realisateur, movie.acteurs.map(item => item.nom_acteur).join(', '), movie.image_src)" />
                                                <font-awesome-icon class="admin-icon" icon="fa-solid fa-trash"
                                                    @click=OpenDeleteModal(movie.titre) />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="page-content" v-if="SelectedTab === 'Seances'">
                    <div class="analytics">
                        <div class="card">
                            <div class="card-head">
                                <h2>12</h2>
                                <span class="las la-user-friends"></span>
                            </div>
                            <div class="card-progress">
                                <small>Number Seances</small>
                            </div>
                        </div>
                    </div>

                    <div class="records table-responsive">
                        <div class="record-header">
                            <div class="AddMovie">
                                <input style="margin-left: 0px;" type="submit" value="Add Seance" name="submit"
                                    @click="showAddSeance()" />
                            </div>
                        </div>

                        <div>
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th><span class="las la-sort"></span> Titre</th>
                                        <th><span class="las la-sort"></span> Cinema</th>
                                        <th><span class="las la-sort"></span> Date</th>
                                        <th><span class="las la-sort"></span> Heure</th>
                                        <th><span class="las la-sort"></span> Version</th>
                                        <th><span class="las la-sort"></span> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="film in seances" :key="film.titre">
                                        <template v-for="date in film.dates" :key="date.jourChiffre">
                                            <template v-for="cinema in date.cinemas" :key="cinema.name">
                                                <template v-for="seance in cinema.seances"
                                                    :key="`${seance.heure}_${seance.version}`">
                                                    <tr>
                                                        <td>{{ film.titre }}</td>
                                                        <td>{{ cinema.name }}</td>
                                                        <td>{{ date.jourChiffre }} {{ date.mois }}</td>
                                                        <td>{{ seance.heure }}</td>
                                                        <td>{{ seance.version }}</td>
                                                        <td>
                                                            <div class="actions">
                                                                <font-awesome-icon class="admin-icon" icon="fa-solid fa-pen"
                                                                    @click="OpenUpdateSeanceModal(date.jourChiffre, date.mois, seance.heure, seance.version)" />
                                                                <font-awesome-icon class="admin-icon"
                                                                    icon="fa-solid fa-trash"
                                                                    @click=OpenDeleteSeanceModal(seance.heure) />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </template>
                                        </template>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="page-content" v-if="SelectedTab === 'Cinemas'">
                    <div class="analytics">
                        <div class="card">
                            <div class="card-head">
                                <h2>12</h2>
                                <span class="las la-user-friends"></span>
                            </div>
                            <div class="card-progress">
                                <small>Number Cinemas</small>
                            </div>
                        </div>
                    </div>

                    <div class="records table-responsive">
                        <div class="record-header">
                            <div class="AddMovie">
                                <input style="margin-left: 0px;" type="submit" value="Add Cinema" name="submit"
                                    @click="showAddCinema()" />
                            </div>
                        </div>

                        <div>
                            <table width="30%">
                                <thead>
                                    <tr>
                                        <th><span class="las la-sort"></span> Cinema</th>
                                        <th><span class="las la-sort"></span> Ville</th>
                                        <th><span class="las la-sort"></span> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Use v-for to loop through movies -->
                                    <tr v-for="cinema in cinemas" :key="cinema.cinema">
                                        <td>
                                            <div class="admin-movies-titre">
                                                <div class="admin-movies-titre-info">
                                                    <p>{{ cinema.cinema }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ cinema.ville }}</td>
                                        <td>
                                            <div class="actions">
                                                <font-awesome-icon class="admin-icon" icon="fa-solid fa-pen"
                                                    @click="OpenUpdateCinemaModal(cinema.cinema, cinema.ville)" />
                                                <font-awesome-icon class="admin-icon" icon="fa-solid fa-trash"
                                                    @click=OpenDeleteCinemaModal(cinema.cinema) />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="myModalDeleteMovie" class="modal-admin">
                    <!-- Modal content -->
                    <div class="modal-content-admin">
                        <span class="close" @click=CloseDeleteModal()>&times;</span>
                        <h1 class="modal-Title-admin">Delete Movie</h1>
                        <div class="modal-center">
                            <p style="margin-top: 50px;">Are you sure you want to delete this Movie ?</p>
                            <div class="delete-list-button">
                                <div class="AddTaskInputBox no">
                                    <input type="submit" value="Cancel" name="submit" @click.prevent=CloseDeleteModal() />
                                </div>
                                <div class="AddTaskInputBox no">
                                    <input style="margin-left: 0px;" type="submit" value="Delete" name="submit"
                                        @click='DeleteMovie()' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="MyModalAddMovie" class="modal-admin">
                    <div class="modal-content-admin-2">

                        <div class="details-block-container">
                            <span class="close" @click=CloseAddModal()>&times;</span>
                            <div class="loginForm">
                                <div class="modal-Title-admin">Add a Movie</div>
                                <p class="Form-presentation" style="text-align: center">
                                    <br />
                                    Please fill in
                                    <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                                    information <br /><br />
                                    The mandatory fields are marked by a * <br /><br />
                                </p>
                                <form action="#" method="post" @submit.prevent="handleSendAddMovie">
                                    <div class="Form-question">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="movieAlreadyExists">
                                            Movie already stored in the database.
                                        </p>


                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Titre*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="titre" type="text" name="txtEmail" placeholder="Titre" />
                                    </div>

                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Réalisateur*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="realisateur" type="text" name="txtEmail"
                                            placeholder="Réalisateur" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Acteurs*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="acteurs" type="text" name="txtEmail"
                                            placeholder="Acteurs (séparé par une virgule)" />
                                    </div>

                                    <div class="Form-question">
                                        <label for="file-upload">
                                            <p class="Form-question">
                                                <i class="fa fa-bold" aria-hidden="true">Cover*</i>
                                            </p>
                                        </label>
                                        <div class="AddBookInput">
                                            <button class="Create-planning-Btn"
                                                style="margin-right: 15px; margin-bottom: 8px" @click="triggerClick">
                                                Click here
                                            </button>
                                            <input type="file" id="coverfile-upload" ref="coverfileupload"
                                                name="file-upload" class="AddMovieInputBox"
                                                placeholder="Upload a screenshot of the issue." @change="handleFileChange"
                                                style="display: none" />
                                            {{ labelTextCover }}
                                        </div>
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Durée*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="duration" type="text" name="txtEmail" placeholder="Durée" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Date de sortie*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="date_sortie" type="text" name="txtEmail"
                                            placeholder="Date de sortie" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Genre(s)*</i>
                                    </p>
                                    <div class="AddMovieInputBox"
                                        style="display: flex;align-items: center;justify-content: space-around;">

                                        <div v-for="genre in genre_list" :key="genre">
                                            <input type="checkbox" :id="genre" :value="genre" v-model="checkedGenres"
                                                class="genre-checkbox" />
                                            <label :for="genre">{{ genre }}</label>
                                        </div>


                                    </div>


                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Langue*</i>
                                    </p>
                                    <div class="AddMovieInputBox">

                                        <select v-model="langue">
                                            <option value="">Choisir une langue</option>
                                            <option value="Anglais">Anglais</option>
                                            <option value="Français">Français</option>
                                            <option value="Espagnol">Espagnol</option>
                                            <option value="Allemand">Allemand</option>
                                            <option value="Autres">Autres</option>
                                        </select>

                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Book's summary*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="resumeExceedsLimit">
                                            Summary should not exceed 1000 characters.
                                        </p>
                                        <textarea name="" id="" cols="30" rows="10" class="add-movie-input"
                                            placeholder="Enter a short synopsis." v-model="synopsis"
                                            @input="handleResumeInput"></textarea><br />
                                    </div>
                                    <br /><br />
                                    <div class="AddMovieInputBox FormInputBox">
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="movieAlreadyExists">
                                            Film est déjà dans la base de données.
                                        </p>
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold" v-if="notComplete">
                                            Veuillez remplir tous les champs avec un * !
                                        </p>
                                        <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold"
                                            v-if="sent">
                                            Film ajouté !
                                        </p>

                                    </div>
                                    <div class="modal-center">

                                        <div class="delete-list-button">
                                            <div class="AddTaskInputBox no">
                                                <input type="submit" value="Cancel" name="submit"
                                                    @click.prevent=CloseAddModal() />
                                            </div>
                                            <div class="AddTaskInputBox no">
                                                <input style="margin-left: 0px;" type="submit" value="Add" name="submit" />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="MyModalUpdateMovie" class="modal-admin">
                    <div class="modal-content-admin-2">

                        <div class="details-block-container">
                            <span class="close" @click=CloseUpdateAddModal()>&times;</span>
                            <div class="loginForm">
                                <div class="modal-Title-admin">Update a Movie</div>
                                <p class="Form-presentation" style="text-align: center">
                                    <br />
                                    Please fill in
                                    <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                                    information <br /><br />
                                    The mandatory fields are marked by a * <br /><br />
                                </p>
                                <form action="#" method="post" @submit.prevent="handleSendUpdateMovie">
                                    <div class="Form-question">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="movieAlreadyExists">
                                            Movie already stored in the database.
                                        </p>

                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Titre*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedMovie" type="text" name="txtEmail" placeholder="Titre" />
                                    </div>

                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Réalisateur*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedRealisateur" type="text" name="txtEmail"
                                            placeholder="Réalisateur" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Acteurs*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedActeur" type="text" name="txtEmail"
                                            placeholder="Acteurs (séparé par une virgule)" />
                                    </div>

                                    <div class="Form-question">
                                        <label for="file-upload">
                                            <p class="Form-question">
                                                <i class="fa fa-bold" aria-hidden="true">Cover*</i>
                                            </p>
                                        </label>
                                        <div class="AddBookInput">
                                            <button class="Create-planning-Btn"
                                                style="margin-right: 15px; margin-bottom: 8px" @click="triggerClick">
                                                Click here
                                            </button>
                                            <input type="file" id="coverfile-upload" ref="coverfileupload"
                                                name="file-upload" class="AddMovieInputBox"
                                                placeholder="Upload a screenshot of the issue." @change="handleFileChange"
                                                style="display: none" />
                                            {{ SelectedImage }}
                                        </div>
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Durée*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedDuration" type="text" name="txtEmail" placeholder="Durée" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Date de sortie*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedDate" type="text" name="txtEmail"
                                            placeholder="Date de sortie" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Genre(s)*</i>
                                    </p>
                                    <div class="AddMovieInputBox"
                                        style="display: flex;align-items: center;justify-content: space-around;">

                                        <div v-for="genre in genre_list" :key="genre">
                                            <input type="checkbox" :id="genre" :value="genre" v-model="SelectedGenres"
                                                class="genre-checkbox" />
                                            <label :for="genre">{{ genre }}</label>
                                        </div>

                                    </div>


                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Langue*</i>
                                    </p>
                                    <div class="AddMovieInputBox">

                                        <select v-model="SelectedLangue">
                                            <option value="">Choisir une langue</option>
                                            <option value="Anglais">Anglais</option>
                                            <option value="Français">Français</option>
                                            <option value="Espagnol">Espagnol</option>
                                            <option value="Allemand">Allemand</option>
                                            <option value="Autres">Autres</option>
                                        </select>

                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Book's summary*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="resumeExceedsLimit">
                                            Summary should not exceed 1000 characters.
                                        </p>
                                        <textarea name="" id="" cols="30" rows="10" class="add-movie-input"
                                            placeholder="Enter a short synopsis." v-model="SelectedSynopsis"
                                            @input="handleResumeInput"></textarea><br />
                                    </div>
                                    <br /><br />
                                    <div class="AddMovieInputBox FormInputBox">
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="movieAlreadyExists">
                                            Film est déjà dans la base de données.
                                        </p>
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold" v-if="notComplete">
                                            Veuillez remplir tous les champs avec un * !
                                        </p>
                                        <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold"
                                            v-if="sent">
                                            Film ajouté !
                                        </p>

                                    </div>
                                    <div class="modal-center">

                                        <div class="delete-list-button">
                                            <div class="AddTaskInputBox no">
                                                <input type="submit" value="Cancel" name="submit"
                                                    @click.prevent=CloseUpdateAddModal() />
                                            </div>
                                            <div class="AddTaskInputBox no">
                                                <input style="margin-left: 0px;" type="submit" value="Add" name="submit" />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="myModalDeleteSeance" class="modal-admin">
                    <!-- Modal content -->
                    <div class="modal-content-admin">
                        <span class="close" @click=CloseDeleteSeanceModal()>&times;</span>
                        <h1 class="modal-Title-admin">Delete Seance</h1>
                        <div class="modal-center">
                            <p style="margin-top: 50px;">Are you sure you want to delete this Seance ?</p>
                            <div class="delete-list-button">
                                <div class="AddTaskInputBox no">
                                    <input type="submit" value="Cancel" name="submit"
                                        @click.prevent=CloseDeleteSeanceModal() />
                                </div>
                                <div class="AddTaskInputBox no">
                                    <input style="margin-left: 0px;" type="submit" value="Delete" name="submit"
                                        @click='DeleteSeance()' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="MyModalAddSeance" class="modal-admin">
                    <div class="modal-content-admin-2">

                        <div class="details-block-container">
                            <span class="close" @click=CloseAddSeanceModal()>&times;</span>
                            <div class="loginForm">
                                <div class="modal-Title-admin">Add a Seance</div>
                                <p class="Form-presentation" style="text-align: center">
                                    <br />
                                    Please fill in
                                    <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                                    information <br /><br />
                                    The mandatory fields are marked by a * <br /><br />
                                </p>
                                <form action="#" method="post" @submit.prevent="handleSendAddSeance">
                                    <div class="Form-question">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="seanceAlreadyExists">
                                            Seance already stored in the database.
                                        </p>
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">ID Film*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="ID_Film" type="text" name="txtEmail" placeholder="ID Film" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">ID Cinema*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="ID_Cinema" type="text" name="txtEmail" placeholder="ID Cinema" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Date Seance*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="seance_date" type="text" name="txtEmail"
                                            placeholder="Date Seance" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Seance Heure*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="seance_heure" type="text" name="txtEmail" placeholder="Heure" />
                                    </div>

                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Version*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="seance_version" type="text" name="txtEmail" placeholder="Version" />
                                    </div>
                                    <div class="AddMovieInputBox FormInputBox">
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="cinemaAlreadyExists">
                                            Seance est déjà dans la base de données.
                                        </p>
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="notSeanceComplete">
                                            Veuillez remplir tous les champs avec un * !
                                        </p>
                                        <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold"
                                            v-if="sent">
                                            Seance ajouté !
                                        </p>

                                    </div>

                                    <div class="modal-center">

                                        <div class="delete-list-button">
                                            <div class="AddTaskInputBox no">
                                                <input type="submit" value="Cancel" name="submit"
                                                    @click.prevent=CloseAddSeanceModal() />
                                            </div>
                                            <div class="AddTaskInputBox no">
                                                <input style="margin-left: 0px;" type="submit" value="Add" name="submit" />
                                            </div>
                                        </div>
                                    </div>


                                </form>
                            </div>


                        </div>
                    </div>
                </div>

                <div id="MyModalUpdateSeance" class="modal-admin">
                    <div class="modal-content-admin-2">

                        <div class="details-block-container">
                            <span class="close" @click=CloseUpdateSeanceModal()>&times;</span>
                            <div class="loginForm">
                                <div class="modal-Title-admin">Add a Seance</div>
                                <p class="Form-presentation" style="text-align: center">
                                    <br />
                                    Please fill in
                                    <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                                    information <br /><br />
                                    The mandatory fields are marked by a * <br /><br />
                                </p>
                                <form action="#" method="post" @submit.prevent="handleSendUpdateSeance">
                                    <div class="Form-question">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="seanceAlreadyExists">
                                            Seance already stored in the database.
                                        </p>
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">ID Film*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="ID_Film" type="text" name="txtEmail" placeholder="ID Film" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">ID Cinema*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="ID_Cinema" type="text" name="txtEmail" placeholder="ID Cinema" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Date Seance*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedSeanceDate" type="text" name="txtEmail"
                                            placeholder="Date Seance" />
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Seance Heure*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedSeanceHeure" type="text" name="txtEmail"
                                            placeholder="Heure" />
                                    </div>

                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Version*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedSeanceVersion" type="text" name="txtEmail"
                                            placeholder="Version" />
                                    </div>
                                    <div class="AddMovieInputBox FormInputBox">
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="cinemaAlreadyExists">
                                            Seance est déjà dans la base de données.
                                        </p>
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="notSeanceComplete">
                                            Veuillez remplir tous les champs avec un * !
                                        </p>
                                        <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold"
                                            v-if="sent">
                                            Seance ajouté !
                                        </p>

                                    </div>

                                    <div class="modal-center">

                                        <div class="delete-list-button">
                                            <div class="AddTaskInputBox no">
                                                <input type="submit" value="Cancel" name="submit"
                                                    @click.prevent=CloseUpdateSeanceModal() />
                                            </div>
                                            <div class="AddTaskInputBox no">
                                                <input style="margin-left: 0px;" type="submit" value="Add" name="submit" />
                                            </div>
                                        </div>
                                    </div>


                                </form>
                            </div>


                        </div>
                    </div>
                </div>

                <div id="myModalDeleteCinema" class="modal-admin">
                    <!-- Modal content -->
                    <div class="modal-content-admin">
                        <span class="close" @click=CloseDeleteCinemaModal()>&times;</span>
                        <h1 class="modal-Title-admin">Delete Cinema</h1>
                        <div class="modal-center">
                            <p style="margin-top: 50px;">Are you sure you want to delete this Cinema ?</p>
                            <div class="delete-list-button">
                                <div class="AddTaskInputBox no">
                                    <input type="submit" value="Cancel" name="submit"
                                        @click.prevent=CloseDeleteCinemaModal() />
                                </div>
                                <div class="AddTaskInputBox no">
                                    <input style="margin-left: 0px;" type="submit" value="Delete" name="submit"
                                        @click='DeleteCinema()' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="MyModalAddCinema" class="modal-admin">
                    <div class="modal-content-admin-2">

                        <div class="details-block-container">
                            <span class="close" @click=CloseAddCinemaModal()>&times;</span>
                            <div class="loginForm">
                                <div class="modal-Title-admin">Add a Cinema</div>
                                <p class="Form-presentation" style="text-align: center">
                                    <br />
                                    Please fill in
                                    <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                                    information <br /><br />
                                    The mandatory fields are marked by a * <br /><br />
                                </p>
                                <form action="#" method="post" @submit.prevent="handleSendAddCinema">
                                    <div class="Form-question">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="cinemaAlreadyExists">
                                            Cinema already stored in the database.
                                        </p>
                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Cinema*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="cinema" type="text" name="txtEmail" placeholder="Cinema" />
                                    </div>

                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Ville*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="ville" type="text" name="txtEmail" placeholder="Ville" />
                                    </div>
                                    <div class="AddMovieInputBox FormInputBox">
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="cinemaAlreadyExists">
                                            Cinema est déjà dans la base de données.
                                        </p>
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="notCinemaComplete">
                                            Veuillez remplir tous les champs avec un * !
                                        </p>
                                        <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold"
                                            v-if="sent">
                                            Cinema ajouté !
                                        </p>

                                    </div>

                                    <div class="modal-center">

                                        <div class="delete-list-button">
                                            <div class="AddTaskInputBox no">
                                                <input type="submit" value="Cancel" name="submit"
                                                    @click.prevent=CloseAddCinemaModal() />
                                            </div>
                                            <div class="AddTaskInputBox no">
                                                <input style="margin-left: 0px;" type="submit" value="Add" name="submit" />
                                            </div>
                                        </div>
                                    </div>


                                </form>
                            </div>


                        </div>
                    </div>
                </div>

                <div id="MyModalUpdateCinema" class="modal-admin">
                    <div class="modal-content-admin-2">

                        <div class="details-block-container">
                            <span class="close" @click="CloseUpdateCinemaModal()">&times;</span>
                            <div class="loginForm">
                                <div class="modal-Title-admin">Update a Cinema</div>
                                <p class="Form-presentation" style="text-align: center">
                                    <br />
                                    Please fill in
                                    <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                                    information <br /><br />
                                    The mandatory fields are marked by a * <br /><br />
                                </p>
                                <form action="#" method="post" @submit.prevent="handleSendUpdateCinema">
                                    <div class="Form-question">
                                        <p class="CharacterLimitMessage" style="color: red" v-if="cinemaAlreadyExists">
                                            Cinema already stored in the database.
                                        </p>

                                    </div>
                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Cinema*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedCinema" type="text" name="txtEmail" placeholder="Cinema" />
                                    </div>

                                    <p class="Form-question">
                                        <i class="fa fa-bold" aria-hidden="true">Ville*</i>
                                    </p>
                                    <div class="AddMovieInputBox">
                                        <input v-model="SelectedVille" type="text" name="txtEmail" placeholder="Ville" />
                                    </div>
                                    <div class="AddMovieInputBox FormInputBox">
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="cinemaAlreadyExists">
                                            Cinema est déjà dans la base de données.
                                        </p>
                                        <p class="CharacterLimitMessage"
                                            style="color: red; text-align: center; font-weight: bold"
                                            v-if="notCinemaComplete">
                                            Veuillez remplir tous les champs avec un * !
                                        </p>
                                        <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold"
                                            v-if="sent">
                                            Cinema ajouté !
                                        </p>

                                    </div>

                                    <div class="modal-center">

                                        <div class="delete-list-button">
                                            <div class="AddTaskInputBox no">
                                                <input type="submit" value="Cancel" name="submit"
                                                    @click="CloseUpdateCinemaModal()" />
                                            </div>
                                            <div class="AddTaskInputBox no">
                                                <input style="margin-left: 0px;" type="submit" value="Add" name="submit" />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>


                        </div>
                    </div>
                </div>

            </div>



        </div>
    </body>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import DarkLightMode from "../components/DarkLightMode.vue";
import ListePage from "../components/CatalogPage/ListePage.vue";

import axios from "axios";

export default defineComponent({
    name: "TrailerPage",
    components: {
        DarkLightMode,
        ListePage,
    },
    data() {
        return {
            movies: [] as Array<{ titre: string; realisateur: string, acteurs: { nom_acteur: string }[], date_sortie: string; image_src: string; langue: string; duration: string; genres: { genre: string }[]; synopsis: string; trailer: string; age: string; }>,
            SelectedMovie: '',
            genre_list: ["Action", 'Adventure', "Drama", "Romance", 'Science Fiction', "Crime"],
            acteurs: '',
            SelectedActeur: '',
            checkedGenres: [],
            SelectedGenres: [],
            SelectedDate: "",
            SelectedDuration: "",
            SelectedLangue: "",
            SelectedAge: "",
            SelectedSynopsis: "",
            SelectedTab: "Films",
            SelectedCinema: '',
            SelectedVille: '',
            SelectedSeance: '',
            SelectedSeanceHeure: '',
            SelectedSeanceVersion: '',
            SelectedRealisateur: '',
            SelectedSeanceDate: '',
            SelectedImage: '',
            ID_Cinema: 0,
            ID_Film: 0,
            seance_heure: "",
            seance_version: "",
            seance_date: "",
            Seances: false,
            Cinema: false,
            Films: true,
            titre: "",
            langue: "",
            date_sortie: "",
            cinema: "",
            ville: "",
            synopsis: "",
            realisateur: "",
            duration: "",
            sent: false,
            error: false,
            selectedFileCover: null,
            labelTextCover: "No file selected",
            resumeExceedsLimit: false,
            movieAlreadyExists: false,
            cinemaAlreadyExists: false,
            notCinemaComplete: false,
            notSeanceComplete: false,
            seanceAlreadyExists: false,
            notComplete: false,
            cinemas: [],
            seances: [],
        };
    },


    created() {

    },

    methods: {
        triggerClick() {
            const inputElement = this.$refs.coverfileupload as HTMLInputElement;
            inputElement.click();
        },
        updateTab(tab) {
            this.SelectedTab = tab;

        },

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFileCover = file;
                this.labelTextCover = file.name;
            } else {
                this.selectedFileCover = null;
                this.labelTextCover = "No file selected";
            }
        },
        handleResumeInput() {
            const maxCharacters = 1000;

            if (this.synopsis.length > maxCharacters) {
                this.synopsis = this.synopsis.substring(0, maxCharacters);
                this.resumeExceedsLimit = true; // Add a new data property to indicate if the limit is exceeded
            } else {
                this.resumeExceedsLimit = false; // Reset the flag if the limit is not exceeded
            }
        },
        handleSendAddMovie() {


            if (
                this.titre == "" ||
                this.realisateur == "" ||
                this.duration == "" ||
                this.synopsis == "" ||
                this.date_sortie == "" ||
                this.langue == ""
            ) {
                this.sent = false;
                this.error = true;
                this.notComplete = true;
            } else {

                this.notComplete = false;
                this.error = false;
            }
            console.log(this.checkedGenres)


        },
        handleSendUpdateMovie() {
            if (this.SelectedActeur == "" || this.SelectedRealisateur || this.SelectedMovie == "" || this.SelectedDuration == "" || this.SelectedLangue == "" || this.SelectedDate == "" || this.SelectedSynopsis == "" || this.SelectedGenres == "") {
                this.notComplete = true;
            }
        },
        handleSendUpdateCinema() {
            console.log(this.SelectedCinema)
            console.log(this.SelectedAddCinema)
            if (this.SelectedCinema == "" || this.SelectedVille == "") {
                this.notCinemaComplete = true;
            }
        },
        handleSendAddCinema() {
            console.log(this.cinema);
            if (this.cinema == "" || this.ville == "") {
                this.notCinemaComplete = true;
            }

        },
        handleSendAddSeance() {
            console.log(this.seance_heure);
            if (this.seance_heure == "" || this.seance_version == "") {
                this.notSeanceComplete = true;
            }
            this.seance_heure = '';
            this.seance_version = '';
            this.seance_date = '';

        },
        handleSendUpdateSeance() {
            console.log(this.SelectedSeanceDate);
            if (this.SelectedSeanceDate == "" || this.SelectedSeanceVersion == "" || this.SelectedSeanceHeure == "") {
                this.notSeanceComplete = true;
            }

        },
        OpenDeleteModal(titre) {
            const modalFilter = document.getElementById("myModalDeleteMovie");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }
            this.SelectedMovie = titre
        },
        OpenUpdateMovieModal(titre, date, duration, langue, age, synopsis, genre, realisateur, acteurs, image_src) {
            const modalFilter = document.getElementById("MyModalUpdateMovie");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }
            this.SelectedMovie = titre
            this.SelectedDate = date
            this.SelectedLangue = langue
            this.SelectedDuration = duration
            this.SelectedAge = age
            this.SelectedSynopsis = synopsis
            this.SelectedGenres = genre.split(',').map(genre => genre.trim());
            this.SelectedActeur = acteurs
            this.SelectedImage = image_src
            this.SelectedRealisateur = realisateur
            console.log(this.SelectedSynopsis);
        },

        OpenDeleteCinemaModal(cinema) {
            const modalFilter = document.getElementById("myModalDeleteCinema");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }
            this.SelectedCinema = cinema
        },

        OpenUpdateCinemaModal(cinema, ville) {

            const modalFilter = document.getElementById("MyModalUpdateCinema");
            console.log(modalFilter)
            if (modalFilter) {
                modalFilter.style.display = "block";
            }
            this.SelectedCinema = cinema;
            this.SelectedVille = ville;
        },

        OpenDeleteSeanceModal(seance) {
            const modalFilter = document.getElementById("myModalDeleteSeance");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }
            this.SelectedSeance = seance;
        },

        OpenUpdateSeanceModal(datechiffre, datemois, heure, version) {
            const modalFilter = document.getElementById("MyModalUpdateSeance");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }
            this.SelectedSeanceHeure = heure
            this.SelectedSeanceVersion = version
            this.SelectedSeanceDate = datechiffre + " " + datemois
        },

        CloseUpdateAddModal() {
            const modalFilter = document.getElementById("MyModalUpdateMovie");

            if (modalFilter) {
                modalFilter.style.display = "none";
            }

            this.notComplete = false;


        },
        CloseUpdateCinemaModal() {
            const modalFilter = document.getElementById("MyModalUpdateCinema");

            if (modalFilter) {
                modalFilter.style.display = "none";
            }
            this.notCinemaComplete = false;

        },
        CloseUpdateSeanceModal() {
            const modalFilter = document.getElementById("MyModalUpdateSeance");

            if (modalFilter) {
                modalFilter.style.display = "none";
            }

            this.notSeanceComplete = false;

        },
        CloseDeleteModal() {

            const modalFilter = document.getElementById("myModalDeleteMovie");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }


        },
        CloseDeleteCinemaModal() {

            const modalFilter = document.getElementById("myModalDeleteCinema");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }
        },
        CloseDeleteSeanceModal() {

            const modalFilter = document.getElementById("myModalDeleteSeance");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }
            console.log(this.SelectedSeance);


        },
        DeleteMovie() {
            console.log(this.SelectedMovie);
        },
        DeleteCinema() {
            console.log(this.SelectedCinema);
        },
        DeleteSeance() {
            console.log(this.SelectedSeance);
        },
        showAddMovie() {

            const modalFilter = document.getElementById("MyModalAddMovie");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }

        },
        showAddCinema() {

            const modalFilter = document.getElementById("MyModalAddCinema");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }

        },
        showAddSeance() {

            const modalFilter = document.getElementById("MyModalAddSeance");

            if (modalFilter) {
                modalFilter.style.display = "block";
            }

        },
        CloseAddModal() {
            const modalFilter = document.getElementById("MyModalAddMovie");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }
            this.notComplete = false;
        },
        CloseAddCinemaModal() {
            const modalFilter = document.getElementById("MyModalAddCinema");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }

            this.notCinemaComplete = false;
        },
        CloseAddSeanceModal() {
            const modalFilter = document.getElementById("MyModalAddSeance");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }
            this.notSeanceComplete = false;
        },
        CloseFilterPage() {
            const modalFilter = document.getElementById("myModalFilter");

            if (modalFilter) {
                modalFilter.style.display = "None";
            }

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
                acteurs: { nom_acteur: string }[];
                synopsis: string;
                trailer: string;
                realisateur: string;
            }> = [];

            titles.map(function (title, index) {
                type Genre = { genre: string };
                type Acteur = { nom_acteur: string };
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
                    acteurs: Acteur[],
                    realisateur: string
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
                    acteurs: [],
                    realisateur: '',
                };

                switch (title) {
                    case "Dune":
                        movieData.age = "12";
                        movieData.date_sortie = '2021-09-03';
                        movieData.genres = [{ genre: 'Science Fiction' }, { genre: 'Adventure' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h46";
                        movieData.synopsis = "In the distant future, Paul Atreides becomes embroiled in political intrigue and must navigate the dangerous desert planet Arrakis to secure the future of his people.";
                        movieData.realisateur = "Denis Villeneuve";
                        movieData.acteurs = [{ nom_acteur: "Timothée Chalamet" }, { nom_acteur: "Zendaya" }, { nom_acteur: "Rebecca Ferguson" }] as Acteur[];
                        break;
                    case "Interstellar":
                        movieData.age = "Tous Public";
                        movieData.date_sortie = '2014-11-07';
                        movieData.genres = [{ genre: 'Science Fiction' }, { genre: 'Drama' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h20";
                        movieData.synopsis = "A team of astronauts embarks on a perilous journey through a wormhole in search of a new habitable planet for humanity as Earth faces an environmental catastrophe.";
                        movieData.realisateur = "Christopher Nolan";
                        movieData.acteurs = [{ nom_acteur: "Matthew McConaughey" }, { nom_acteur: "Anne Hathaway" }, { nom_acteur: "Michael Caine" }] as Acteur[];
                        break;
                    case "Joker":
                        movieData.age = "16";
                        movieData.date_sortie = '2019-10-04';
                        movieData.genres = [{ genre: 'Crime' }, { genre: 'Drama' }, { genre: 'Thriller' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "1h35";
                        movieData.synopsis = "In Gotham City, failed comedian Arthur Fleck descends into madness, transforming into the iconic and anarchic criminal known as the Joker.";
                        movieData.realisateur = "Todd Phillips";
                        movieData.acteurs = [{ nom_acteur: "Joaquin Phoenix" }, { nom_acteur: "Robert De Niro" }, { nom_acteur: "Zazie Beetz" }] as Acteur[];
                        break;
                    case "Scary Movie":
                        movieData.age = "16";
                        movieData.date_sortie = '2000-07-07';
                        movieData.genres = [{ genre: 'Comedy' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h05";
                        movieData.synopsis = "A comedic parody that satirizes popular horror and thriller movies, bringing humor to classic scary movie tropes.";
                        movieData.realisateur = "Keenen Ivory Wayans";
                        movieData.acteurs = [{ nom_acteur: "Anna Faris" }, { nom_acteur: "Shawn Wayans" }, { nom_acteur: "Shannon Elizabeth" }] as Acteur[];

                        break;
                    case "The Maze Runner":
                        movieData.age = "12";
                        movieData.date_sortie = '2014-09-19';
                        movieData.genres = [{ genre: 'Action' }, { genre: 'Mystery' }, { genre: 'Sci-Fi' }, { genre: 'Thriller' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h00";
                        movieData.synopsis = "A group of young individuals finds themselves trapped in a mysterious maze, with no memory of how they got there, and must navigate its challenges to escape.";
                        movieData.realisateur = "Wes Bal";
                        movieData.acteurs = [{ nom_acteur: "Dylan O'Brien" }, { nom_acteur: "Thomas Brodie-Sangster" }, { nom_acteur: "Kaya Scodelario" }] as Acteur[];
                        break;
                    case "Top Gun":
                        movieData.age = "12";
                        movieData.date_sortie = '2022-05-25';
                        movieData.genres = [{ genre: 'Action' }, { genre: 'Drama' }] as Genre[];
                        movieData.langue = "Anglais Français";
                        movieData.duration = "2h55";
                        movieData.synopsis = "Maverick, a talented fighter pilot, competes at the Top Gun Naval Fighter Weapons School, facing intense competition and forming bonds that will shape his future.";
                        movieData.realisateur = "Joseph Kosinski";
                        movieData.acteurs = [{ nom_acteur: "Tom Cruise" }, { nom_acteur: "Miles Teller" }, { nom_acteur: "Jennifer Connelly" }] as Acteur[];
                        break;
                    case "Uncharted":
                        movieData.age = "14";
                        movieData.date_sortie = '2022-02-11';
                        movieData.genres = [{ genre: 'Action' }, { genre: 'Adventure' }] as Genre[];
                        movieData.langue = "Anglais";
                        movieData.duration = "2h48";
                        movieData.synopsis = "Nathan Drake, a treasure hunter, embarks on a perilous journey to uncover historical mysteries and face ruthless enemies in this action-adventure film.";
                        movieData.realisateur = "Christopher Nolan";
                        movieData.acteurs = [{ nom_acteur: "Tom Holland" }, { nom_acteur: "Mark Wahlberg" }, { nom_acteur: "Sophia Taylor Al" }] as Acteur[];
                        break;
                    default:
                        break;
                }
                filteredMovies.push(movieData);

            });


            this.movies = filteredMovies;

            console.log(this.movies)

            localStorage.setItem('movies', JSON.stringify(this.movies));
        },
        async getSeances() {
            this.seances = [
                { titre: 'Dune', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00', version: 'VO' }, { heure: '18:00', version: 'VF' }] }, { name: 'Pathé Opéra', ville: 'Paris 02', seances: [{ heure: '17:30', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VOSTFR' }, { heure: '19:00', version: 'VOSTFR' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:00', version: 'VO' }, { heure: '19:30', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Halles', ville: 'Paris 01', seances: [{ heure: '14:30', version: 'VO' }, { heure: '17:45', version: 'VO' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
                { titre: 'Interstellar', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '15:00' }, { heure: '18:00' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30', version: 'VO' }, { heure: '16:00', version: 'VF' }, { heure: '20:00', version: 'VOSTFR' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VO' }, { heure: '21:30', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VOSTFR' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
                { titre: 'Joker', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VO' }, { heure: '19:00', version: 'VO' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30', version: 'VO' }, { heure: '15:00', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Le Grand Rex', ville: 'Paris 02', seances: [{ heure: '15:00', version: 'VO' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Bercy', ville: 'Paris 14', seances: [{ heure: '13:00', version: 'VOSTFR' }, { heure: '20:30', version: 'VF' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VF' }, { heure: '19:00', version: 'VO' }] }] }] },
                { titre: 'Scary Movie', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Montparnasse', ville: 'Paris 06', seances: [{ heure: '18:00', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Le Luxor', ville: 'Paris 10', seances: [{ heure: '15:30', version: 'VO' }, { heure: '18:00', version: 'VO' }, { heure: '21:00', version: 'VO' }] }, { name: 'Mk2 Nation', ville: 'Paris 12', seances: [{ heure: '16:30', version: 'VO' }, { heure: '20:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00' }, { heure: '21:30', version: 'VO' }] }, { name: 'Mk2 Bibliothèque', ville: 'Paris 13', seances: [{ heure: '17:45', version: 'VF' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Odéon', ville: 'Paris 06', seances: [{ heure: '16:15', version: 'VO' }, { heure: '18:30', version: 'VO' }] }] }] },
                { titre: 'The Maze Runner', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'UGC Gobelins', ville: 'Paris 13', seances: [{ heure: '17:00', version: 'VO' }, { heure: '19:00', version: 'VO' }] }, { name: 'MK2 Gambetta', ville: 'Paris 20', seances: [{ heure: '14:30', version: 'VOSTFR' }, { heure: '16:00', version: 'VOSTFR' }, { heure: '20:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '16:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'UGC Issy-Les-Moulineaux', ville: 'Issy-Les-Moulineaux', seances: [{ heure: '16:00', version: 'VF' }, { heure: '21:30', version: 'VOSTFR' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VF' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VF' }] }, { name: 'Pathé Boulogne', ville: 'Boulogne', seances: [{ heure: '15:15', version: 'VF' }, { heure: '18:30', version: 'VO' }] }] }, { jour: 'Mer', jourChiffre: 29, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VO' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '15:15', version: 'VOSTFR' }, { heure: '17:30', version: 'VF' }] }] }] },
                { titre: 'Top Gun', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Pathé Ivry', ville: 'Ivry-Sur-Seine', seances: [{ heure: '16:30', version: 'VO' }, { heure: '18:00', version: 'VO' }] }, { name: 'UGC Danton', ville: 'Paris 06', seances: [{ heure: '14:30', version: 'VF' }, { heure: '16:00' }, { heure: '20:00' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VO' }, { heure: '21:30', version: 'VF' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '18:30', version: 'VF' }, { heure: '20:00', version: 'VO' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '17:45', version: 'VF' }, { heure: '20:00', version: 'VF' }] }, { name: 'Helios', ville: 'Colombes', seances: [{ heure: '16:15', version: 'VF' }, { heure: '18:30', version: 'VF' }] }] }] },
                { titre: 'Uncharted', dates: [{ jour: 'Dim', jourChiffre: 26, mois: 'nov', cinemas: [{ name: 'Royal Palace', ville: 'Nogent-Sur-Marne', seances: [{ heure: '16:00', version: 'VO' }, { heure: '18:00', version: 'VO' }] }, { name: 'Pathé Thiais', ville: 'Thiais', seances: [{ heure: '15:30', version: 'VO' }, { heure: '19:45', version: 'VOSTFR' }, { heure: '22:00', version: 'VO' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VO' }, { heure: '19:00', version: 'VO' }] }] }, { jour: 'Lun', jourChiffre: 27, mois: 'nov', cinemas: [{ name: 'Mk2 Gobelins', ville: 'Paris 13', seances: [{ heure: '16:00', version: 'VOSTFR' }, { heure: '21:30', version: 'VF' }] }, { name: 'Mk2 Bastille', ville: 'Paris 11', seances: [{ heure: '15:45', version: 'VF' }, { heure: '19:00', version: 'VF' }] }] }, { jour: 'Mar', jourChiffre: 28, mois: 'nov', cinemas: [{ name: 'UGC Creteil', ville: 'Créteil', seances: [{ heure: '17:45', version: 'VO' }, { heure: '20:00', version: 'VO' }] }, { name: 'UGC Velizy', ville: 'Velizy', seances: [{ heure: '16:15', version: 'VF' }, { heure: '18:30', version: 'VO' }] }] }] }
            ]
        },
        async onMounted() {
            await this.getFilteredMoviesWithoutAPI();
            await this.getSeances();
            const storedCinemas = localStorage.getItem('cinemas');
            this.cinemas = storedCinemas ? JSON.parse(storedCinemas) : [];
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
  
  