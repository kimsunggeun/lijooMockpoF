<template>
  <div class="d-flex flex-column flex-md-row align-md-center">
    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="s_date"
      transition="scale-transition" offset-y max-width="290px" min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="s_date" append-icon="$calendar" @click:append="menu1 = true" readonly v-bind="attrs"
          v-on="on" solo class="px-lg-3 pb-md-0 pb-1" />
      </template>
      <v-date-picker v-model="s_date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="white--text" @click="menu1 = false">{{ $t('cancel') }}</v-btn>
        <v-btn text color="white--text" @click="s_date_search(s_date)">{{ $t('ok') }}</v-btn>
      </v-date-picker>

    </v-menu>
    <span class="px-2 text-center hidden-md-and-down">
      –
    </span>
    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="e_date"
      transition="scale-transition" offset-y max-width="290px" min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="e_date" append-icon="$calendar" @click:append="menu2 = true" readonly v-bind="attrs"
          v-on="on" solo class="px-lg-3" />
      </template>
      <v-date-picker v-model="e_date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="white--text" @click="menu2 = false">{{ $t('cancel') }}</v-btn>
        <v-btn text color="white--text" @click="e_date_search(e_date)">{{ $t('ok') }}</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'datePicker',
    props: {
      headerLabel: {
        type: String,
        default: '제목',
      },
    },
    data() {
      return {
        // date picker
        date: new Date().toISOString().substr(0, 10),
        s_date: new Date().toISOString().substr(0, 10),
        e_date: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
      }
    },
    methods: {
      s_date_search(v) {
        this.s_date = v;
        this.menu1 = false;
        this.$refs.menu1.save(v);
      },
      e_date_search(v) {
        this.e_date = v;
        this.menu2 = false;
        this.$refs.menu2.save(v);
      }
    }
  }
</script>