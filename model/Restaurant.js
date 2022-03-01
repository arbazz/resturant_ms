const mongoose = require('../db/db');

let RestaurantSchema = new mongoose.Schema({
    restaurantName: String,
    url: String,
    description: String,
    cuisineServed: String,
    contact: String,
    directions: String,
    typeOfFood: String,
    pricing: String,
    type: String,
    ambienceImg: [String],
    image: {
        imageName: Array,
        imageUrl: Array
    },
    rating: Number,  // out of 5
    price_range: String,  // with $
    dinner_price: String,  // with $
    contact_details: {
        number: Number,   // add country code
        address: String,
        Website: String
    },
    parking_details: {
        availability: String,   // available / unavailable
        available_type: String   // Street / Paid / Blank
    },
    owner: String,
    culinary_team: {
        executive_chef: String,
        pastry_chef: String,
        head_chef: String
    },
    cuisine_details: {
        type_of_cuisine: {
            cuisine_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cuisine',
                required: true
            },
            type: Array
        },
        signature_dishes: {
            availability: String,
            available_type: Array,
        },
        vegetarian_options: {
            availability: String,
            available_type: Array
        },
        alcohol_served: {
            availability: String,
            bottle_limit: {
                availability: String,
                quantity: Number
            }
        }
    },
    corkage: {
        availability: String,
        quantity: Number
    },
    meals_served: {
        type: Array
    },
    take_out: String,
    delivery: String,
    payment_options: String,
    reservations: {
        availability: String,
        available_type: Number
    },
    accommodations_for_children: String,
    dining_style: String,
    disabled_access: {
        restaurant: String,
        bathroom: String
    },
    restaurant_size: String,
    accommodate_groups: String,
    private_dining_room: String,
    outdoor_dining: String,

    entertainment: {
        availability: String,
        available_type: Number
    },
    restaurant_hours: {
        monday: {
            Open: String,
            timings: Array
        },
        tuesday: {
            Open: String,
            timings: Array
        },
        wednesday: {
            Open: String,
            timings: Array
        },
        thursday: {
            Open: String,
            timings: Array
        },
        friday: {
            Open: String,
            timings: Array
        },
        saturday: {
            Open: String,
            timings: Array
        },
        sunday: {
            Open: String,
            timings: Array
        },
    },
    dishes: [{
        restaurantDishName: String,
        dishName: String,
        dishId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        dishImgId: String,
        dishImg: String,
        price: String,
        dishDescription: String,
    }],
    health_measures: String,
    miscellaneous: String,
    slug: String
})

module.exports = mongoose.model("restaurantdatas", RestaurantSchema)