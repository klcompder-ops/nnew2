#!/bin/bash

# Deployment Checklist Script for Netlify + Supabase

echo "=========================================="
echo "Netlify + Supabase Deployment Checklist"
echo "=========================================="
echo ""

# Check 1: Supabase Credentials
echo "📋 Check 1: Supabase Credentials"
if grep -q "YOUR-PROJECT" js/supabase-config.js; then
    echo "⚠️  WARNING: supabase-config.js masih punya placeholder!"
    echo "   → Set SUPABASE_URL dan SUPABASE_ANON_KEY"
else
    echo "✅ supabase-config.js sudah dikonfigurasi"
fi
echo ""

# Check 2: netlify.toml
echo "📋 Check 2: netlify.toml Configuration"
if grep -q "publish" netlify.toml; then
    echo "✅ netlify.toml sudah ada"
    echo "   Publish directory: $(grep 'publish' netlify.toml | head -1)"
else
    echo "⚠️  WARNING: netlify.toml tidak proper"
fi
echo ""

# Check 3: .gitignore
echo "📋 Check 3: .gitignore"
if [ -f .gitignore ]; then
    echo "✅ .gitignore exists"
    if grep -q "\.env" .gitignore; then
        echo "✅ .env sudah di .gitignore (aman)"
    else
        echo "⚠️  WARNING: .env tidak ada di .gitignore"
    fi
else
    echo "⚠️  WARNING: .gitignore tidak ada"
fi
echo ""

# Check 4: Supabase Schema
echo "📋 Check 4: Supabase Schema File"
if [ -f supabase-schema.sql ]; then
    echo "✅ supabase-schema.sql exists"
    echo "   Tables: $(grep 'create table' supabase-schema.sql | wc -l) tables found"
else
    echo "⚠️  ERROR: supabase-schema.sql tidak ditemukan"
fi
echo ""

# Check 5: HTML files include Supabase
echo "📋 Check 5: Supabase Library in HTML"
for html in *.html; do
    if [ -f "$html" ]; then
        if grep -q "supabase-js" "$html"; then
            echo "✅ $html: Include Supabase library"
        else
            echo "⚠️  WARNING: $html: Tidak ada Supabase library link"
        fi
    fi
done
echo ""

# Check 6: Git Setup
echo "📋 Check 6: Git Repository"
if [ -d .git ]; then
    echo "✅ Git repository sudah initialized"
    REMOTE=$(git remote get-url origin 2>/dev/null)
    if [ -z "$REMOTE" ]; then
        echo "⚠️  WARNING: Git remote belum set"
        echo "   → Run: git remote add origin <your-repo-url>"
    else
        echo "✅ Git remote: $REMOTE"
    fi
else
    echo "⚠️  WARNING: Git repository belum initialized"
    echo "   → Run: git init"
fi
echo ""

# Summary
echo "=========================================="
echo "Deployment Checklist Summary"
echo "=========================================="
echo ""
echo "Sebelum deploy ke Netlify:"
echo "1. ✅ Setup Supabase project dan jalankan supabase-schema.sql"
echo "2. ✅ Set SUPABASE_URL dan SUPABASE_ANON_KEY di supabase-config.js (atau via Netlify env)"
echo "3. ✅ Git push ke repository"
echo "4. ✅ Connect repository ke Netlify"
echo "5. ✅ Set environment variables di Netlify dashboard"
echo "6. ✅ Deploy dan test"
echo ""
echo "Untuk production, selalu gunakan Netlify environment variables, bukan hardcoded values."
echo ""
