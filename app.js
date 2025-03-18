window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');
    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;
        tab_switcher.addEventListener('click', () => {
            switchPage(page_id);
        });
    }
};

function switchPage(page_id) {
    const current_page = document.querySelector(".main .page.activepage");
    current_page.classList.remove("activepage");

    const next_page = document.querySelector(`.main .page[data-page="${page_id}"]`);
    next_page.classList.add("activepage");
}
// pagelar Almashis end



// fairbase start

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCaoaQTbO9iQJuFHSUwQXVWTsfLhf3D1ec",
    authDomain: "alisher-5124b.firebaseapp.com",
    projectId: "alisher-5124b",
    storageBucket: "alisher-5124b.firebasestorage.app",
    messagingSenderId: "594164422074",
    appId: "1:594164422074:web:97c3c3875e6fdce38e7983",
    measurementId: "G-43094QNR57"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const facebookButton = document.querySelector(".facebook_btn");
const alertMessage = $('.msg');
const alertMessage1 = $('.msg1');

// signOutButton.style.display = "none";

const showAlert = (message) => {
    alertMessage.text(message);
    $('.alort').removeClass("hide").addClass("show");
    setTimeout(() => {
        $('.alort').addClass("hide").removeClass("show");
    }, 5000);
};

const showAlert1 = (message) => {
    alertMessage1.text(message);
    $('.alort1').removeClass("hide1").addClass("show1");
    setTimeout(() => {
        $('.alort1').addClass("hide1").removeClass("show1");
    }, 5000);
};

// const userSignInWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(auth, googleProvider);
//         console.log(result.user);
//         showAlert("Saytga kirdingiz!!");
//     } catch (error) {
//         console.error(error);
//         showAlert1("Iltimos Xatoni To'g'irlang.");
//         console.log(showAlert);

//     }
// };


const userSignInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        console.log(user);

        const userImage = user.photoURL;

        console.log('User Image:', userImage);

        localStorage.setItem('photoURL', userImage);

        const imageElement = document.getElementById('profil_img1');
        if (imageElement) {
            imageElement.src = userImage;  
        }

        showAlert("Saytga kirdingiz!!");


        let delete_img = document.querySelector(".profil_btn2");
        delete_img.addEventListener("click", ()=>{
            imageElement.src = "";  
            localStorage.removeItem('photoURL');
        
        })

    } catch (error) {
        console.error(error);
        showAlert1("Iltimos Xatoni To'g'irlang.");
    }
};






const userSignInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        console.log(result.user);
        showAlert("Saytga Facebook orqali kirdingiz!");
    } catch (error) {
        console.error(error);
        showAlert1("Iltimos Xatoni To'g'irlang.");
    }
};

const userSignOut = async () => {
    try {
        await signOut(auth);
        showAlert("Siz Saytdan chiqdingiz!");
    } catch (error) {
        console.error(error);
    }
};

const userSignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        showAlert("Kirish muvaffaqiyatli!");
    } catch (error) {
        console.error(error);
        showAlert1("Iltimos Xatoni To'g'irlang.");
    }
};

const userSignUp = async (name, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        showAlert("Ro'yhatdan o'tish muvaffaqiyatli!");
    } catch (error) {
        console.error(error);
        showAlert1("Iltimos Xatoni To'g'irlang.");
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        signOutButton.style.display = "block";
    } else {
        signOutButton.style.display = "none";
        imageElement.src = "./imge/juli1.png"; 

    }
});

document.getElementById("loginForm").addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    userSignIn(email, password);
});

document.getElementById("signupForm").addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    userSignUp(name, email, password);
});

signInButton.addEventListener('click', userSignInWithGoogle);
facebookButton.addEventListener('click', userSignInWithFacebook);
signOutButton.addEventListener('click', userSignOut);
// fairbase end

//Alert staet
$('.show_alort').click(function () {
    $('.alort').removeClass("hide").addClass("show");
    setTimeout(function () {
        $('.alort').addClass("hide").removeClass("show");
    }, 5000);
});

$('.close-btn').click(function () {
    $('.alort').addClass("hide").removeClass("show");
});
$('.show_alort1').click(function () {
    $('.alort1').removeClass("hide1").addClass("show1");
    setTimeout(function () {
        $('.alort1').addClass("hide1").removeClass("show1");
    }, 5000);
});

