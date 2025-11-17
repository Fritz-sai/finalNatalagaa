<?php
/**
 * Shop Page - Product Display and Search
 * 
 * This page displays all available products in the shop with their details,
 * reviews, ratings, and allows users to search for specific products.
 */

// Include required PHP files for helper functions, admin functions, and database connection
require_once __DIR__ . '/php/helpers.php';
require_once __DIR__ . '/php/admin_functions.php';
require_once __DIR__ . '/php/db_connect.php';

// Get search query from GET parameter (from URL search form submission)
// This allows users to search products by name or description
// trim() removes whitespace from beginning and end of the search string
$searchQuery = isset($_GET['search']) ? trim($_GET['search']) : '';

// Fetch products from database using getProducts() function
// If search query exists, it will filter products; otherwise returns all products
$products = getProducts($conn, $searchQuery);

// Loop through each product to fetch additional information (reviews and ratings)
// Using &$product to modify the original array by reference
foreach ($products as &$product) {
    // Prepare SQL query to fetch the 5 most recent reviews for this product
    // JOIN with users table to get the reviewer's name
    // Ordered by creation date (newest first) and limited to 5 reviews
    $stmt = $conn->prepare('
        SELECT r.*, u.name as user_name 
        FROM reviews r 
        JOIN users u ON u.id = r.user_id 
        WHERE r.product_id = ? 
        ORDER BY r.created_at DESC 
        LIMIT 5
    ');
    // Bind the product ID as an integer parameter (prevents SQL injection)
    $stmt->bind_param('i', $product['id']);
    // Execute the prepared statement
    $stmt->execute();
    // Get the result set from the executed query
    $result = $stmt->get_result();
    // Fetch all reviews as associative array and add to product data
    // If no reviews found, set as empty array
    $product['reviews'] = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
    // Close the prepared statement to free up resources
    $stmt->close();
    
    // Calculate average rating and total review count for this product
    // AVG() calculates the average of all ratings, COUNT() counts total reviews
    $avgStmt = $conn->prepare('SELECT AVG(rating) as avg_rating, COUNT(*) as review_count FROM reviews WHERE product_id = ?');
    // Bind product ID as integer parameter
    $avgStmt->bind_param('i', $product['id']);
    // Execute the query
    $avgStmt->execute();
    // Get the result (single row with avg_rating and review_count)
    $avgResult = $avgStmt->get_result();
    // Fetch the row as associative array
    $avgData = $avgResult->fetch_assoc();
    // Calculate average rating: round to 1 decimal place, or 0 if no reviews
    $product['avg_rating'] = $avgData ? round((float)$avgData['avg_rating'], 1) : 0;
    // Get total review count as integer, or 0 if no reviews
    $product['review_count'] = $avgData ? (int)$avgData['review_count'] : 0;
    // Close the prepared statement
    $avgStmt->close();
}
// Unset the reference variable to prevent accidental modification
unset($product);

// Render the HTML head section with page title
renderHead('Shop Accessories | Reboot');

// Render the navigation bar/menu
renderNav();

// Display flash messages for cart operations (success/error messages)
// These messages are set in session when items are added to cart
renderFlashMessages([
    'cart_success' => 'success',  // Display success messages in green
    'cart_errors' => 'error'      // Display error messages in red
]);
?>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

/* --- Modern Black & Green Navbar --- */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 64px;
  background: #000; /* Solid black */
  backdrop-filter: blur(7px);
  z-index: 100;
  box-shadow: 0 2px 14px rgba(16,32,16,0.14);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  transition: background 0.2s;
  flex-wrap: nowrap;
}
.navbar .nav-logo {
  font-size: 1.4rem;
  font-weight: 800;
  color: #00ff6a;
  letter-spacing: -0.02em;
  text-decoration: none;
  margin-right: 1.2rem;
  white-space: nowrap;
  text-shadow: 0 0 8px #00ff6a99;
}
.navbar .nav-links {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.navbar .nav-links a {
  color: #eafbe6;
  font-size: .97rem;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 0.75rem;
  border-radius: 0.3rem;
  transition: background 0.17s, color 0.17s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 9em;
}
.navbar .nav-links a:hover,
.navbar .nav-links a.active {
  background: #00ff6a22;
  color: #09b95b;
}
.navbar .nav-actions {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  flex-shrink: 0;
}
.navbar .nav-actions a.btn-primary {
  background: #00ff6a;
  color: #111;
  border: none;
  font-weight: 600;
  padding: 6px 0.75rem;
  border-radius: 0.3rem;
  transition: background 0.17s, color 0.15s;
  white-space: nowrap;
  max-width: 9em;
  min-width: 0;
  font-size: .97rem;
  text-align: center;
  display: inline-block;
  margin: 0;
  vertical-align: middle;
}
.navbar .nav-actions a.btn-primary:hover {
  background: #09b95b;
  color: #fff;
}


/* ---- MODERN SHOP STYLES ---- */
body {
    background: #101313;
    color: #eafbe6;
    font-family: 'Inter', Arial, sans-serif;
    margin: 0;
    padding-top: 64px;
}
.page-header {
    background: linear-gradient(90deg, #101313 0%, #00ff6a 100%);
    color: #00ff6a;
    padding: 2rem 0 1rem 0;
    text-align: center;
    border-radius: 0 0 1.2rem 1.2rem;
    margin-bottom: 2rem;
    box-shadow: 0 7px 30px 0 #00ff6a22;
}
.page-header h1 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #00ff6a;
    margin-bottom: 0.32rem;
    text-shadow: 0 0 8px #00ff6a40;
}
.page-header p {
    font-size: 1.07rem;
    color: #b2ffcb;
}
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
}
.products-grid {
    display: grid;
    gap: 2.1rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    padding-bottom: 2.5rem;
}
.product-card {
    background: #181A1B;
    border-radius: 1.1rem;
    box-shadow: 0 8px 32px #09b95b15;
    padding: 1.6rem 1.2rem 1.5rem 1.2rem;
    transition: box-shadow 0.16s, transform 0.14s, border 0.19s;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1.5px solid #00ff6a20;
}
.product-card:hover {
    transform: translateY(-2px) scale(1.025);
    box-shadow: 0 12px 40px #00ff6a22;
    border-color: #00ff6a55;
}
.product-card img {
    max-width: 100%;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    background: #161c16;
    box-shadow: 0 8px 24px #09b95b60;
    aspect-ratio: 1/1;
    object-fit: cover;
}
.product-info h3 {
    margin: 0 0 0.40rem;
    font-size: 1.18rem;
    font-weight: 700;
    color: #00ff6a;
}
.product-info p {
    color: #c2f8e5;
    margin-bottom: 0.5rem;
    font-size: 1.02rem;
    line-height: 1.45;
}
.price {
    font-size: 1.13rem;
    color: #00ff6a;
    font-weight: 700;
    margin-bottom: 0.6rem;
    margin-top: 0.2rem;
    border-radius: 0.4rem;
    background: #00ff6a1a;
    padding: 0.07em 0.64em;
    display: inline-block;
    letter-spacing: 0.01em;
}
.cart-form {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-top: 0.7rem;
    flex-wrap: wrap;
}
.cart-form label {
    color: #b2ffcb;
    font-weight: 500;
    font-size: 0.97rem;
}
.cart-form input[type="number"] {
    width: 70px;
    border-radius: 0.65rem;
    border: 1.3px solid #00ff6a60;
    background: #101313;
    color: #eafbe6;
    font-size: 1.04rem;
    padding: 0.43rem;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.18s;
    outline: none;
}
.cart-form input[type="number"]:focus {
    border-color: #00ff6a;
    box-shadow: 0 0 0 1.5px #00ff6a45;
}

