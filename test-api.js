#!/usr/bin/env node

/**
 * API Test Script for BackendTest
 * 
 * This script demonstrates how to test all API endpoints
 * Run: node test-api.js
 */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  purple: '\x1b[35m'
};

console.log(`\n${colors.purple}╔════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.purple}║  BackendTest API Test Suite            ║${colors.reset}`);
console.log(`${colors.purple}╚════════════════════════════════════════╝${colors.reset}\n`);

const testData = {
  name: 'Test User ' + Date.now(),
  email: 'test' + Date.now() + '@example.com',
  message: 'This is an automated test message for the contact form'
};

let createdContactId = null;

// Test 1: Health Check
async function testHealthCheck() {
  console.log(`${colors.blue}Test 1: Health Check${colors.reset}`);
  try {
    const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
    console.log(`${colors.green}✅ Success${colors.reset}`);
    console.log(`   Status: ${response.data.status}`);
    console.log(`   Message: ${response.data.message}\n`);
    return true;
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Test 2: Create Contact
async function testCreateContact() {
  console.log(`${colors.blue}Test 2: Create Contact${colors.reset}`);
  try {
    const response = await axios.post(`${API_URL}/contacts`, testData, { 
      timeout: 5000 
    });
    
    if (response.data.success) {
      console.log(`${colors.green}✅ Success${colors.reset}`);
      console.log(`   Message: ${response.data.message}`);
      console.log(`   ID: ${response.data.data.id}`);
      console.log(`   Name: ${response.data.data.name}`);
      console.log(`   Email: ${response.data.data.email}\n`);
      
      createdContactId = response.data.data.id;
      return true;
    } else {
      console.log(`${colors.red}❌ Failed${colors.reset}`);
      console.log(`   Error: ${response.data.message}\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    return false;
  }
}

// Test 3: Get All Contacts
async function testGetAllContacts() {
  console.log(`${colors.blue}Test 3: Get All Contacts${colors.reset}`);
  try {
    const response = await axios.get(`${API_URL}/contacts`, { 
      timeout: 5000 
    });
    
    if (response.data.success) {
      console.log(`${colors.green}✅ Success${colors.reset}`);
      console.log(`   Count: ${response.data.count}`);
      if (response.data.data.length > 0) {
        console.log(`   Latest Contact: ${response.data.data[0].name}`);
      }
      console.log();
      return true;
    } else {
      console.log(`${colors.red}❌ Failed${colors.reset}\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Test 4: Get Single Contact
async function testGetSingleContact() {
  if (!createdContactId) {
    console.log(`${colors.yellow}⊘ Skipped${colors.reset} (No contact created)\n`);
    return false;
  }

  console.log(`${colors.blue}Test 4: Get Single Contact${colors.reset}`);
  try {
    const response = await axios.get(`${API_URL}/contacts/${createdContactId}`, { 
      timeout: 5000 
    });
    
    if (response.data.success) {
      console.log(`${colors.green}✅ Success${colors.reset}`);
      console.log(`   ID: ${response.data.data._id}`);
      console.log(`   Name: ${response.data.data.name}`);
      console.log(`   Email: ${response.data.data.email}\n`);
      return true;
    } else {
      console.log(`${colors.red}❌ Failed${colors.reset}\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Test 5: Update Contact Status
async function testUpdateContactStatus() {
  if (!createdContactId) {
    console.log(`${colors.yellow}⊘ Skipped${colors.reset} (No contact created)\n`);
    return false;
  }

  console.log(`${colors.blue}Test 5: Update Contact Status${colors.reset}`);
  try {
    const response = await axios.put(`${API_URL}/contacts/${createdContactId}`, 
      { status: 'read' }, 
      { timeout: 5000 }
    );
    
    if (response.data.success) {
      console.log(`${colors.green}✅ Success${colors.reset}`);
      console.log(`   Message: ${response.data.message}`);
      console.log(`   New Status: ${response.data.data.status}\n`);
      return true;
    } else {
      console.log(`${colors.red}❌ Failed${colors.reset}\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Test 6: Delete Contact
async function testDeleteContact() {
  if (!createdContactId) {
    console.log(`${colors.yellow}⊘ Skipped${colors.reset} (No contact created)\n`);
    return false;
  }

  console.log(`${colors.blue}Test 6: Delete Contact${colors.reset}`);
  try {
    const response = await axios.delete(`${API_URL}/contacts/${createdContactId}`, { 
      timeout: 5000 
    });
    
    if (response.data.success) {
      console.log(`${colors.green}✅ Success${colors.reset}`);
      console.log(`   Message: ${response.data.message}\n`);
      return true;
    } else {
      console.log(`${colors.red}❌ Failed${colors.reset}\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Failed${colors.reset}`);
    console.log(`   Error: ${error.message}\n`);
    return false;
  }
}

// Test 7: Validation Test - Invalid Email
async function testValidationError() {
  console.log(`${colors.blue}Test 7: Validation Test (Invalid Email)${colors.reset}`);
  try {
    const response = await axios.post(`${API_URL}/contacts`, 
      {
        name: 'Test',
        email: 'invalid-email',
        message: 'Message'
      }, 
      { timeout: 5000 }
    );
    console.log(`${colors.red}❌ Failed${colors.reset} (Should have failed)\n`);
    return false;
  } catch (error) {
    if (error.response?.status === 400) {
      console.log(`${colors.green}✅ Success${colors.reset} (Validation correctly rejected)`);
      console.log(`   Errors:`, error.response?.data?.errors?.map(e => e.message).join(', '));
      console.log();
      return true;
    } else {
      console.log(`${colors.red}❌ Failed${colors.reset}`);
      console.log(`   Error: ${error.message}\n`);
      return false;
    }
  }
}

// Run all tests
async function runAllTests() {
  const results = [];
  
  results.push(await testHealthCheck());
  results.push(await testCreateContact());
  results.push(await testGetAllContacts());
  results.push(await testGetSingleContact());
  results.push(await testUpdateContactStatus());
  results.push(await testDeleteContact());
  results.push(await testValidationError());

  // Summary
  const passed = results.filter(r => r === true).length;
  const total = results.length;
  
  console.log(`${colors.purple}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.purple}║  Test Summary                          ║${colors.reset}`);
  console.log(`${colors.purple}╚════════════════════════════════════════╝${colors.reset}`);
  console.log(`\n${colors.green}Passed: ${passed}/${total}${colors.reset}\n`);
  
  if (passed === total) {
    console.log(`${colors.green}✅ All tests passed!${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}⚠️ Some tests failed. Check MongoDB connection.${colors.reset}\n`);
  }
}

// Run tests
runAllTests().catch(err => {
  console.error(`${colors.red}Fatal Error:${colors.reset}`, err.message);
  console.log(`\n${colors.yellow}Make sure:${colors.reset}`);
  console.log(`1. Backend server is running: node server.js`);
  console.log(`2. MongoDB is accessible`);
  console.log(`3. Port 5000 is available\n`);
});
