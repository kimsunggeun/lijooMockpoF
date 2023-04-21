<template>
    <i-card-vertical class="fill-height" headerTitle="themeGenerator">
        <template v-slot:body>
            <v-row align-center justify-center>
                <v-col cols="12" sm="6" lg="6" class="pa-2">
                    <v-row>
                        <v-switch v-model="$vuetify.theme.dark" class="align-center sub_title--text"
                            @change="changeTheme($vuetify.theme.dark)"></v-switch>
                        <v-layout class="sub_title--text font-weight-bold py-2">{{ $t('themeSelect') }} [ {{ themeType }} ]</v-layout>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="6" lg="6" class="text-right">
                    <v-btn small color="warning" @click="showDialog()">JSON</v-btn>
                </v-col>
            </v-row>
            <v-divider />
            <v-row no-gutters>
                <v-col cols="12" sm="12" lg="6">
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">primary</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="primary" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="primary--text font-weight-bold py-2">{{ primary }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">secondary</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="secondary" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="secondary--text font-weight-bold py-2">{{ secondary }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">third</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="third" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="third--text font-weight-bold py-2">{{ third }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">accent</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="accent" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="accent--text font-weight-bold py-2">{{ accent }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">error</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="error" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="error--text font-weight-bold py-2">{{ error }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">success</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="success" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="success--text font-weight-bold py-2">{{ success }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">warning</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="warning" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="warning--text font-weight-bold py-2">{{ warning }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">app_bar_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="app_bar_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="app_bar_bg--text font-weight-bold py-2">{{ app_bar_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">nav_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="nav_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="nav_bg--text font-weight-bold py-2">{{ nav_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">menu_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="menu_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="menu_bg--text font-weight-bold py-2">{{ menu_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">list_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="list_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="list_bg--text font-weight-bold py-2">{{ list_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">container_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="container_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="container_bg--text font-weight-bold py-2">{{ container_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">card_title_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="card_title_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="card_title_bg--text font-weight-bold py-2">{{ card_title_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>                    
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">card_bg</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="card_bg" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="card_bg--text font-weight-bold py-2">{{ card_bg }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider vertical />
                <v-col cols="12" sm="12" lg="6">
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-layout class="sub_title--text font-weight-bold py-2">app_bar_title</v-layout>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="app_bar_title" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="app_bar_title--text font-weight-bold py-2">{{ app_bar_title }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">nav_title</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="nav_title" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="nav_title--text font-weight-bold py-2">{{ nav_title }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">menu_title</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="menu_title" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="menu_title--text font-weight-bold py-2">{{ menu_title }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">list_title</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="list_title" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="list_title--text font-weight-bold py-2">{{ list_title }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">card_title</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="card_title" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="card_title--text font-weight-bold py-2">{{ card_title }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">sub_title</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="sub_title" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="sub_title--text font-weight-bold py-2">{{ sub_title }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <div class="sub_title--text font-weight-bold py-2">content</div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6" class="pt-0 pb-0">
                            <v-row>
                                <v-swatches class="pr-5" v-model="content" show-fallback fallback-input-type="color" swatches="text-advanced" v-bind:background-color="container_bg" v-bind:fallback-input-class="container_bg" v-bind:fallback-ok-class="primary"></v-swatches>
                                <v-layout class="content--text font-weight-bold py-2">{{ content }}</v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider />
                </v-col>                
            </v-row>
            <v-divider/>
            <v-row no-gutters>                
                <v-dialog v-model="themeDialog">
                    <i-dialog-info dialog-title="themeGenerator" @hide="hideDialog">
                    <template v-slot:dialogBody>
                        <v-layout column overflow-auto fill-height vh-70>
                            <code-highlight language="javascript" class="pa-2">
                                {{ themeJSON }}
                            </code-highlight> 
                        </v-layout>
                    </template>
                    </i-dialog-info>
                </v-dialog>
            </v-row>
        </template>
    </i-card-vertical>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import iDialogInfo from '@/components/common/iDialogInfo.vue'
import VSwatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.css"
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

export default {
    name: 'themeGenerator',
    components: {
        'i-card-vertical': iCardVertical,
        'i-dialog-info': iDialogInfo,
        'v-swatches': VSwatches,
        'code-highlight': CodeHighlight
    },
    data: () => ({
        themeDialog: false,
        themeJSON: {
            themes: {
                light: {},
                dark: {}
            }
        },
        themeType: '',
        // swatches      
        swatches: [
            ['#F44336', '#E91E63', '#9C27B0', '#673AB7'],
            ['#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'],
            ['#009688', '#4CAF50', '#8BC34A', '#CDDC39'],
            ['#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
            ['#795548', '#607D8B', '#9E9E9E', '#F5F5F5']
        ],
        primary: '',
        secondary: '',
        third: '',
        accent: '',
        error: '',
        success: '',
        warning: '',
        app_bar_title: '',
        nav_title: '',
        menu_title: '',
        list_title: '',
        card_title: '',
        sub_title: '',
        content: '',
        app_bar_bg: '',
        nav_bg: '',
        menu_bg: '',
        list_bg: '',
        container_bg: '',
        card_bg: '',
        card_title_bg: ''
    }),
    created() {
        if (this.$vuetify.theme.dark) {
            this.themeType = 'Dark'
            this.primary = this.$vuetify.theme.themes.dark.primary
            this.secondary = this.$vuetify.theme.themes.dark.secondary
            this.third = this.$vuetify.theme.themes.dark.third
            this.accent = this.$vuetify.theme.themes.dark.accent
            this.error = this.$vuetify.theme.themes.dark.error
            this.success = this.$vuetify.theme.themes.dark.success
            this.warning = this.$vuetify.theme.themes.dark.warning
            this.app_bar_title = this.$vuetify.theme.themes.dark.app_bar_title
            this.nav_title = this.$vuetify.theme.themes.dark.nav_title
            this.menu_title = this.$vuetify.theme.themes.dark.menu_title
            this.list_title = this.$vuetify.theme.themes.dark.list_title
            this.card_title = this.$vuetify.theme.themes.dark.card_title
            this.sub_title = this.$vuetify.theme.themes.dark.sub_title
            this.content = this.$vuetify.theme.themes.dark.content
            this.app_bar_bg = this.$vuetify.theme.themes.dark.app_bar_bg
            this.nav_bg = this.$vuetify.theme.themes.dark.nav_bg
            this.menu_bg = this.$vuetify.theme.themes.dark.menu_bg
            this.list_bg = this.$vuetify.theme.themes.dark.list_bg
            this.container_bg = this.$vuetify.theme.themes.dark.container_bg
            this.card_bg = this.$vuetify.theme.themes.dark.card_bg
            this.card_title_bg = this.$vuetify.theme.themes.dark.card_title_bg
        } else {            
            this.themeType = 'Light'
            this.primary = this.$vuetify.theme.themes.light.primary
            this.secondary = this.$vuetify.theme.themes.light.secondary
            this.third = this.$vuetify.theme.themes.light.third
            this.accent = this.$vuetify.theme.themes.light.accent
            this.error = this.$vuetify.theme.themes.light.error
            this.success = this.$vuetify.theme.themes.light.success
            this.warning = this.$vuetify.theme.themes.light.warning
            this.app_bar_title = this.$vuetify.theme.themes.light.app_bar_title
            this.nav_title = this.$vuetify.theme.themes.light.nav_title
            this.menu_title = this.$vuetify.theme.themes.light.menu_title
            this.list_title = this.$vuetify.theme.themes.light.list_title
            this.card_title = this.$vuetify.theme.themes.light.card_title
            this.sub_title = this.$vuetify.theme.themes.light.sub_title
            this.content = this.$vuetify.theme.themes.light.content
            this.app_bar_bg = this.$vuetify.theme.themes.light.app_bar_bg
            this.nav_bg = this.$vuetify.theme.themes.light.nav_bg
            this.menu_bg = this.$vuetify.theme.themes.light.menu_bg
            this.list_bg = this.$vuetify.theme.themes.light.list_bg
            this.container_bg = this.$vuetify.theme.themes.light.container_bg
            this.card_bg = this.$vuetify.theme.themes.light.card_bg
            this.card_title_bg = this.$vuetify.theme.themes.light.card_title_bg
        }
    },
    watch: {
        // theme primary 선택 해볼 수 있음
        primary: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.primary = this.primary
            } else {
                this.$vuetify.theme.themes.light.primary = this.primary
            }
        },
        secondary: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.secondary = this.secondary
            } else {
                this.$vuetify.theme.themes.light.secondary = this.secondary
            }
        },
        third: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.third = this.third
            } else {
                this.$vuetify.theme.themes.light.third = this.third
            }
        },
        accent: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.accent = this.accent
            } else {
                this.$vuetify.theme.themes.light.accent = this.accent
            }
        },
        error: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.error = this.error
            } else {
                this.$vuetify.theme.themes.light.error = this.error
            }
        },
        success: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.success = this.success
            } else {
                this.$vuetify.theme.themes.light.success = this.success
            }
        },
        warning: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.warning = this.warning
            } else {
                this.$vuetify.theme.themes.light.warning = this.warning
            }
        },
        app_bar_title: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.app_bar_title = this.app_bar_title
            } else {
                this.$vuetify.theme.themes.light.app_bar_title = this.app_bar_title
            }
        },
        nav_title: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.nav_title = this.nav_title
            } else {
                this.$vuetify.theme.themes.light.nav_title = this.nav_title
            }
        },
        menu_title: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.menu_title = this.menu_title
            } else {
                this.$vuetify.theme.themes.light.menu_title = this.menu_title
            }
        },
        list_title: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.list_title = this.list_title
            } else {
                this.$vuetify.theme.themes.light.list_title = this.list_title
            }
        },
        card_title: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.card_title = this.card_title
            } else {
                this.$vuetify.theme.themes.light.card_title = this.card_title
            }
        },
        sub_title: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.sub_title = this.sub_title
            } else {
                this.$vuetify.theme.themes.light.sub_title = this.sub_title
            }
        },
        content: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.content = this.content
            } else {
                this.$vuetify.theme.themes.light.content = this.content
            }
        },
        app_bar_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.app_bar_bg = this.app_bar_bg
            } else {
                this.$vuetify.theme.themes.light.app_bar_bg = this.app_bar_bg
            }
        },
        nav_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.nav_bg = this.nav_bg
            } else {
                this.$vuetify.theme.themes.light.nav_bg = this.nav_bg
            }
        },
        menu_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.menu_bg = this.menu_bg
            } else {
                this.$vuetify.theme.themes.light.menu_bg = this.menu_bg
            }
        },
        list_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.list_bg = this.list_bg
            } else {
                this.$vuetify.theme.themes.light.list_bg = this.list_bg
            }
        },
        container_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.container_bg = this.container_bg
            } else {
                this.$vuetify.theme.themes.light.container_bg = this.container_bg
            }
        },
        card_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.card_bg = this.card_bg
            } else {
                this.$vuetify.theme.themes.light.card_bg = this.card_bg
            }
        },
        card_title_bg: function () {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark.card_title_bg = this.card_title_bg
            } else {
                this.$vuetify.theme.themes.light.card_title_bg = this.card_title_bg
            }
        },
        themeDialog: function () {
            if(this.themeDialog){
                
            }
        }
    },
    methods: {
        hideDialog(){
            this.themeDialog = false
        },
        showDialog(){
            this.themeJSON.themes.light = this.$vuetify.theme.themes.light
            this.themeJSON.themes.dark = this.$vuetify.theme.themes.dark
            this.themeDialog = true
        },
        changeTheme(theme) {
            if (theme) {
                this.themeType = 'Dark'
                this.primary = this.$vuetify.theme.themes.dark.primary
                this.secondary = this.$vuetify.theme.themes.dark.secondary
                this.third = this.$vuetify.theme.themes.dark.third
                this.accent = this.$vuetify.theme.themes.dark.accent
                this.error = this.$vuetify.theme.themes.dark.error
                this.success = this.$vuetify.theme.themes.dark.success
                this.warning = this.$vuetify.theme.themes.dark.warning
                this.app_bar_title = this.$vuetify.theme.themes.dark.app_bar_title
                this.nav_title = this.$vuetify.theme.themes.dark.nav_title
                this.menu_title = this.$vuetify.theme.themes.dark.menu_title
                this.list_title = this.$vuetify.theme.themes.dark.list_title
                this.card_title = this.$vuetify.theme.themes.dark.card_title
                this.sub_title = this.$vuetify.theme.themes.dark.sub_title
                this.content = this.$vuetify.theme.themes.dark.content
                this.app_bar_bg = this.$vuetify.theme.themes.dark.app_bar_bg
                this.nav_bg = this.$vuetify.theme.themes.dark.nav_bg
                this.menu_bg = this.$vuetify.theme.themes.dark.menu_bg
                this.list_bg = this.$vuetify.theme.themes.dark.list_bg
                this.container_bg = this.$vuetify.theme.themes.dark.container_bg
                this.card_bg = this.$vuetify.theme.themes.dark.card_bg
                this.card_title_bg = this.$vuetify.theme.themes.dark.card_title_bg
                this.$localStore.set('theme', 'dark')
            } else {
                this.themeType = 'Light'
                this.primary = this.$vuetify.theme.themes.light.primary
                this.secondary = this.$vuetify.theme.themes.light.secondary
                this.third = this.$vuetify.theme.themes.light.third
                this.accent = this.$vuetify.theme.themes.light.accent
                this.error = this.$vuetify.theme.themes.light.error
                this.success = this.$vuetify.theme.themes.light.success
                this.warning = this.$vuetify.theme.themes.light.warning
                this.app_bar_title = this.$vuetify.theme.themes.light.app_bar_title
                this.nav_title = this.$vuetify.theme.themes.light.nav_title
                this.menu_title = this.$vuetify.theme.themes.light.menu_title
                this.list_title = this.$vuetify.theme.themes.light.list_title
                this.card_title = this.$vuetify.theme.themes.light.card_title
                this.sub_title = this.$vuetify.theme.themes.light.sub_title
                this.content = this.$vuetify.theme.themes.light.content
                this.app_bar_bg = this.$vuetify.theme.themes.light.app_bar_bg
                this.nav_bg = this.$vuetify.theme.themes.light.nav_bg
                this.menu_bg = this.$vuetify.theme.themes.light.menu_bg
                this.list_bg = this.$vuetify.theme.themes.light.list_bg
                this.container_bg = this.$vuetify.theme.themes.light.container_bg
                this.card_bg = this.$vuetify.theme.themes.light.card_bg
                this.card_title_bg = this.$vuetify.theme.themes.light.card_title_bg
                this.$localStore.set('theme', 'light')
            }
        }
    }
}
</script>