$('.close-btn1').click(function () {
    $('.alort1').addClass("hide1").removeClass("show1");
});
// Alert end

// Forget passwort Start
const reset = document.getElementById("reset")
reset.addEventListener("click", function (event) {
    event.preventDefault()

    const loginEmail = document.getElementById("loginEmail").value;

    sendPasswordResetEmail(auth, loginEmail)
        .then(() => {
            showAlert("Emaillingizga yuborildi");
        })
        .catch((error) => {
            showAlert1("Iltimos Xatoni To'g'irlang.");
        });
})
// Forget passwort end

let saveBtn = document.querySelector(".profil_nav_btn1")

saveBtn.addEventListener( "click", ()=> {
    showAlert("Sizning malumotingiz saqlandi");

})



// catigores

let category_objects = document.querySelector(".catigory-objects")

let catigoryOb = [
    {
        img: "./imge/catigore1.png",
        name: "Seafood"
    },
    {
        img: "./imge/catigore2.png",
        name: "Soup"
    },
    {
        img: "./imge/catigore3.png",
        name: "Pancakes"
    },
    {
        img: "./imge/catigore4.png",
        name: "Meat"
    },
    {
        img: "./imge/catigore5.png",
        name: "Chicken"
    },
    {
        img: "./imge/catigore6.png",
        name: "Less than 30 min"
    },
    {
        img: "./imge/catigore6.png",
        name: "Pasta"
    },
    {
        img: "./imge/catigore8.png",
        name: "Pizza"
    },
    {
        img: "./imge/catigore9.png",
        name: "Cake"
    },
    {
        img: "./imge/catigore10.png",
        name: "Pastries"
    },
    {
        img: "./imge/catigor11.png",
        name: "Burger"
    },
    {
        img: "./imge/catigore12.png",
        name: "Vegan"
    },
    {
        img: "./imge/catigore13.png",
        name: "Desserts"
    },
    {
        img: "./imge/catigore14.png",
        name: "Smoothies"
    },
    {
        img: "./imge/catigore15.png",
        name: "Breakfast"
    },
    {
        img: "./imge/catigore16.png",
        name: "Salad"
    },
    {
        img: "./imge/catigore17.png",
        name: "Sandwiches"
    },
    {
        img: "./imge/catigore18.png",
        name: "Waffles"
    },
    {
        img: "./imge/catigore19.png",
        name: "Ramen"
    },
    {
        img: "./imge/catigore20.png",
        name: "Dips"
    }
]

catigoryOb.forEach((object) => {
    let object1 = document.createElement("div")

    object1.innerHTML = `<div class="catigory_obj">
        <img src="${object.img}" alt="nanay">
        <p>${object.name}</p>
    </div>`
    category_objects.appendChild(object1);

});



let super_object = document.querySelector(".super_object")

let superOb = [

    {
        img: "./imge/image.png",
        icon: "fa-solid fa-star",
        icon1: "fa-solid fa-star",
        icon2: "fa-solid fa-star",
        icon3: "fa-solid fa-star",
        icon4: "fa-solid fa-star",
        name: "Spinach and Cheese Pasta"
    }, {
        img: "./imge/imag.png",
        icon: "fa-solid fa-star",
        icon1: "fa-solid fa-star",
        icon2: "fa-solid fa-star",
        icon3: "fa-solid fa-star",
        icon4: "fa-solid fa-star",
        name: "Fancy Glazed Donuts"
    }, {
        img: "./imge/ima.png",
        icon: "fa-solid fa-star",
        icon1: "fa-solid fa-star",
        icon2: "fa-solid fa-star",
        icon3: "fa-solid fa-star",
        icon4: "fa-solid fa-star",
        name: "Mighty Cheesy Breakfast Burger"
    }

]

superOb.forEach((object) => {
    let object11 = document.createElement("div")

    object11.innerHTML = `<div class="super_obj">
        <img src="${object.img}" alt="nanay">
        <i class="${object.icon}"></i>
         <i class="${object.icon1}"></i>
          <i class="${object.icon2}"></i>
           <i class="${object.icon3}"></i>
                      <i class="${object.icon4}"></i>

        <p>${object.name}</p>
    </div>`
    super_object.appendChild(object11);
 

});



