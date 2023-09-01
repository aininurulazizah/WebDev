// Data Produk
const products = [
  { id: 1, name: "Blouse", price: 50000, image: "img/blouse.jpg" },
  { id: 2, name: "Skirt", price: 65000, image: "img/skirt.jpg" },
  { id: 3, name: "Loose Pants", price: 47000, image: "img/loose_pants.jpg" },
  { id: 4, name: "Dress", price: 250000, image: "img/dress.jpg"},
  { id: 5, name: "Overall", price: 180000, image: "img/overall.jpg"},
  { id: 6, name: "Turtle Neck", price: 45000, image: "img/turtle-neck.jpg"}
];

// Mendapatkan elemen berdasarkan id untuk list produk di HTML
const productList = document.getElementById("product-list");

// Loop melalui data produk dan tampilkan di HTML
for (const product of products) {
const listItem = document.createElement("div");
listItem.classList.add("product-list");
listItem.innerHTML = `
  <div class="product-card">
  <img class="content-image" src="${product.image}">
  <div class="product-name-label">${product.name}</div> 
  <div class="product-price-label">${product.price}</div>  
  <div class="quantity-container">
      <button class="quantity-button decrease" data-id="${product.id}">-</button>
      <input type="number" id="quantity-${product.id}" class="quantity-input" value="1" min="1">
      <button class="quantity-button increase" data-id="${product.id}">+</button>
  </div>
  <button class="add-to-cart-button" data-id="${product.id}">Tambahkan ke Keranjang</button>  
  </div>
`;
productList.appendChild(listItem);
}

// Mendapatkan elemen tombol "+" dan "-" serta input banyak produk
const quantityButtons = document.querySelectorAll(".quantity-button");
const quantityInputs = document.querySelectorAll(".quantity-input");

// Menambahkan event listener untuk tombol "+" dan "-" untuk mengatur banyak produk
quantityButtons.forEach(button => {
  button.addEventListener("click", function() {
      const productId = this.getAttribute("data-id");
      const inputElement = document.getElementById(`quantity-${productId}`);
      let quantity = parseInt(inputElement.value);

      if (this.classList.contains("increase")) {
          quantity++;
      } else if (this.classList.contains("decrease") && quantity > 1) {
          quantity--;
      }

      inputElement.value = quantity;
  });
});

// Mendapatkan elemen cart-container
const cartContainer = document.querySelector(".cart-container");

// Mendapatkan elemen tombol "Tambahkan ke Keranjang"
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

// Variabel-variabel untuk menghitung total pembayaran
let total = 0;
let pajak = 0;
let total_bayar = 0;

// Event listener untuk tombol "Tambahkan ke Keranjang"
addToCartButtons.forEach(button => {
  button.addEventListener("click", function() {
    const productId = this.getAttribute("data-id");
    const inputElement = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(inputElement.value);

    // Temukan produk yang sesuai dari array products
    const selectedProduct = products.find(product => product.id == productId);

    if (selectedProduct) {
      // Hitung Subtotal
      const subtotal = selectedProduct.price * quantity;

      // Buat elemen untuk menampilkan detail produk yang dipilih
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="grid-container-cart">
        <div class="cart-card cart cart-card-1">
          <img class="cart-image" src="${selectedProduct.image}">
        </div>
        <div class="cart-card cart-card-2">
        <div class="cart-details">
          <h3>${selectedProduct.name}</h3>
          <p>Rp. ${selectedProduct.price} x ${quantity}</p>
        </div>
        </div>
          <h3>Rp. ${subtotal}</h3>
        </div>
      `;
      // Tambahkan detail produk ke dalam cart-container
      cartContainer.appendChild(cartItem);
           
      // Menghitung subtotal produk, pajak, dan total pembayaran keseluruhan
      total += subtotal;
      pajak = (11/100) * total;
      total_bayar = total + pajak;
      
      // Perbarui total pembelian
      const cartTotal = document.querySelector(".cart-total");
      cartTotal.innerHTML = `
      <div class="grid-container-cart">
      <div class="cart-card cart-card-3">
      <div class="cart-details">
      <p>Total Pembelian</p>
      <p>Pajak 11%</p>
      <p>Total Pembayaran</p>
      </div>
      </div>
      <div class="cart-card cart-card-1">
      <div class="cart-details">
        <p>Rp. ${total}</p>
        <p>Rp. ${pajak}</p>
        <p>Rp. ${total_bayar}</p>
      </div>
      </div>
      `;
    }
  });
});
