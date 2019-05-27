<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Récapitulatif de la vente</p>
        </header>
        <section class="modal-card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Type de transaction</th>
                        <th>Somme récolté dans ce type de transaction</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Paypal</td>
                        <td>{{totalPaypal}} €</td>
                    </tr>
                    <tr>
                        <td>CB</td>
                        <td>{{totalCard}} €</td>
                    </tr>
                    <tr>
                        <td>Especes</td>
                        <td>{{totalMoney}} €</td>
                    </tr>
                </tbody>
            </table>
            <div class="box">
                <strong>Bénéfice: </strong> {{ (totalPaypal + totalCard + totalMoney) - objective }}
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="endSelling">Finir la vente</button>
        </footer>
    </div>
</template>

<script>
    module.exports = {
        props: ['axios', 'sellingId'],
        data: function () {
            return {
                total: 0,
                totalPaypal: 0,
                totalCard: 0,
                totalMoney: 0,
                objective: 0,
            }
        },
        mounted: function () {
            this.axios.get(process.env.API_LOCATION + '/article-sells/getGains?filter={"where":{"payementMethod":0,"sellingId":' + this.sellingId + '}}')
            .then((response) => {
                this.totalPaypal = response.data;
            })
            this.axios.get(process.env.API_LOCATION + '/article-sells/getGains?filter={"where":{"payementMethod":1,"sellingId":' + this.sellingId + '}}')
            .then((response) => {
                this.totalCard = response.data;
            })
            this.axios.get(process.env.API_LOCATION + '/article-sells/getGains?filter={"where":{"payementMethod":2,"sellingId":' + this.sellingId + '}}')
            .then((response) => {
                this.totalMoney = response.data;
            })

            this.axios.get(process.env.API_LOCATION + '/sellings/' + this.sellingId)
            .then((response) => {
                this.objective = response.data.objective;
            })
        },
        methods: {
            endSelling : function() {
                this.axios.patch(process.env.API_LOCATION + '/sellings', {isFinished: true})
                .then(() => {this.$parent.close()});
            }
        }
    }
</script>