let sweet_object = document.querySelector(".sweet_object")

let sweetOb = [

    {
        img: "./imge/sweet1.png",
        icon: "fa-solid fa-star",
        icon1: "fa-solid fa-star",
        icon2: "fa-solid fa-star",
        icon3: "fa-solid fa-star",
        icon4: "fa-solid fa-star",
        name: "Caramel Strawberry Milkshake"
    }, {
        img: "./imge/sweet2.png",
        icon: "fa-solid fa-star",
        icon1: "fa-solid fa-star",
        icon2: "fa-solid fa-star",
        icon3: "fa-solid fa-star",
        icon4: "fa-solid fa-star",
        name: "Chocolate and Banana Jar Cake"
    }, {
        img: "./imge/sweet3.png",
        icon: "fa-solid fa-star",
        icon1: "fa-solid fa-star",
        icon2: "fa-solid fa-star",
        icon3: "fa-solid fa-star",
        icon4: "fa-solid fa-star",
        name: "Berry Maddness Biscuts"
    }

]

sweetOb.forEach((object) => {
    let object12 = document.createElement("div")

    object12.innerHTML = `<div class="sweet_obj">
        <img src="${object.img}" alt="nanay">
        <i class="${object.icon}"></i>
         <i class="${object.icon1}"></i>
          <i class="${object.icon2}"></i>
           <i class="${object.icon3}"></i>
                      <i class="${object.icon4}"></i>

        <p>${object.name}</p>
    </div>`
    sweet_object.appendChild(object12);
  
});




let popular_object = document.querySelector(".popular_object")

let popularOb = [

    {
        img: "./imge/catigore7.png",
        img1: "./imge/catigore10.png",
        img2: "./imge/catigore12.png",
        img3: "./imge/catigore13.png",
        img4: "./imge/catigore14.png",
        img5: "./imge/catigore15.png"
    }

]

popularOb.forEach((object) => {
    let object13 = document.createElement("div")

    object13.innerHTML = `<div class="popular_obj">
        <img src="${object.img}" alt="nanay">
          <img src="${object.img1}" alt="nanay">
            <img src="${object.img2}" alt="nanay">
              <img src="${object.img3}" alt="nanay">
                <img src="${object.img4}" alt="nanay">
                  <img src="${object.img5}" alt="nanay">
     
    </div>`
    popular_object.appendChild(object13);
   

});

const input = document.getElementById("submit");
const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", xabarbot);
function xabarbot() {
    const chat_token = '7686093249:AAHrIA99271I4_uFTUk-yuehmREMjWcUqsQ';
    const chat_id = '5900769240';
    const xabar = `<i>${input.value}</i>`;
    fetch(`https://api.telegram.org/bot${chat_token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(xabar)}&parse_mode=HTML`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAlert("Telefram botga habar yuborildi!");
        })


}

const bars = document.getElementById("bars");
const menu = document.querySelector(".menu");
const cancel = document.getElementById("yoq");
const search1 = document.getElementById("search")
bars.addEventListener("click", () => {
    menu.classList.add("open");
    menu.classList.remove("close");
    bars.style.display = "none";
    cancel.style.display = "block";
    search1.style.display ="none";
});

cancel.addEventListener("click", () => {
    menu.classList.add("close");
    menu.classList.remove("open");
    cancel.style.display = "none";
    bars.style.display = "block";
    search1.style.display ="block";
});



let hand_picked_object = document.querySelector(".hand_picked_object");

let handPickedCollections = [
    {
        img: "./imge/hand1.png",
        name: "Sushi Combos for your Next Party",
        recipes: "158 Recipes"
    },
    {
        img: "./imge/hand2.png",
        name: "Everything Bagel",
        recipes: "158 Recipes"
    },
    {
        img: "./imge/hand3.png",
        name: "Cook Like a Chef",
        recipes: "158 Recipes"
    },
    {
        img: "./imge/hand4.png",
        name: "Exquisite Dinner Recipe Ideas",
        recipes: "158 Recipes"
    },
    {
        img: "./imge/hand5.png",
        name: "The Ultimate Cookie Frenzy",
        recipes: "158 Recipes"
    },
    {
        img: "./imge/hand6.png",
        name: "For the Love of Donuts",
        recipes: "158 Recipes"
    },

];