.btn-primary {
    background: #00ff6a;
    color: #0e1212;
    border: none;
    font-weight: 700;
    border-radius: 0.8rem;
    font-size: 1.07rem;
    padding: 0.68rem 1rem;
    transition: background 0.18s, color 0.14s, box-shadow 0.18s;
    box-shadow: 0 3px 12px #00ff6a21;
    cursor: pointer;
    letter-spacing: 0.02em;
}
.btn-primary:hover {
    background: #09b95b;
    color: #fff;
    box-shadow: 0 6px 20px #09b95b40;
}

@media (max-width: 900px) {
    .container { padding: 0 8px;}
    .page-header { border-radius: 0 0 0.7rem 0.7rem;}
    .product-card, .products-grid { border-radius: 0.8rem;}
    .products-grid { gap: 1.2rem;}
}
@media (max-width: 600px) {
    .products-grid { grid-template-columns: 1fr; }
    .container { padding: 0 3px; }
}

/* ---- SEARCH BAR STYLES ---- */
.search-container {
    max-width: 1100px;
    margin: 0 auto 2rem auto;
    padding: 0 1rem;
}
.search-form {
    display: flex;
    gap: 0.7rem;
    align-items: center;
    background: #181A1B;
    border-radius: 1rem;
    padding: 1rem 1.2rem;
    box-shadow: 0 8px 32px #09b95b15;
    border: 1.5px solid #00ff6a20;
}
.search-form:focus-within {
    border-color: #00ff6a55;
    box-shadow: 0 12px 40px #00ff6a22;
}
.search-input-wrapper {
    flex: 1;
    position: relative;
}
.search-input-wrapper input[type="text"] {
    width: 100%;
    border-radius: 0.65rem;
    border: 1.3px solid #00ff6a60;
    background: #101313;
    color: #eafbe6;
    font-size: 1.04rem;
    padding: 0.6rem 1rem 0.6rem 2.8rem;
    font-family: inherit;
    transition: border-color 0.15s, box-shadow 0.18s;
    outline: none;
}
.search-input-wrapper input[type="text"]:focus {
    border-color: #00ff6a;
    box-shadow: 0 0 0 1.5px #00ff6a45;
}
.search-input-wrapper::before {
    content: '🔍';
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
    pointer-events: none;
}
.search-form button {
    background: #00ff6a;
    color: #0e1212;
    border: none;
    font-weight: 700;
    border-radius: 0.8rem;
    font-size: 1.07rem;
    padding: 0.68rem 1.5rem;
    transition: background 0.18s, color 0.14s, box-shadow 0.18s;
    box-shadow: 0 3px 12px #00ff6a21;
    cursor: pointer;
    letter-spacing: 0.02em;
    white-space: nowrap;
}
.search-form button:hover {
    background: #09b95b;
    color: #fff;
    box-shadow: 0 6px 20px #09b95b40;
}
.search-results-info {
    text-align: center;
    color: #b2ffcb;
    font-size: 0.97rem;
    margin-top: 0.5rem;
    padding: 0 1rem;
}
</style>
<main class="page">
    <section class="page-header">
        <div class="container">
            <h1>Accessory Shop</h1>
            <p>Curated essentials to protect and power your devices.</p>
        </div>
    </section>

    <!-- Search Container: Allows users to search for products -->
    <div class="search-container">
        <!-- Search Form: Submits GET request with search parameter -->
        <form method="GET" action="shop.php" class="search-form">
            <!-- Search Input Wrapper: Contains the search input field with icon -->
            <div class="search-input-wrapper">
                <input 
                    type="text" 
                    name="search" 
                    placeholder="Search products by name or description..." 
                    value="<?php echo htmlspecialchars($searchQuery); ?>"  <!-- Display current search query, htmlspecialchars prevents XSS -->
                     <!-- Disable browser autocomplete for cleaner UX -->
                
            </div>
            <!-- Search Button: Submits the form to search products -->
            <button type="submit">Search</button>
            <?php if ($searchQuery): ?>
                <!-- Clear Button: Only shown when there's an active search query -->
                <!-- Clicking this removes the search parameter and shows all products -->
                <a href="shop.php" class="btn-primary" style="text-decoration: none; display: inline-block;">Clear</a>
            <?php endif; ?>
        </form>
        <?php if ($searchQuery): ?>
            <!-- Search Results Info: Displays number of products found for the search -->
            <p class="search-results-info">
                <?php echo count($products); ?> result<?php echo count($products) !== 1 ? 's' : ''; ?> found for "<?php echo htmlspecialchars($searchQuery); ?>"
                <!-- count() returns number of products in array -->
                <!-- Ternary operator adds 's' for plural (more than 1 result) -->
            </p>
        <?php endif; ?>
    </div>

    <!-- Products Grid Section: Displays all products in a responsive grid layout -->
    <section class="container products-grid">
        <?php if ($products): ?>
            <!-- Loop through each product in the products array -->
            <?php foreach ($products as $product): ?>
                <!-- Product Card: Individual product display container -->
                <article class="product-card">
                    <!-- Product Image: Display product image, with alt text for accessibility -->
                    <img src="<?php echo htmlspecialchars($product['image']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
                    
                    <!-- Product Info: Contains product details, rating, price, and add to cart form -->
                    <div class="product-info">
                        <!-- Product Name: Display product name (escaped to prevent XSS) -->
                        <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                        <!-- Product Description: Display product description -->
                        <p><?php echo htmlspecialchars($product['description']); ?></p>
                        
                        <!-- Rating Display: Show star rating and review count if reviews exist -->
                        <?php if ($product['review_count'] > 0): ?>
                            <div style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <!-- Star Rating: Display 5 stars, colored based on average rating -->
                                <div style="display: flex; gap: 0.125rem;">
                                    <?php 
                                    // Get the average rating for this product
                                    $avgRating = $product['avg_rating'];
                                    // Loop to display 5 stars
                                    for ($i = 1; $i <= 5; $i++): 
                                        // If current star index is less than or equal to average rating, color it green
                                        // Otherwise, color it gray (unfilled)
                                        $starColor = $i <= $avgRating ? '#00ff6a' : '#333d35';
                                    ?>
                                        <span style="color: <?php echo $starColor; ?>; font-size: 1.05rem; text-shadow:0 0 6px #00ff6a44;">⭐</span>
                                    <?php endfor; ?>
                                </div>
                                <!-- Rating Link: Clickable link to view all reviews for this product -->
                                <a href="reviews.php?product_id=<?php echo (int)$product['id']; ?>" style="font-size: 0.93rem; color: #00ff6a; font-weight:600; text-decoration: underline dotted; text-shadow:0px 0px 3px #00ff6a80;">
                                    <?php echo number_format($avgRating, 1); ?> (<?php echo $product['review_count']; ?> review<?php echo $product['review_count'] !== 1 ? 's' : ''; ?>)
                                    <!-- number_format() formats rating to 1 decimal place -->
                                    <!-- Ternary operator adds 's' for plural reviews -->
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <!-- Product Price: Display formatted price with 2 decimal places -->
                        <span class="price">₱<?php echo number_format((float) $product['price'], 2); ?></span>
                        
                        <!-- Add to Cart Form: Allows users to add product to shopping cart -->
                        <form action="php/handle_cart.php" method="POST" class="cart-form">
                            <!-- Hidden field: Indicates this is an "add" action to the cart handler -->
                            <input type="hidden" name="action" value="add">
                            <!-- Hidden field: Product ID to identify which product to add -->
                            <input type="hidden" name="product_id" value="<?php echo (int) $product['id']; ?>">
                            <!-- Quantity Label: Label for quantity input -->
                            <label for="qty-<?php echo (int) $product['id']; ?>">Qty</label>
                            <!-- Quantity Input: Number input for quantity (minimum 1) -->
                            <input id="qty-<?php echo (int) $product['id']; ?>" type="number" name="quantity" value="1" min="1">
                            <!-- Add to Cart Button: Submits form to add product to cart -->
                            <button type="submit" class="btn-primary">Add to Cart</button>
                        </form>
                    </div>
                </article>
            <?php endforeach; ?>
        <?php else: ?>
            <!-- No Products Message: Displayed when no products are found or available -->
            <p>No products available yet.</p>
        <?php endif; ?>
    </section>
</main>

<?php
// Render the footer section (includes footer HTML, chatbot, and closing body/html tags)
renderFooter();
?>