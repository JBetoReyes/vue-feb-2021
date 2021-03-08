app.component("badge", {
    template: /* vue-html */`
        <span class="badge" :class="badgeType">{{ badgeType.charAt(0).toUpperCase() + badgeType.substr(1) }}</span>
    `,
    props: {
        badgeType: {
            type: String,
            required: true
        }
    }
});