handPickedCollections.forEach((collection) => {
    let collectionItem = document.createElement("div");

    collectionItem.innerHTML = `
        <div class="hand_picked_item">
            <img src="${collection.img}" alt="${collection.name}">
            <div class="boton_card">
            <p class="collection_name">${collection.name}</p>
            <button class="recipe_count">${collection.recipes}</button>
            </div>
        </div>`
        ;
    hand_picked_object.appendChild(collectionItem);
   
});







let latest_recipes_object = document.querySelector(".latest_recipes_object")

let latestOb = [
    {
        img: "./imge/latest1.png",
        name: "Caramel Strawberry Milkshake"
    },
    {
        img: "./imge/latest2.png",
        name: "Cashew Vegan Rice"
    },
    {
        img: "./imge/latest3.png",
        name: "Smoked Salmon Salad Sandwich"
    },
    {
        img: "./imge/latest4.png",
        name: "Salmon in Creamy Sun Dried Tomato Sauce"
    },
    {
        img: "./imge/latest5.png",
        name: "Healthy Jam Waffle Breakfast"
    },
    {
        img: "./imge/latest6.png",
        name: "Less than 30 min"
    },
    {
        img: "./imge/latest7.png",
        name: "Chocolate and Banana Jar Cake"
    },
    {
        img: "./imge/latest8.png",
        name: "Caramel Blueberry Scones"
    },
    {
        img: "./imge/latest9.png",
        name: "Vegan Cauliflower Salad"
    },
    {
        img: "./imge/latest10.png",
        name: "Roasted Red Pepper Soup"
    },
    {
        img: "./imge/latest11.png",
        name: "Eggs and Avocado Toast"
    },
    {
        img: "./imge/latest12.png",
        name: "Pork Shoulder Cashew Noodles"
    },
    {
        img: "./imge/latest13.png",
        name: "Toasted Farfalle In Pesto Sauce"
    },
    {
        img: "./imge/latest14.png",
        name: "Cheesy Bacon Burger Sliders"
    },
    {
        img: "./imge/latest15.png",
        name: "Fig and Raisins Oatmeal"
    },
    {
        img: "./imge/latest16.png",
        name: "Silky Smooth Panacotta"
    },
    {
        img: "./imge/latest17.png",
        name: "Triple Decker Cranberry Cake"
    },
    {
        img: "./imge/latest18.png",
        name: "Very Berry Healthy Summer Smoothie"
    },
    {
        img: "./imge/latest19.png",
        name: "Crispy Orange Chips"
    },
    {
        img: "./imge/latest20.png",
        name: "Tumeric Lavendar Tea"
    },
    {
        img: "./imge/latest21.png",
        name: "Blue Velvet Brownies"
    },
    {
        img: "./imge/latest22.png",
        name: "Birthday Cupcakes"
    },
    {
        img: "./imge/latest23.png",
        name: "Gourmet Fillet in Roasted Almond Sauce"
    },
    {
        img: "./imge/latest24.png",
        name: "Four Ingredient Oatmeal Pancakes"
    },
    {
        img: "./imge/latest21.png",
        name: "Blue Velvet Brownies"
    },
    {
        img: "./imge/latest22.png",
        name: "Birthday Cupcakes"
    },
    {
        img: "./imge/latest23.png",
        name: "Gourmet Fillet in Roasted Almond Sauce"
    },
    {
        img: "./imge/latest24.png",
        name: "Four Ingredient Oatmeal Pancakes"
    }
]

   let visibleItems = 20;

    function renderItems() {
        latest_recipes_object.innerHTML = ""; 
        latestOb.slice(0, visibleItems).forEach((object) => {
            let object14 = document.createElement("div");
            object14.innerHTML = `
                <div class="latest_obj">
                    <img src="${object.img}" alt="nanay">
                    <p>${object.name}</p>
                </div>`;
            latest_recipes_object.appendChild(object14);
        });
    }


    renderItems();
    let favarites_btn = document.querySelector(".favarites_btn");

    favarites_btn.addEventListener("click", () =>{
        visibleItems = latestOb.length; 
        renderItems();
        showMoreBtn.style.display = "none"; 
       
    })








