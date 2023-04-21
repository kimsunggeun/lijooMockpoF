<template>
  <div>
    <v-dialog ref="dialog" v-model="dateModal" :return-value.sync="date" persistent width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="date" :label="`${label}`" append-icon="$calendar" readonly v-on="on" dense outlined></v-text-field>
      </template>
      <v-date-picker v-model="date" :max="maxDate" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="white--text" @click="dateModal = false">Cancel</v-btn>
        <v-btn v-if="dateOnly == false" text color="white--text" @click="timeModal = true">OK</v-btn>
        <v-btn v-else text color="white--text" @click="set()">OK</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog ref="dialog2" v-model="timeModal" :return-value.sync="time" persistent width="290px">
      <v-time-picker v-if="timeModal" v-model="time" full-width>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="timeModal = false">Cancel</v-btn>
        <v-btn text color="primary" @click="set()">OK</v-btn>
      </v-time-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    label:{
      type: String,
      default: () => {
        return undefined
      }
    },
    dateOnly:{ //datePicker만 사용할지
      type: Boolean,
      default: false
    },
    allowMaxDate:{ //datePicker의 선택가능한 최대날짜 설정
      type: String,
      default: () => {
        return ''
      }
    },
    firstDisplayDate:{ //text-field에 표시하는 초기 display날짜 설정
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data: () => ({
    date: '',
    dateModal: false,
    time: '',
    timeModal: false,
    maxDate:''
  }),
  mounted(){
    this.setMaxDate()
    this.setFirstDisplayDate()
  },
  methods: {
    set() {
      this.$emit('getDate', this.date)
      this.date = this.date + ' ' + this.time
      this.$refs.dialog.save(this.date)
      this.$refs.dialog2.save(this.time)
    },
    setMaxDate(){
      if(this.allowMaxDate != null) this.maxDate = this.allowMaxDate;
      else this.maxDate=''
    },
    setFirstDisplayDate(){
      if(this.firstDisplayDate != null ) this.date = this. firstDisplayDate
      else this.date = ''
    }
  }
}
</script>
