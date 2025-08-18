// Production Health Check Script
const testProduction = async () => {
  const PRODUCTION_API = 'https://easypathshala.onrender.com'; // Replace with your actual Render URL
  
  console.log('🔍 Testing Production Setup...\n');
  
  // Test 1: Backend Health
  try {
    console.log('1. Testing Backend Health...');
    const healthResponse = await fetch(`${PRODUCTION_API}/api/health`);
    const healthData = await healthResponse.json();
    
    if (healthData.success) {
      console.log('✅ Backend is running');
      console.log(`   Environment: ${healthData.environment}`);
      console.log(`   Database: ${healthData.database?.status}`);
    } else {
      console.log('❌ Backend health check failed');
    }
  } catch (error) {
    console.log('❌ Backend is not accessible');
    console.log(`   Error: ${error.message}`);
  }
  
  // Test 2: Database Connection
  try {
    console.log('\n2. Testing Database Connection...');
    const dbResponse = await fetch(`${PRODUCTION_API}/api/health/db`);
    const dbData = await dbResponse.json();
    
    if (dbData.success) {
      console.log('✅ Database is connected');
      console.log(`   Database: ${dbData.database?.name}`);
      console.log(`   Host: ${dbData.database?.host}`);
    } else {
      console.log('❌ Database connection failed');
    }
  } catch (error) {
    console.log('❌ Database check failed');
    console.log(`   Error: ${error.message}`);
  }
  
  // Test 3: Test Registration Endpoint
  try {
    console.log('\n3. Testing Registration Endpoint...');
    const testUser = {
      fullName: 'Test User',
      username: 'testuser123',
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    const registerResponse = await fetch(`${PRODUCTION_API}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Registration endpoint is accessible');
    console.log(`   Response: ${registerData.message || 'Registration tested'}`);
  } catch (error) {
    console.log('❌ Registration endpoint failed');
    console.log(`   Error: ${error.message}`);
  }
  
  console.log('\n🏁 Production test completed!');
};

// Run the test
testProduction();