// search
let search_object = document.querySelector(".search_object")

let searchOb1 = [
    {
        img: "./imge/search1.png",
        name: "Decadent Raspberry and Cream Cake "
    },
    {
        img: "./imge/search2.png",
        name: "Tripple Chocolate Mousse Cake "
    },
    {
        img: "./imge/search3.png",
        name: "Cranberry Curd Layered Sponge Cake"
    },
    {
        img: "./imge/search4.png",
        name: "Orange and Lemon Curd Tartlets"
    },
    {
        img: "./imge/search5.png",
        name: "Creamt Chocolate Nutella Fudge Cake"
    },
    {
        img: "./imge/search6.png",
        name: "Homemade Mixed Berries Wedding Cake"
    },
    {
        img: "./imge/search7.png",
        name: "Black Forest Birthday Cake"
    },
    {
        img: "./imge/search8.png",
        name: "Double Thick Layered Sponge Cake"
    },
    {
        img: "./imge/search9.png",
        name: "Lemon Cake with Chocolate Ganache"
    },
    {
        img: "./imge/search10.png",
        name: "Cranberry Macaroon Ice Cream Cake  "
    },
    {
        img: "./imge/search11.png",
        name: "No Bake Cheesecake"
    },
    {
        img: "./imge/search12.png",
        name: "Almond Cinnamon Sponge Cake"
    },
    {
        img: "./imge/search13.png",
        name: "Mixed Candy Cake"
    },
    {
        img: "./imge/search14.png",
        name: "Cherry Ice Cream Cake"
    },
    {
        img: "./imge/search15.png",
        name: "Four Layer Coffee Cake"
    },
    {
        img: "./imge/search16.png",
        name: "Oreo Brownie Ice Cream Cake"
    },
    {
        img: "./imge/search17.png",
        name: "Caramel Glaze Cake"
    },
    {
        img: "./imge/search18.png",
        name: "No Bake Cinnamon Cheesecake"
    },
    {
        img: "./imge/search19.png",
        name: "Apple Cinnamon Bundt Cake"
    },
    {
        img: "./imge/search20.png",
        name: "Rainbow Explosion Birthday Cake"
    },
    {
        img: "./imge/search21.png",
        name: "Chocolate Peanut Butter Mini Cupcakes"
    },
    {
        img: "./imge/search22.png",
        name: "M&M’s Chocolate Cake"
    },
    {
        img: "./imge/search23.png",
        name: "Strawberry Cream Cake Bites"
    },
    {
        img: "./imge/search24.png",
        name: "Tiramisu Cheescake"
    }

]

function displayItems(items) {
    search_object.innerHTML = '';

    items.forEach(item => {
        let object111 = document.createElement("div");

        object111.innerHTML = `
            <div class="search_obj">
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name}</p>
            </div>
        `;

        search_object.appendChild(object111);
    });

}

displayItems(searchOb1);

const searchIn = document.querySelector(".searchin");
searchIn.addEventListener("input", searchItems);

function searchItems() {
    const searchText = searchIn.value.toLowerCase();

    const filteredItems = searchOb1.filter(item => item.name.toLowerCase().includes(searchText));

    displayItems(filteredItems);
}


let catigory_objects1 = document.querySelector(".catigory_objects1");

