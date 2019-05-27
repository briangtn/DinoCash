<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Total: {{total}} €</p>
        </header>
        <section class="modal-card-body">
            <div class="columns">
                <div class="column is-one-third">
                    <figure class="image is-128x128"><img src="/static/paypal.png" @click="create(0)"></figure>
                </div>
                <div class="column is-one-third">
                    <figure class="image is-128x128"><img src="/static/cb.png" @click="create(1)"></figure>
                </div>
                <div class="column is-one-third">
                    <figure class="image is-128x128"><img src="/static/money.png" @click="create(2)"></figure>
                </div>
                <div class="column"></div>
            </div>
        </section>
    </div>
</template>

<script>

    module.exports = {
        props: ['axios', 'order', 'sellingId'],
        data: function () {
            return {
                total: 0
            }
        },
        mounted: function () {
            this.order.forEach(article => {
                this.total += parseFloat(article.price);                
            });
        },
        methods: {
            create: function(payementMethod) {
                let newOrder = [];
                for (let i = 0; i < this.order.length; i++) {
                    newOrder.push({articleId: this.order[i].id, sellingId: this.sellingId, payementMethod: payementMethod});
                }
                this.axios.post(process.env.API_LOCATION + '/article-sells/order', newOrder)
                .then((response) => {
                    this.$parent.close();
                });
            }
        }
    }
</script>