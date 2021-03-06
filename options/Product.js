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
            <span class="badge new" v-if="product.new">New</span>
            <span class="badge offer" v-if="product.offer">Offer</span>
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
            <button :disabled="product.stock === 0" @click="addToCart($event)">Add to Cart</button>
        </section>
    `,
    data() {
        return {
            product: {
                name: 'Camera',
                price: 450_000,
                stock: 6,
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
                    reiciendis quis optio molestiae culpa ex aut nemo eaque inventore?`,
                images: [{
                    image: "./images/camara.jpg",
                    thumbnail: "./images/camara-thumb.jpg"
                }, {
                    image: "./images/camara-2.jpg",
                    thumbnail: "./images/camara-2-thumb.jpg"
                }],
                new: false,
                offer: true,
                quantity: 1
            },
            activeImage: 0,
            discountCodes: ["PLATZI20", "IOSAMUEL"]
        }
    },
    methods: {
        applyDiscounts() {
            const discountIndex = discountsCodes.value.indexOf(event.target.value);
            if (discountIndex >= 0) {
                productState.product.price *= 50 / 100;
                discountsCodes.value.splice(discountIndex, 1);
            }
        },
        addToCart() {
            const productIndex = cartState.cart.findIndex(prod => prod.name === productState.product.name);
            if (productIndex >= 0) {
                cartState.cart[productIndex].quantity += 1
            } else {
                cartState.cart.push(productState.product);
            }
            productState.product.stock -= 1;
        }
    }
});