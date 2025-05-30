// tests/api-tests.js
const fetch = require('node-fetch');

// Configuration
const BASE_URL = 'http://localhost:3000/api';
const TEST_USER_ID = 'test-user-123'; // Replace with a valid test user ID
const TEST_EMAIL = 'test@example.com';

// Test data
const testProduct = {
  name: 'Test Product',
  description: 'This is a test product',
  price: 19.99,
  category: 'test',
  image: 'https://via.placeholder.com/150',
  stock: 10
};

let testProductId;
let testOrderId;

// Helper function to log test results
function logResult(endpoint, method, success, response, error = null) {
  const status = success ? '✅ PASSED' : '❌ FAILED';
  console.log(`${status} - ${method} ${endpoint}`);
  
  if (success) {
    console.log(`  Response: ${JSON.stringify(response).substring(0, 100)}${JSON.stringify(response).length > 100 ? '...' : ''}`);
  } else {
    console.log(`  Error: ${error}`);
    if (response) {
      console.log(`  Response: ${JSON.stringify(response)}`);
    }
  }
  console.log('-----------------------------------');
}

// Enhanced fetch with better error handling
async function safeFetch(url, options = {}) {
  try {
    console.log(`Requesting: ${url}`);
    const response = await fetch(url, options);
    
    // Log the raw response for debugging
    const rawText = await response.text();
    console.log(`Raw response: ${rawText.substring(0, 200)}${rawText.length > 200 ? '...' : ''}`);
    
    // Try to parse as JSON if possible
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      return { 
        ok: false, 
        status: response.status,
        statusText: response.statusText,
        error: `Failed to parse JSON: ${parseError.message}`,
        rawText 
      };
    }
    
    return { 
      ok: response.ok, 
      status: response.status,
      statusText: response.statusText,
      data 
    };
  } catch (error) {
    return { 
      ok: false, 
      error: error.message 
    };
  }
}

// Test functions
async function testProductsAPI() {
  console.log('\n🔍 Testing Products API...');
  
  // Test GET /api/products
  const getResponse = await safeFetch(`${BASE_URL}/products`);
  if (getResponse.ok) {
    logResult('/products', 'GET', true, getResponse.data);
  } else {
    logResult('/products', 'GET', false, getResponse.rawText, getResponse.error);
  }
  
  // Test POST /api/products
  const postResponse = await safeFetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testProduct)
  });
  
  if (postResponse.ok) {
    testProductId = postResponse.data._id;
    logResult('/products', 'POST', true, postResponse.data);
  } else {
    logResult('/products', 'POST', false, postResponse.rawText, postResponse.error);
  }
  
  // Test GET /api/products/:id
  if (testProductId) {
    const getByIdResponse = await safeFetch(`${BASE_URL}/products/${testProductId}`);
    if (getByIdResponse.ok) {
      logResult(`/products/${testProductId}`, 'GET', true, getByIdResponse.data);
    } else {
      logResult(`/products/${testProductId}`, 'GET', false, getByIdResponse.rawText, getByIdResponse.error);
    }
  }
}

async function testCartAPI() {
  console.log('\n🔍 Testing Cart API...');
  
  // Test POST /api/cart (add to cart)
  if (testProductId) {
    const postResponse = await safeFetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: TEST_USER_ID,
        productId: testProductId,
        quantity: 2
      })
    });
    
    if (postResponse.ok) {
      logResult('/cart', 'POST', true, postResponse.data);
    } else {
      logResult('/cart', 'POST', false, postResponse.rawText, postResponse.error);
    }
  }
  
  // Test GET /api/cart
  const getResponse = await safeFetch(`${BASE_URL}/cart?userId=${TEST_USER_ID}`);
  if (getResponse.ok) {
    logResult('/cart', 'GET', true, getResponse.data);
  } else {
    logResult('/cart', 'GET', false, getResponse.rawText, getResponse.error);
  }
}

async function testOrdersAPI() {
  console.log('\n🔍 Testing Orders API...');
  
  // Test POST /api/orders (create order)
  if (testProductId) {
    const postResponse = await safeFetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: TEST_USER_ID,
        userEmail: TEST_EMAIL,
        products: [{ productId: testProductId, quantity: 1 }],
        totalAmount: 19.99,
        shippingAddress: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'Test Country'
        }
      })
    });
    
    if (postResponse.ok) {
      testOrderId = postResponse.data._id;
      logResult('/orders', 'POST', true, postResponse.data);
    } else {
      logResult('/orders', 'POST', false, postResponse.rawText, postResponse.error);
    }
  }
  
  // Test GET /api/orders
  const getResponse = await safeFetch(`${BASE_URL}/orders?userId=${TEST_USER_ID}`);
  if (getResponse.ok) {
    logResult('/orders', 'GET', true, getResponse.data);
  } else {
    logResult('/orders', 'GET', false, getResponse.rawText, getResponse.error);
  }
  
  // Test GET /api/orders/:id
  if (testOrderId) {
    const getByIdResponse = await safeFetch(`${BASE_URL}/orders/${testOrderId}`);
    if (getByIdResponse.ok) {
      logResult(`/orders/${testOrderId}`, 'GET', true, getByIdResponse.data);
    } else {
      logResult(`/orders/${testOrderId}`, 'GET', false, getByIdResponse.rawText, getByIdResponse.error);
    }
  }
}

async function testWishlistAPI() {
  console.log('\n🔍 Testing Wishlist API...');
  
  // Test POST /api/wishlist (add to wishlist)
  if (testProductId) {
    const postResponse = await safeFetch(`${BASE_URL}/wishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: TEST_USER_ID,
        productId: testProductId
      })
    });
    
    if (postResponse.ok) {
      logResult('/wishlist', 'POST', true, postResponse.data);
    } else {
      logResult('/wishlist', 'POST', false, postResponse.rawText, postResponse.error);
    }
  }
  
  // Test GET /api/wishlist
  const getResponse = await safeFetch(`${BASE_URL}/wishlist?userId=${TEST_USER_ID}`);
  if (getResponse.ok) {
    logResult('/wishlist', 'GET', true, getResponse.data);
  } else {
    logResult('/wishlist', 'GET', false, getResponse.rawText, getResponse.error);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API tests...');
  
  await testProductsAPI();
  await testCartAPI();
  await testOrdersAPI();
  await testWishlistAPI();
  
  console.log('\n✨ All tests completed!');
}

runTests().catch(error => {
  console.error('❌ Test runner error:', error);
});
