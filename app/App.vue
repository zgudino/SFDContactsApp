<template>
    <page ref="app">
        <grid-layout rows="auto,*">
            <grid-layout row="0" columns="18,*" class="action-bar">
                <label col="1" class="bold" text="Contactos" text-wrap="true">
                </label>
            </grid-layout>

            <grid-layout row="1">
                <activity-indicator col-span="2" :busy="isLoading">
                </activity-indicator>
                <label class="empty" ref="emptyLabel" text="VACIO" :opacity="foundSomeone">
                </label>

                <grid-layout v-if="peopleCounted > 0">
                    <list-view :items="people" class="list">
                        <template scope="person">
                            <stack-layout class="list-item">
                                <label :text="person.name"></label>
                                <label :text="person.username"></label>
                                <label :text="person.email"></label>
                            </stack-layout>
                        </template>
                    </list-view>
                </grid-layout>
            </grid-layout>
        </grid-layout>
    </page>
</template>

<script>
import * as dialogs from "ui/dialogs";

export default {
    data() {
        return {
            isLoading: true,
            foundSomeone: false,
            people: []
        }
    },

    computed: {
        peopleCounted() {
            return this.people.length > 0
        }
    },

    mounted() {
        // NOTA: Puedes usar Axios, node-fetch o Fetch API
        this.$http.getJSON("https://jsonplaceholder.typicode.com/users?_limit=25")
            .then(response => {
                this.isLoding = false
                this.people = response
            })

            .catch(error => {
                this.isLoading = false
                this.foundSomeone = true

                dialogs.alert({
                    message: "Algo MUY grave ocurrio!",
                    okButtonText: "Intentar mas tarde"
                })
            })
    }
}
</script>

<style lang="scss" scoped>
@import "nativescript-theme-core/css/core.dark.css";

page {
    background-color: white;
}

.action-bar {
    margin-top: 20;
    padding-bottom: 8;
}

.bold {
    font-size: 28;
    font-weight: 800;
}

.list {
    height: 100%;
    margin-left: 22;
}

.list-item {
    margin: 12;
}

.empty {
    opacity: 0;
    color: #ddd;
    font-size: 22;
    font-weight: 400;
    text-align: center;
    vertical-align: center;
}
</style>