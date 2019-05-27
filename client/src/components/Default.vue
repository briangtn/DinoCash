<template>
    <div>
        <b-modal :active.sync="isCreateArticleModalActive" has-modal-card>
            <article-form :axios="axios"></article-form>
        </b-modal>
        <b-modal :active.sync="isConfirmOrderModalActive" has-modal-card>
            <order-confirmation :axios="axios" :order="currentOrder" :sellingId="sellingId"></order-confirmation>
        </b-modal>
        <b-modal :active.sync="isSellingSummaryModalActive" has-modal-card>
            <selling-summary :axios="axios" :sellingId="sellingId"></selling-summary>
        </b-modal>

        <div class="columns">
            <div class="column is-half">
                <button @click="isCreateArticleModalActive=true" class="button is-large is-fullwidth is-primary">Nouvel article</button>
            </div>
            <div class="column is-half">
                <button class="button is-large is-fullwidth is-danger" v-if="isOpen" @click="closeSelling">Fin de la vente</button>
                <button class="button is-large is-fullwidth is-success" v-else @click="newSelling">Nouvelle vente</button>
            </div>
        </div>
        <div class="columns" v-if="isOpen">
            <div class="column is-four-fifths">
                <div class="is-inline-block box" @click="addOtherToOrder">
                    <figure class="image is-256x256">
                        <img src="https://static.thenounproject.com/png/212203-200.png" alt="">
                    </figure>
                </div>
                <div class="is-inline-block box" v-for="article in articles" @click="addArticleToOrder(article)">
                    <figure class="image is-256x256">
                        <img v-if="article.image_url" :src="article.image_url" alt="">
                        <img v-else src="https://bulma.io/images/placeholders/128x128.png" alt="">
                    </figure>
                </div>
                <div class="is-inline-block">
                </div>
            </div>
            <div class="column"></div>
            <div class="column">
                <div class="notification">
                    <div class="columns" v-for="article in currentOrder"> 
                        <div class="column">
                            <figure class="image is-128x128" style="border: 3px solid black">
                                <img :src="article.image_url" alt="">
                            </figure>
                        </div>
                        <div class="column">
                            <p class="">{{article.price}}€</p>
                        </div>
                    </div>
                </div>
                <div class="box" @click="openOrderConfirmation">
                    <strong>Total: </strong> {{total}}€
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ArticleForm from '@/components/ArticleForm'
    import OrderConfirmation from '@/components/OrderConfirmation'
    import SellingSummary from '@/components/SellingSummary'
    import Vue from 'vue'
    
    export default {
        name: 'Default',
        components: {
            ArticleForm,
            OrderConfirmation,
            SellingSummary
        },
        data () {
            return {
                articles: [],
                isCreateArticleModalActive: false,
                isConfirmOrderModalActive: false,
                isSellingSummaryModalActive: false,
                isOpen: false,
                sellingId: null,
                currentOrder: [],
                total: 0,
                axios: axios
            }
        },
        mounted() {
          
            axios.get(process.env.API_LOCATION + '/articles')
            .then(response => {
                this.articles = response.data
            })

            axios.get(process.env.API_LOCATION + '/sellings?filter={\"where\":%20{\"isFinished\":false}}')
            .then(response => {
                this.isOpen = response.data.length != 0
                if (this.isOpen)
                    this.sellingId = response.data[0].id;
            })
        },
        watch: {
            isCreateArticleModalActive : function (val) {
                if (!val) {
                    axios.get(process.env.API_LOCATION + '/articles')
                    .then(response => {this.articles = response.data})
                }
            },
            isConfirmOrderModalActive: function (val) {
                if (!val) {
                    this.currentOrder = [];
                    this.total = 0;
                }
            },
            isSellingSummaryModalActive: function (val) {
                if (val)
                    return;
                axios.get(process.env.API_LOCATION + '/sellings?filter={\"where\":%20{\"isFinished\":false}}')
                .then(response => {
                    this.isOpen = response.data.length != 0
                    if (this.isOpen)
                        this.sellingId = response.data[0].id;
                    else
                        this.sellingId = null;
                })
            }
        },
        methods: {
            newSelling : function() {
                this.$dialog.prompt({
                    message: 'Objectif de la vente',
                    inputAttrs: {
                        type: 'number',
                        placeholder: 'Entrez l\'objectif de la vente en euros',
                        value: 0,
                    },
                    onConfirm: (value) => {
                        axios.post(process.env.API_LOCATION + '/sellings', {objective: parseFloat(value)})
                        .then(response => {this.isOpen = true; this.sellingId = response.data.id;});
                    }
                })
            },
            addArticleToOrder: function (article) {
                this.currentOrder.push(article);
                this.total += article.price;
            },
            addOtherToOrder: function() {
                this.$dialog.prompt({
                    message: 'Prix',
                    inputAttrs: {
                        type: 'number',
                        placeholder: 'Prix',
                        step: 'any',
                        value: 0,
                    },
                    onConfirm: (value) => {
                        this.addArticleToOrder({price: parseFloat(value), image_url: "https://static.thenounproject.com/png/212203-200.png"})
                    }
                })
            },
            openOrderConfirmation: function() {
                if (this.currentOrder.length == 0)
                    return;
                this.isConfirmOrderModalActive = true;
            },
            closeSelling: function () {
                this.isSellingSummaryModalActive = true; 
            }
        }
    }
</script>
