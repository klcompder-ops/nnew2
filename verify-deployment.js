#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Jalankan sebelum push ke Netlify
 */

const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('Deployment Verification');
console.log('========================================\n');

let passed = 0;
let warnings = 0;
let errors = 0;

function check(name, condition, type = 'info') {
  if (condition) {
    console.log(`✅ ${name}`);
    passed++;
  } else if (type === 'warning') {
    console.log(`⚠️  WARNING: ${name}`);
    warnings++;
  } else if (type === 'error') {
    console.log(`❌ ERROR: ${name}`);
    errors++;
  }
}

// Check 1: Files exist
console.log('📁 Checking required files...');
check('supabase-schema.sql exists', fs.existsSync('supabase-schema.sql'), 'error');
check('netlify.toml exists', fs.existsSync('netlify.toml'), 'error');
check('package.json exists', fs.existsSync('package.json'), 'error');
check('js/supabase-config.js exists', fs.existsSync('js/supabase-config.js'), 'error');
console.log('');

// Check 2: netlify.toml configuration
console.log('⚙️  Checking netlify.toml...');
const netlifyCfg = fs.readFileSync('netlify.toml', 'utf-8');
check('publish directory set', netlifyCfg.includes('publish'), 'error');
console.log('');

// Check 3: supabase-config.js
console.log('🔐 Checking Supabase configuration...');
const supaCfg = fs.readFileSync('js/supabase-config.js', 'utf-8');
check('Not using placeholder URL', !supaCfg.includes('YOUR-PROJECT'), 'warning');
check('Not using placeholder KEY', !supaCfg.includes('YOUR-ANON-KEY'), 'warning');
console.log('');

// Check 4: .gitignore
console.log('🔒 Checking security...');
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf-8');
  check('.env in .gitignore', gitignore.includes('.env'), 'warning');
  check('node_modules in .gitignore', gitignore.includes('node_modules'), 'warning');
} else {
  check('.gitignore exists', false, 'warning');
}
console.log('');

// Check 5: HTML files
console.log('📄 Checking HTML files...');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let htmlWithSupabase = 0;
htmlFiles.forEach(html => {
  const content = fs.readFileSync(html, 'utf-8');
  if (content.includes('supabase') || content.includes('@supabase')) {
    htmlWithSupabase++;
  }
});
check(`HTML files include Supabase (${htmlWithSupabase}/${htmlFiles.length})`, htmlWithSupabase > 0, 'warning');
console.log('');

// Summary
console.log('========================================');
console.log('Summary');
console.log('========================================');
console.log(`✅ Passed: ${passed}`);
console.log(`⚠️  Warnings: ${warnings}`);
console.log(`❌ Errors: ${errors}`);
console.log('');

if (errors === 0 && warnings === 0) {
  console.log('🎉 Ready to deploy!');
  process.exit(0);
} else if (errors === 0) {
  console.log('⚠️  Fix warnings before deploying');
  process.exit(0);
} else {
  console.log('❌ Fix errors before deploying');
  process.exit(1);
}
