<template>
  <v-list class="fill-height" color="transparent">
    <v-list-item-group v-model="selectedItem">
      <v-list-item v-for="(item, i) in items" :key="i" class="ma-2" active-class="primary lighten-1 card_title--text" color="list_title">
        <v-list-item-content @click="$emit('click', item.model)">
          <v-row>
            <v-col>
              <v-list-item-title v-text="item.model" class="text-center"/>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
  export default {
    name: 'i-select-list',
    data: () => ({
      selectedItem: 1,
      items: [
        {
          model: 'WELDER0001'
        },
        {
          model: 'WELDER0002'
        },
        {
          model: 'WELDER0003'
        },
        {
          model: 'WELDER0004'
        },
        {
          model: 'WELDER0005'
        },
        {
          model: 'WELDER0006'
        },
        {
          model: 'WELDER0007'
        },
        {
          model: 'WELDER0008'
        },
        {
          model: 'WELDER0009'
        },
        {
          model: 'WELDER0010'
        },
        {
          model: 'WELDER0011'
        },
        {
          model: 'WELDER0012'
        },
        {
          model: 'WELDER0013'
        },
        {
          model: 'WELDER0014'
        },
        {
          model: 'WELDER0015'
        },
        {
          model: 'WELDER0016'
        },
        {
          model: 'WELDER0017'
        },
        {
          model: 'WELDER0018'
        },
        {
          model: 'WELDER0019'
        },
        {
          model: 'WELDER0020'
        }
      ]
    })
  }
</script>