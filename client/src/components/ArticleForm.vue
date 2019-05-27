<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Création d'article</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Nom">
                <b-input
                    type="text"
                    v-model="article.name"
                    placeholder="Nom de l'article"
                    required>
                </b-input>
            </b-field>
            <b-field label="Prix">
                <b-input
                    type="number"
                    v-model="article.price"
                    placeholder="Prix"
                    step="any"
                    required>
                </b-input>
            </b-field>
            <b-field label="Url de l'image">
                <b-input
                    type="url"
                    v-model="article.image_url"
                    placeholder="Votre image"
                    >
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="create">Create</button>
        </footer>
    </div>
</template>

<script>
    module.exports = {
        props: ['axios'],
        data: function () {
            return {
                article: {}
            }
        },
        mounted: function () {
        },
        methods: {
            create: function() {
                let newArticle = {name: this.article.name, price: parseFloat(this.article.price), image_url: this.article.image_url};
                console.log(newArticle);
                this.axios.post(process.env.API_LOCATION + '/articles', newArticle)
                .then(response => {
                    this.$parent.close();
                })
                .catch(error => {console.log(error)});
            }
        }
    }
</script>