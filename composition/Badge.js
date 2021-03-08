app.component('badge', {
    template: /* vue-html*/ `
        <span 
            class="badge"
            :class="badgeType" 
            :style="{
                marginLeft: '10px'
            }">
            {{badgeType.charAt(0).toUpperCase() + badgeType.substr(1)}}
        </span>
    `,
    props: {
        badgeType: {
            type: String,
            required: true,
            default: ''
        }
    }
});