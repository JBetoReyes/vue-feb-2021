app.component("product", {
    template: /* vue-html */ `
        <section class="product">
            <div class="product__thumbnails">
                <div v-for="(image, index) in product.images" @click="activeImage = index" :key="image.thumbnail"
                    class="thumb" :class="{
                        active: activeImage === index
                    }" :style="{
                        backgroundImage: 'url(' + image.thumbnail + ')'
                    }">
                </div>
            </div>
            <div class="product__image">
                <img :src="product.images[activeImage].image" alt="">
            </div>
        </section>
        <section class="description">
            <h4>{{product.name}} {{ product.stock === 0 ? "😭" : "😃"}}</h4>
            <badge v-if="product.new" :badgeType="'new'" ></badge>
            <badge v-if="product.offer" :badgeType="'offer'" ></badge>
            <p class="description__status" v-if="product.stock === 3">Low availability!</p>
            <p class="description__status" v-else-if="product.stock === 2">Very Low availability!</p>
            <p class="description__status" v-else="product.stock === 1">One item in stock!</p>
            <p class="description__price">$ {{ new Intl.NumberFormat("es-CO").format(product.price)}}</p>
            <p class="description__content">
            </p>
            <div class="discount">
                <span>Codigo de Descuento</span>
                <input type="text" placeholder="Enter your code" @keyup.enter="applyDiscounts($event)">
            </div>
            <button :disabled="product.stock === 0" @click="sendToCart()">Add to Cart</button>
        </section>    
    `,
    props: {
        product: {
            type: Object,
            required: true
        },
        cart: {
            type: Array
        }
    },
    emits: ['sendtocart'],
    setup(props, context) {
    
        const discountCodes = ref(['PLATZI20', 'IOSAMUEL']);
        const productState = reactive({
            activeImage: 0
        });

        function applyDiscounts(event) {
            const discountIndex = discountCodes.value.indexOf(event.target.value);
            if (discountIndex >= 0) {
                props.product.price *= 50 / 100;
                discountCodes.value.splice(discountIndex, 1);
            }
        }

        function sendToCart() {
            context.emit('sendtocart', props.product);
        }

        return {
            ...toRefs(productState),
            
            sendToCart,
            applyDiscounts
        };
    }
});