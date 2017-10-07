'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('nativescript-vue'));
var dialogs = require('ui/dialogs');
var http = _interopDefault(require('http'));

var App = { template: "<page ref=\"app\"> <grid-layout rows=\"auto,*\"> <grid-layout row=\"0\" columns=\"18,*\" class=\"action-bar\"> <label col=\"1\" class=\"bold\" text=\"Contactos\" text-wrap=\"true\"> </label> </grid-layout> <grid-layout row=\"1\"> <activity-indicator col-span=\"2\" :busy=\"isLoading\"> </activity-indicator> <label class=\"empty\" ref=\"emptyLabel\" text=\"VACIO\" :opacity=\"foundSomeone\"> </label> <grid-layout v-if=\"peopleCounted > 0\"> <list-view :items=\"people\" class=\"list\"> <template scope=\"person\"> <stack-layout class=\"list-item\"> <label :text=\"person.name\"></label> <label :text=\"person.username\"></label> <label :text=\"person.email\"></label> </stack-layout> </template> </list-view> </grid-layout> </grid-layout> </grid-layout> </page>", _scopeId: 'data-v-2e015f16',
    data: function data() {
        return {
            isLoading: true,
            foundSomeone: false,
            people: []
        };
    },


    computed: {
        peopleCounted: function peopleCounted() {
            return this.people.length > 0;
        }
    },

    mounted: function mounted() {
        var _this = this;

        // NOTA: Puedes usar Axios, node-fetch o Fetch API
        this.$http.getJSON("https://jsonplaceholder.typicode.com/users?_limit=25").then(function (response) {
            _this.isLoding = false;
            _this.people = response;
        }).catch(function (error) {
            _this.isLoading = false;
            _this.foundSomeone = true;

            dialogs.alert({
                message: "Algo MUY grave ocurrio!",
                okButtonText: "Intentar mas tarde"
            });
        });
    }
};

Vue.prototype.$http = http;
var app = new Vue({
  render: function render(h) {
    return h("app");
  },
  components: {
    App: App
  }
});
app.$start();