let searchOb11 = [
    {
        img: "./imge/search1.png",
        name: "Decadent Raspberry and Cream Cake ",
        category: "Chocolate"
    },
    {
        img: "./imge/search2.png",
        name: "Tripple Chocolate Mousse Cake ",
        category: "Chocolate"
    },
    {
        img: "./imge/search3.png",
        name: "Cranberry Curd Layered Sponge Cake",
        category: "Keks"
    },
    {
        img: "./imge/search4.png",
        name: "Orange and Lemon Curd Tartlets",
        category: "Keks"
    },
    {
        img: "./imge/search5.png",
        name: "Creamt Chocolate Nutella Fudge Cake",
        category: "Chocolate"
    },
    {
        img: "./imge/search6.png",
        name: "Homemade Mixed Berries Wedding Cake",
        category: "Keks"
    },
    {
        img: "./imge/search7.png",
        name: "Black Forest Birthday Cake",
        category: "Chocolate"
    },
    {
        img: "./imge/search8.png",
        name: "Double Thick Layered Sponge Cake",
        category: "Chocolate"
    },
    {
        img: "./imge/search9.png",
        name: "Lemon Cake with Chocolate Ganache",
        category: "Chocolate"
    },
    {
        img: "./imge/search10.png",
        name: "Cranberry Macaroon Ice Cream Cake ",
        category: "Keks"
    },
    {
        img: "./imge/search11.png",
        name: "No Bake Cheesecake",
        category: "Keks"
    },
    {
        img: "./imge/search12.png",
        name: "Almond Cinnamon Sponge Cake",
        category: "Keks"
    },
    {
        img: "./imge/search13.png",
        name: "Mixed Candy Cake",
        category: "Keks"
    },
    {
        img: "./imge/search14.png",
        name: "Cherry Ice Cream Cake",
        category: "Keks"
    },
    {
        img: "./imge/search15.png",
        name: "Four Layer Coffee Cake",
        category: "Keks"
    },
    {
        img: "./imge/search16.png",
        name: "Oreo Brownie Ice Cream Cake",
        category: "Chocolate"
    },
    {
        img: "./imge/search17.png",
        name: "Caramel Glaze Cake",
        category: "Chocolate"
    },
    {
        img: "./imge/search18.png",
        name: "No Bake Cinnamon Cheesecake",
        category: "Keks"
    },
    {
        img: "./imge/search19.png",
        name: "Apple Cinnamon Bundt Cake",
        category: "Keks"
    },
    {
        img: "./imge/search20.png",
        name: "Rainbow Explosion Birthday Cake",
        category: "Cake"
    },
    {
        img: "./imge/search21.png",
        name: "Chocolate Peanut Butter Mini Cupcakes",
        category: "Chocolate"
    },
    {
        img: "./imge/search22.png",
        name: "M&M’s Chocolate Cake",
        category: "Chocolate"
    },
    {
        img: "./imge/search23.png",
        name: "Strawberry Cream Cake Bites",
        category: "Cake"
    },
    {
        img: "./imge/search24.png",
        name: "Tiramisu Cheescake",
        category: "Keks"
    }
];

function displayItems1(items, category = "All") {
    catigory_objects1.innerHTML = '';

    let filteredItems = category === "All" ? items : items.filter(item => item.category === category);

    filteredItems.forEach((object) => {
        let objectDiv = document.createElement("div");
        objectDiv.classList.add("catigoriy_obj", "category", category);

        objectDiv.innerHTML = `
      <div class="catigoriy_obj">
        <img src="${object.img}" alt="nanay">
        <p class="catigoriy_obj_p">${object.name}</p>
      </div>
    `;

        catigory_objects1.appendChild(objectDiv);
    });


}

const catigoriy_sort = document.getElementById("catigoriy_sort");
catigoriy_sort.addEventListener("change", () => {
    let selectedOption = catigoriy_sort.value;
    displayItems1(searchOb11, selectedOption);
});


displayItems1(searchOb11, "All");

let search = document.getElementById('search')
let sid_search = document.querySelector(".sid_search")
let search_close = document.getElementById('search_close')
search.addEventListener('click', () => {
    sid_search.classList.add("sid_search_open")
    sid_search.classList.remove("sid_search_close")
})

search_close.addEventListener("click", () => {
    sid_search.classList.add("sid_search_close");
    sid_search.classList.remove("sid_search_open");

});




// caments

let caments_object = document.querySelector(".caments_object")

let camentsOb = [
    {
        img: "./imge/juli1.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "

    },
    {
        img: "./imge/juli2.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    },
    {
        img: "./imge/juli3.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    },
    {
        img: "./imge/juli4.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    },
    {
        img: "./imge/juli5.png",
       name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    }
] 

camentsOb.forEach((object) => {
    let objectcament = document.createElement("div")

    objectcament.innerHTML =
 `<div class="caments_obj">
    <div class="caments_pro">
      <div class="caments_pro1">
       <img src="${object.img}" alt="nanay">
      </div>

      <div class="caments_pro2">
       <h2>${object.name}</h2>
       <p>${object.name1}</p>
      </div>

      </div>
      <div class="caments_ppp">
      <p>${object.name2}</p>
      </div>
 </div>`
    caments_object.appendChild(objectcament);

});



let caments_object1 = document.querySelector(".caments_object1")
let loadMoreBtn = document.querySelector(".caments_btn1");
let camentsOb2 = [
    {
        img: "./imge/juli1.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "

    },
    {
        img: "./imge/juli2.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    },
    {
        img: "./imge/juli3.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    },
    {
        img: "./imge/juli4.png",
        name: "Jelanee Uwaezuoke",
        name1: "45min ago",
        name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    },
    // {
    //     img: "./imge/juli5.png",
    //    name: "Jelanee Uwaezuoke",
    //     name1: "45min ago",
    //     name2: "Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. "
    // }
] 

let visibleCount = 2;

function renderComments(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && i < camentsOb2.length; i++) {
        let object = camentsOb2[i];
        let objectcament = document.createElement("div");
        objectcament.innerHTML = `
            <div class="caments_obj">
                <div class="caments_pro">
                    <div class="caments_pro1">
                        <img src="${object.img}" alt="nanay">
                    </div>
                    <div class="caments_pro2">
                        <h2>${object.name}</h2>
                        <p>${object.name1}</p>
                    </div>
                </div>
                <div class="caments_ppp">
                    <p>${object.name2}</p>
                </div>
            </div>`;
        caments_object1.appendChild(objectcament);
    }
}

renderComments(0, visibleCount);

loadMoreBtn.addEventListener("click", () => {
    let newVisibleCount = visibleCount + 2;
    renderComments(visibleCount, newVisibleCount);
    visibleCount = newVisibleCount;

  
    
});




let latest_recipes_object1 = document.querySelector(".latest_recipes_object1")
let catigoriy_sort1 = document.getElementById("catigoriy_sort1");

let latestOb1 = [
    {
        id: "1",
        img: "./imge/latest1.png",
        name: "Caramel Strawberry Milkshake",
        category: "Keks",
    },
    {
        id: "2",
        img: "./imge/latest2.png",
        name: "Cashew Vegan Rice",
        category: "Chocolate",
    },
    {
        id: "3",
        img: "./imge/latest3.png",
        name: "Smoked Salmon",
        category: "Chocolate",
    },
    {
        id: "4",
        img: "./imge/latest4.png",
        name: "Salmon in Creamy Sun",
        category: "Chocolate",
    },
    {
        id: "5",
        img: "./imge/latest5.png",
        name: "Healthy Jam Waffle Breakfast",
        category: "Chocolate",
    },
    {
        id: "6",
        img: "./imge/latest6.png",
        name: "Less than 30 min",
        category: "Chocolate",
    },
    {
        id: "7",
        img: "./imge/latest7.png",
        name: "Chocolate and Banana Jar Cake",
        category: "Keks",
    },
    {
        id: "8",
        img: "./imge/latest8.png",
        name: "Caramel Blueberry Scones",
        category: "Keks"
    },
    {
        id: "9",
        img: "./imge/latest9.png",
        name: "Vegan Cauliflower Salad",
        category: "Chocolate",
    },
    {
        id: "10",
        img: "./imge/latest10.png",
        name: "Roasted Red Pepper Soup",
        category: "Chocolate",
    },
    {
        id: "11",
        img: "./imge/latest11.png",
        name: "Eggs and Avocado Toast",
        category: "Chocolate",
    },
    {
        id: "12",
        img: "./imge/latest12.png",
        name: "Pork Shoulder Cashew Noodles",
        category: "Chocolate",
    },
    {
        id: "13",
        img: "./imge/latest13.png",
        name: "Toasted Farfalle In Pesto Sauce",
        category: "Chocolate",
    },
    {
        id: "14",
        img: "./imge/latest14.png",
        name: "Cheesy Bacon Burger Sliders",
        category: "Chocolate",
    },
    {
        id: "15",
        img: "./imge/latest15.png",
        name: "Fig and Raisins Oatmeal",
        category: "Keks",
    },
    {
        id: "16",
        img: "./imge/latest16.png",
        name: "Silky Smooth Panacotta",
        category: "Keks",
    },
    {
        id: "17",
        img: "./imge/latest17.png",
        name: "Triple Decker Cranberry Cake",
        category: "Keks",

    },
    {
        id: "18",
        img: "./imge/latest18.png",
        name: "Very Berry Healthy Summer Smoothie",
        category: "Chocolate",
    },
    {
        id: "19",
        img: "./imge/latest19.png",
        name: "Crispy Orange Chips",
        category: "Keks",
    },
    {
        id: "20",
        img: "./imge/latest20.png",
        name: "Tumeric Lavendar Tea",
        category: "Chocolate",
    },
    {
        id: "21",
        img: "./imge/latest21.png",
        name: "Blue Velvet Brownies",
        category: "Chocolate",
    },
    {
        id: "22",
        img: "./imge/latest22.png",
        name: "Birthday Cupcakes",
         category: "Choolate",
    },
    {
        id: "23",
        img: "./imge/latest23.png",
        name: "Gourmet Fillet in Roasted Almond Sauce",
         category: "Chocolate",
    },
    {
        id: "24",
        img: "./imge/latest24.png",
        name: "Four Ingredient Oatmeal Pancakes",
         category: "Chocolate",
    }
]

function displayItems16(items, category) {

    latest_recipes_object1.innerHTML = "";
  
    let filteredItems = category === "All" 
      ? items 
      : items.filter(item => item.category === category);
  
    filteredItems.forEach((object) => {
      let object14 = document.createElement("div");
      object14.classList.add("latest_obj");
      object14.innerHTML = `
        <img src="${object.img}" alt="${object.name}" class="latest_obj_img">
        <p>${object.name}</p>
      `;
      latest_recipes_object1.appendChild(object14);
    });
  }
  

  catigoriy_sort1.addEventListener("change", () => {
    let selectedOption = catigoriy_sort1.value;
    displayItems16(latestOb1, selectedOption);
  });
  
  displayItems16(latestOb1, "All");

let delete1 = document.getElementById("delete1");
let checkbox1 = document.getElementById("checkbox1");

delete1.addEventListener('click', () => {
    latest_recipes_object1.style.display = "none";
});

checkbox1.addEventListener('click', () => {
    latest_recipes_object1.style.display = "grid";
});



let about_object = document.querySelector(".about_object")

let aboutOb = [
    {
        img: "./imge/about1.png",
        name: "Ham Chuwon"
    },
    {
        img: "./imge/about2.png",
        name: "Izabella Tabakova"
    },
    {
        img: "./imge/about3.png",
        name: "Fatima Delgadillo"
    },
    {
        img: "./imge/about4.png",
        name: "Harrison Phillips"
    },
    {
        img: "./imge/about5.png",
        name: "Harrison Phillips"
    },
    {
        img: "./imge/about6.png",
        name: "Pablo Cambeiro"
    },
    {
        img: "./imge/about8.png",
        name: "Nonkosi Joyi"
    },
    {
        img: "./imge/about9.png",
        name: "Wen Yahui"
    },
    {
        img: "./imge/about10.png",
        name: "Jurrien Oldhof"
    },
    {
        img: "./imge/about11.png",
        name: "Tallah Cotton"
    },
    {
        img: "./imge/about12.png",
        name: "Qin Shi"
    },
    {
        img: "./imge/about13.png",
        name: "Su Hua"
    }
]

aboutOb.forEach((object) => {
    let object20 = document.createElement("div")

    object20.innerHTML = `<div class="latest_obj">
        <img src="${object.img}" alt="nanay">
        <p class="about_obj_p">${object.name}</p>
    </div>`
    about_object.appendChild(object20);
});





let blog_checbox = document.querySelectorAll(".blog_checbox");

blog_checbox.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    
    let taskText = checkbox.nextElementSibling;
    if (taskText) {
      taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
    }
  });
});




let favarites_btn11 = document.querySelector(".favarites_btn11");
let favarites_btn2 = document.querySelector(".favarites_btn2");
let favarites_btn3 = document.querySelector(".favarites_btn3");


favarites_btn11.addEventListener("click", () =>{
    showAlert("gvfgbhgff")
    
 })

 favarites_btn2.addEventListener("click", () =>{
    showAlert("gvfgbhgff")
    
 })

 favarites_btn3.addEventListener("click", () =>{
    showAlert("gvfgbhgff")
    
 })





 document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('profil_img1').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  